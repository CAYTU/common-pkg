import { Types } from "mongoose";
import { IMongooseObjectExt } from "../../types/utils/models";
import { ObjectStates } from "../../types/utils";
import { FileContextType, TemplateSetupOptions } from "../utils";

/**
 * Interface representing an instance of an avatar, which can include information about
 * its cloud deployment and state.
 * @interface
 */
export interface AvatarInstanceInterface extends IMongooseObjectExt {
  /**
   * The ID of the avatar that this instance is associated with.
   */
  avatarId: Types.ObjectId;

  /**
   * The unique identifier of the cloud instance (e.g., AWS EC2 instance ID)
   * where this avatar is deployed (optional).
   */
  instanceId?: string;

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
  templateSetup?: TemplateSetupOptions;

  /**
   * Specifies the type of file context, in case the service needs to know it during setup
   * (optional). This could relate to the type of files being used for the avatar's setup,
   * such as configuration or deployment files.
   */
  fileContextType?: FileContextType;

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
   * Specifies if this avatar instance is public, allowing anyone to access it (optional).
   * If `true`, the avatar instance is publicly accessible.
   */
  public?: boolean;

  /********************************
   * GCP-specific fields
   ********************************/

  /**
   * The Google Cloud Platform zone where the avatar instance is running (optional).
   */
  zone?: string;
}
