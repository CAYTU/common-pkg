import mongoose, { Document, Model } from "mongoose";
import { UserRole } from "../utils/user-roles";
import { TaskType } from "../../tasks/enums/task-types";

export interface ApiTokenInterface {
  userId: mongoose.Schema.Types.ObjectId;
  tokenName: string;
  tokenHash: string;
  tokenPrefix: string;
  permissions: {
    roles: UserRole[];
    allowedTaskTypes: TaskType[];
    organizationId?: mongoose.Schema.Types.ObjectId;
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

export interface ApiTokenDoc extends Document, ApiTokenInterface {
  version: number;
}

export interface ApiTokenModel extends Model<ApiTokenDoc> {
  build: (attrs: ApiTokenInterface) => ApiTokenDoc;
}

const apiTokenSchema = new mongoose.Schema<ApiTokenInterface>(
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
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.tokenHash; // Never expose hash
      },
    },
  },
);

// Indexes for performance
apiTokenSchema.index({ userId: 1, isActive: 1 });
apiTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Static build method
apiTokenSchema.statics.build = (attrs: ApiTokenInterface) => {
  return new ApiToken(attrs);
};

const ApiToken: ApiTokenModel = mongoose.model<ApiTokenDoc, ApiTokenModel>(
  "ApiToken",
  apiTokenSchema,
);

export { ApiToken };
