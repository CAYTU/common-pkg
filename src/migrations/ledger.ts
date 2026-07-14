import mongoose, { Model, Document } from "mongoose";

/**
 * A record that a migration ran, so it does not run twice.
 *
 * Migrations used to live as loose scripts that nothing invoked and nothing
 * recorded — you could not tell whether one had already been applied to an
 * environment, let alone which. Data fixes are rarely idempotent by luck, so
 * "did this already run against prod?" is a question that needs a real answer.
 */
export interface MigrationDoc extends Document {
  name: string;
  appliedAt: Date;
  /** Whatever the migration reported — counts, ids, skipped rows. */
  result?: Record<string, unknown>;
  /** Wall time, so a slow one is visible next run. */
  durationMs?: number;
}

const migrationSchema = new mongoose.Schema<MigrationDoc>(
  {
    name: { type: String, required: true, unique: true },
    appliedAt: { type: Date, default: Date.now },
    result: { type: mongoose.Schema.Types.Mixed },
    durationMs: { type: Number },
  },
  { collection: "migrations" },
);

/**
 * Reuse the model if the host service already registered one under this name.
 * billings defined its own `Migration` model before this moved into the package,
 * and registering a second one would throw OverwriteModelError on import.
 */
export const MigrationLedger: Model<MigrationDoc> =
  (mongoose.models.Migration as Model<MigrationDoc>) ??
  mongoose.model<MigrationDoc, Model<MigrationDoc>>(
    "Migration",
    migrationSchema,
  );
