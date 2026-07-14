/**
 * The migration runner, shared by every service.
 *
 *   yarn migrate list
 *   yarn migrate status
 *   yarn migrate run <name>            # dry run — reports, writes nothing
 *   yarn migrate run <name> --apply    # actually writes
 *
 * Dry run is the default on purpose. These are data fixes pointed at real
 * customers, and the scripts this replaced had no preview, no record of having
 * run, and no way to invoke them at all.
 *
 * A service wires it up with a one-liner:
 *
 *   import { runMigrationCli } from "@caytu/shared";
 *   import { MIGRATIONS } from "../models/migrations/registry";
 *   runMigrationCli(MIGRATIONS);
 *
 * Migrations must never run on boot. A boot-time data fix re-scans the
 * collection on every restart, cannot be previewed, and reaches production the
 * moment an image rolls. See CAYTU/Caytu-Infra#920.
 */

import mongoose from "mongoose";
import { MigrationLedger } from "./ledger";
import { Migration, findMigration } from "./types";

const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";

const line = (msg = "") => console.log(msg);

async function connect() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    line(`${RED}MONGO_URI is not set${RESET}`);
    process.exit(1);
  }
  await mongoose.connect(uri);
  // The database is the thing you are about to change — say which one.
  line(`${DIM}connected to ${mongoose.connection.name}${RESET}`);
}

async function cmdList(migrations: Migration[]) {
  const applied = await MigrationLedger.find().lean();
  const appliedAt = new Map(applied.map((a) => [a.name, a.appliedAt]));

  line(`${BOLD}Migrations${RESET}`);
  line();
  for (const m of migrations) {
    const at = appliedAt.get(m.name);
    const state = at
      ? `${GREEN}applied${RESET} ${DIM}${new Date(at).toISOString().slice(0, 10)}${RESET}`
      : `${YELLOW}pending${RESET}`;
    const preview = m.dryRun ? "" : ` ${DIM}(no dry run)${RESET}`;
    line(`  ${BOLD}${m.name}${RESET}  ${state}${preview}`);
    line(`    ${DIM}${m.description}${RESET}`);
  }
  line();
}

async function cmdStatus() {
  const applied = await MigrationLedger.find().sort({ appliedAt: 1 }).lean();
  if (applied.length === 0) {
    line(`${YELLOW}No migration has been applied to this database.${RESET}`);
    return;
  }
  line(`${BOLD}Applied${RESET}`);
  for (const a of applied) {
    line(
      `  ${a.name} ${DIM}${new Date(a.appliedAt).toISOString()} (${a.durationMs ?? "?"}ms)${RESET}`,
    );
    if (a.result) line(`    ${DIM}${JSON.stringify(a.result)}${RESET}`);
  }
}

async function cmdRun(
  migrations: Migration[],
  name: string,
  apply: boolean,
  force: boolean,
) {
  const migration = findMigration(migrations, name);
  if (!migration) {
    line(`${RED}No migration named "${name}".${RESET} Try: yarn migrate list`);
    process.exit(1);
  }

  const already = await MigrationLedger.findOne({ name });
  if (already && apply && !force) {
    line(
      `${YELLOW}"${name}" was already applied on ${new Date(
        already.appliedAt,
      ).toISOString()}.${RESET}`,
    );
    line(`Re-run it with --force if that is really what you want.`);
    process.exit(1);
  }

  if (!apply) {
    if (!migration.dryRun) {
      // Silence here would read as "nothing to do", which is a lie.
      line(
        `${YELLOW}"${name}" has no dry run.${RESET} It cannot preview its changes.`,
      );
      line(`Run it for real with --apply, or add a dryRun() to the migration.`);
      process.exit(1);
    }
    line(
      `${BOLD}Dry run:${RESET} ${name} ${DIM}(nothing will be written)${RESET}`,
    );
    const result = await migration.dryRun();
    line(JSON.stringify(result, null, 2));
    line();
    line(`${DIM}Re-run with --apply to write these changes.${RESET}`);
    return;
  }

  line(`${BOLD}Applying:${RESET} ${name}`);
  const started = Date.now();
  const result = await migration.run();
  const durationMs = Date.now() - started;

  await MigrationLedger.findOneAndUpdate(
    { name },
    { name, appliedAt: new Date(), result, durationMs },
    { upsert: true },
  );

  line(`${GREEN}Applied${RESET} ${DIM}in ${durationMs}ms${RESET}`);
  line(JSON.stringify(result, null, 2));
}

/**
 * Parse argv, run the requested command against `migrations`, and exit. Intended
 * to be the entire body of a service's `src/scripts/migrate.ts`.
 */
export async function runMigrationCli(migrations: Migration[]): Promise<void> {
  // This warning is not the operator's problem and it buries the report.
  mongoose.set("strictQuery", true);

  const [, , command, ...rest] = process.argv;
  const args = rest.filter((a) => !a.startsWith("--"));
  const apply = rest.includes("--apply");
  const force = rest.includes("--force");

  try {
    await connect();

    try {
      switch (command) {
        case "list":
          await cmdList(migrations);
          break;
        case "status":
          await cmdStatus();
          break;
        case "run":
          if (!args[0]) {
            line(`${RED}usage: yarn migrate run <name> [--apply]${RESET}`);
            process.exit(1);
          }
          await cmdRun(migrations, args[0], apply, force);
          break;
        default:
          line("usage: yarn migrate list | status | run <name> [--apply]");
          process.exit(1);
      }
    } finally {
      await mongoose.disconnect();
    }
  } catch (err: any) {
    line(`${RED}Migration failed:${RESET} ${err?.message ?? err}`);
    process.exit(1);
  }
}
