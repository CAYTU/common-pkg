#!/usr/bin/env node

/**
 * Dependency Migration Automation Script
 * 
 * This script helps automate parts of the migration process:
 * 1. Backs up current package.json
 * 2. Installs new dependencies
 * 3. Runs security audit
 * 4. Checks for breaking changes
 * 5. Generates a migration report
 * 
 * Usage: node migrate.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function execCommand(command, errorMessage) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: 'pipe' });
  } catch (error) {
    log(`❌ ${errorMessage}`, 'red');
    log(error.message, 'red');
    return null;
  }
}

async function main() {
  const isDryRun = process.argv.includes('--dry-run');

  log('\n🚀 Starting Dependency Migration Process\n', 'cyan');

  if (isDryRun) {
    log('⚠️  DRY RUN MODE - No changes will be made\n', 'yellow');
  }

  // Step 1: Backup package.json
  log('📦 Step 1: Backing up package.json...', 'blue');
  const packagePath = path.join(process.cwd(), 'package.json');
  const backupPath = path.join(process.cwd(), `package.json.backup.${Date.now()}`);

  if (!isDryRun) {
    fs.copyFileSync(packagePath, backupPath);
    log(`✅ Backup created: ${backupPath}`, 'green');
  } else {
    log('   (Would create backup)', 'yellow');
  }

  // Step 2: Check current versions
  log('\n📊 Step 2: Analyzing current dependencies...', 'blue');
  const currentPackage = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const criticalPackages = {
    'aws-sdk': '⚠️  Deprecated - migrate to @aws-sdk/* packages',
    'node-nats-streaming': '⚠️  Deprecated - migrate to nats package',
    'mongoose': currentPackage.dependencies?.mongoose || 'Not found',
    'express-validator': currentPackage.dependencies?.['express-validator'] || 'Not found',
  };

  Object.entries(criticalPackages).forEach(([pkg, status]) => {
    log(`   ${pkg}: ${status}`, status.includes('⚠️') ? 'yellow' : 'green');
  });

  // Step 3: Security audit
  log('\n🔒 Step 3: Running security audit...', 'blue');
  const auditResult = execCommand(
    'yarn audit --json',
    'Failed to run security audit'
  );

  if (auditResult) {
    try {
      const audits = auditResult.trim().split('\n').map(line => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      }).filter(Boolean);

      const summary = audits.find(a => a.type === 'auditSummary');
      if (summary?.data?.vulnerabilities) {
        const vulns = summary.data.vulnerabilities;
        log(`   Found: ${vulns.critical || 0} critical, ${vulns.high || 0} high, ${vulns.moderate || 0} moderate`, 
          vulns.critical > 0 ? 'red' : vulns.high > 0 ? 'yellow' : 'green');
      }
    } catch (e) {
      log('   Could not parse audit results', 'yellow');
    }
  }

  // Step 4: Check for breaking changes
  log('\n🔍 Step 4: Checking for potential breaking changes...', 'blue');
  
  const breakingChanges = [];

  // Check for AWS SDK usage
  const awsSdkUsage = execCommand(
    'grep -r "from [\'\\"]aws-sdk" src/ --include="*.ts" || true',
    'Could not check AWS SDK usage'
  );
  if (awsSdkUsage && awsSdkUsage.trim()) {
    breakingChanges.push({
      type: 'AWS SDK v2',
      files: awsSdkUsage.trim().split('\n').length,
      severity: 'high',
      action: 'Migrate to @aws-sdk/* packages'
    });
  }

  // Check for node-nats-streaming usage
  const natsStreamingUsage = execCommand(
    'grep -r "from [\'\\"]node-nats-streaming" src/ --include="*.ts" || true',
    'Could not check NATS streaming usage'
  );
  if (natsStreamingUsage && natsStreamingUsage.trim()) {
    breakingChanges.push({
      type: 'node-nats-streaming',
      files: natsStreamingUsage.trim().split('\n').length,
      severity: 'high',
      action: 'Migrate to nats JetStream'
    });
  }

  // Check for Mongoose deprecated methods
  const mongooseDeprecated = execCommand(
    'grep -r "\\.save(.*=>\\|callback" src/ --include="*.ts" || true',
    'Could not check Mongoose usage'
  );
  if (mongooseDeprecated && mongooseDeprecated.trim()) {
    breakingChanges.push({
      type: 'Mongoose callbacks',
      files: mongooseDeprecated.trim().split('\n').length,
      severity: 'medium',
      action: 'Convert callbacks to async/await'
    });
  }

  if (breakingChanges.length > 0) {
    log('\n   ⚠️  Potential breaking changes found:', 'yellow');
    breakingChanges.forEach(change => {
      const severityColor = change.severity === 'high' ? 'red' : 'yellow';
      log(`   - ${change.type}: ${change.files} file(s) - ${change.action}`, severityColor);
    });
  } else {
    log('   ✅ No obvious breaking changes detected', 'green');
  }

  // Step 5: Install dependencies
  if (!isDryRun) {
    log('\n📥 Step 5: Installing updated dependencies...', 'blue');
    log('   This may take a few minutes...', 'cyan');

    const installResult = execCommand(
      'yarn install',
      'Failed to install dependencies'
    );

    if (installResult) {
      log('   ✅ Dependencies installed successfully', 'green');
    }
  } else {
    log('\n📥 Step 5: Installing updated dependencies... (skipped in dry-run)', 'yellow');
  }

  // Step 6: Type check
  if (!isDryRun) {
    log('\n🔎 Step 6: Running TypeScript type check...', 'blue');
    const typeCheckResult = execCommand(
      'yarn test:types',
      'Type check failed - this is expected, review errors and fix'
    );

    if (typeCheckResult) {
      log('   ✅ Type check passed', 'green');
    } else {
      log('   ⚠️  Type errors found - review and fix before proceeding', 'yellow');
    }
  } else {
    log('\n🔎 Step 6: Running TypeScript type check... (skipped in dry-run)', 'yellow');
  }

  // Step 7: Generate migration report
  log('\n📝 Step 7: Generating migration report...', 'blue');
  
  const report = {
    timestamp: new Date().toISOString(),
    dryRun: isDryRun,
    breakingChanges,
    recommendations: [
      'Review MIGRATION_GUIDE.md for detailed instructions',
      'Update AWS SDK v2 code to v3 using examples/s3-client-v3-migration.ts',
      'Migrate NATS listeners using examples/nats-jetstream-listener-migration.ts',
      'Run full test suite: yarn test',
      'Review any TypeScript errors and fix',
      'Update documentation to reflect changes',
    ],
    nextSteps: [
      'git checkout -b feat/dependency-migration',
      'Review and address all breaking changes',
      'Run: yarn test',
      'Run: yarn build',
      'Create PR with detailed testing notes',
    ]
  };

  const reportPath = path.join(process.cwd(), `migration-report-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`   ✅ Report saved to: ${reportPath}`, 'green');

  // Final summary
  log('\n' + '='.repeat(60), 'cyan');
  log('📋 MIGRATION SUMMARY', 'cyan');
  log('='.repeat(60), 'cyan');

  if (isDryRun) {
    log('\n✅ Dry run completed successfully', 'green');
    log('   Run without --dry-run to perform actual migration', 'cyan');
  } else {
    log('\n✅ Migration process completed!', 'green');
    log(`   Backup saved to: ${backupPath}`, 'cyan');
  }

  log('\n📖 Next steps:', 'blue');
  report.nextSteps.forEach((step, i) => {
    log(`   ${i + 1}. ${step}`, 'cyan');
  });

  if (breakingChanges.length > 0) {
    log(`\n⚠️  ${breakingChanges.length} potential breaking change(s) detected`, 'yellow');
    log('   Review MIGRATION_GUIDE.md for details', 'yellow');
  }

  log('\n🎉 Good luck with the migration!\n', 'green');
}

// Run the script
main().catch(error => {
  log('\n❌ Migration script failed:', 'red');
  log(error.message, 'red');
  process.exit(1);
});
