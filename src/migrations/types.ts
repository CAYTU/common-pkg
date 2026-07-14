export interface MigrationResult {
  [key: string]: unknown;
}

export interface Migration {
  name: string;
  description: string;
  /** Apply the change. */
  run: () => Promise<MigrationResult>;
  /**
   * Report what `run` would do, without writing. Absent means this migration
   * predates dry-run support — the runner refuses to preview it rather than
   * print nothing and let that read as "no changes".
   */
  dryRun?: () => Promise<MigrationResult>;
}

export const findMigration = (
  migrations: Migration[],
  name: string,
): Migration | undefined => migrations.find((m) => m.name === name);
