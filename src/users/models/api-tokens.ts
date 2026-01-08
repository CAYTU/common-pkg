import mongoose, { Document, Model, Types } from "mongoose";
import { UserRole } from "../utils/user-roles";
import { TaskType } from "../../tasks/enums/task-types";

/**
 * Base API Token interface - represents the raw data structure
 */
export interface ApiTokenInterface {
  userId: Types.ObjectId;
  tokenName: string;
  tokenHash?: string;
  tokenPrefix: string;
  permissions: {
    roles: UserRole[];
    allowedTaskTypes: TaskType[];
    organizationId?: Types.ObjectId;
  };
  lastUsedAt?: Date;
  expiresAt?: Date;
  isActive: boolean;
  ipWhitelist?: string[];
  metadata?: {
    createdFrom?: string;
    description?: string;
    environment?: "development" | "staging" | "production";
  };
}

// Include id in the base interface
export interface ApiTokenDocFields extends ApiTokenInterface {
  id: string;
  _id: Types.ObjectId;
}

export interface ApiTokenDoc extends Document, ApiTokenDocFields {
  createdAt: Date;
  updatedAt: Date;
}

/**
 * API Token Model interface - includes static methods
 */
export interface ApiTokenModel extends Model<ApiTokenDoc> {
  build(attrs: ApiTokenInterface): ApiTokenDoc;
  findActiveTokens(): Promise<ApiTokenDoc[]>;
  findByUserId(userId: Types.ObjectId | string): Promise<ApiTokenDoc[]>;
  findByPrefix(prefix: string): Promise<ApiTokenDoc[]>;
}

/**
 * API Token Schema with proper typing
 * IMPORTANT: Use ApiTokenDoc as first generic, ApiTokenModel as second
 */
const apiTokenSchema = new mongoose.Schema<ApiTokenDoc, ApiTokenModel>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tokenName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    tokenPrefix: {
      type: String,
      required: true,
      index: true,
      maxlength: 20,
    },
    permissions: {
      roles: [
        {
          type: String,
          enum: Object.values(UserRole),
          required: true,
        },
      ],
      allowedTaskTypes: [
        {
          type: String,
          enum: Object.values(TaskType),
        },
      ],
      organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
      },
    },
    lastUsedAt: { type: Date },
    expiresAt: { type: Date },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    ipWhitelist: [{ type: String }],
    metadata: {
      createdFrom: { type: String },
      description: { type: String, maxlength: 500 },
      environment: {
        type: String,
        enum: ["development", "staging", "production"],
        default: "production",
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_, ret) {
        ret.id = ret._id.toString();
        delete ret.tokenHash;
      },
    },
    toObject: {
      virtuals: true,
    },
  },
);

// Compound indexes
apiTokenSchema.index({ userId: 1, isActive: 1 });
apiTokenSchema.index({ tokenPrefix: 1, isActive: 1 });
apiTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// ============================================================================
// STATIC METHODS
// ============================================================================

apiTokenSchema.statics.build = function (
  attrs: ApiTokenInterface,
): ApiTokenDoc {
  return new ApiToken(attrs);
};

apiTokenSchema.statics.findActiveTokens = function (): Promise<ApiTokenDoc[]> {
  return this.find({ isActive: true }).exec();
};

apiTokenSchema.statics.findByUserId = function (
  userId: Types.ObjectId | string,
): Promise<ApiTokenDoc[]> {
  const userObjectId =
    typeof userId === "string" ? new Types.ObjectId(userId) : userId;

  return this.find({ userId: userObjectId, isActive: true }).exec();
};

apiTokenSchema.statics.findByPrefix = function (
  prefix: string,
): Promise<ApiTokenDoc[]> {
  return this.find({ tokenPrefix: prefix, isActive: true }).exec();
};

// ============================================================================
// MIDDLEWARE
// ============================================================================

apiTokenSchema.pre("save", async function () {
  if (this.expiresAt && this.expiresAt < new Date()) {
    this.isActive = false;
  }
});

apiTokenSchema.post("save", function (doc) {
  console.log(`API token saved with id: ${doc.id}`);
});

/**
 * API Token Model
 */
export const ApiToken = mongoose.model<ApiTokenDoc, ApiTokenModel>(
  "ApiToken",
  apiTokenSchema,
);
