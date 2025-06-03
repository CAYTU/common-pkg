import { Types } from "mongoose";
import { IMongooseObjectExt } from "../../types/utils/models";
import { ObjectStates } from "../../types/utils";

/**
 * Interface representing an instance of an avatar, which can include information about
 * its cloud deployment and state.
 * @interface
 */
export interface AvatarPoolInterface extends IMongooseObjectExt {
  /**
   * The ID of the avatar that this pool is associated with.
   */
  avatarId: Types.ObjectId;

  /**
   * ID of the associated task that may have triggered or is running this avatar instance (optional).
   */
  taskId?: string;

  /**
   * The current state of the avatar instance, indicating its operational status
   * (e.g., active, inactive, or terminated). This is defined by the `ObjectStates` enum (optional).
   */
  state?: ObjectStates;

  /**
   * Configuration options for setting up the avatar template,
   * such as specific setup instructions or parameters (optional).
   */
  templateSetup?: any;

  /**
   * The key to an S3 object that stores the avatar's setup template.
   * This might be used for retrieving setup files during initialization (optional).
   */
  templateSetupS3UrlKey?: string;

  /**
   * The ID of the current user's session. This could track a session during the
   * avatar's use (optional).
   */
  currentUserSession?: string;

  /**
   * The ID of the user who created or is operating this avatar instance (optional).
   */
  user?: Types.ObjectId;

  /**
   * The ID of the organization that owns this avatar instance (optional).
   */
  organizationId?: Types.ObjectId;

  /**
   * Array of user IDs that this avatar instance is shared with (optional).
   * These users may have access to the avatar instance, depending on the sharing policy.
   */
  sharedWith?: Types.ObjectId[];

  /**
   * Specifies if this avatar instance is scalable, allowing to automatically scale it (optional).
   */
  scalable?: boolean;

  /**
   * The number of avatar instances in the pool (optional).
   */
  count?: Number;

  /**
   * The limit number of avatar instances in the pool (optional).
   */
  limit?: Number;

  /**
   * Specifies if this avatar instance is public, allowing anyone to access it (optional).
   * If `true`, the avatar instance is publicly accessible.
   */
  public?: boolean;

  /**
   * The AWS SSM document name used to run the avatar instance (optional).
   */
  documentName?: string;

  /**
   * The Google Cloud Platform zone where the avatar instance is running (optional).
   */
  zone?: string;

  /**
   * The Google Cloud Platform region where the avatar instance is running (optional).
   */
  region?: string;

  /**
   * The Google Cloud Platform instance group where the avatar instance belong (optional).
   */
  groupName?: string;
}
