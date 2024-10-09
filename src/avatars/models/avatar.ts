import { Types } from "mongoose";
import { IMongooseObjectExt } from "../../types/utils/models";
import { AvatarPlatformType } from "../utils";

/**
 * Represents an avatar configuration, including details for cloud deployment (AWS EC2, Lambda, S3, GCP)
 * and organizational ownership.
 */
export interface AvatarInterface extends IMongooseObjectExt {
  /**
   * The name of the avatar.
   */
  name: string;

  /**
   * URL or reference to the avatar's image (optional).
   */
  image?: string;

  /**
   * Short description of the avatar (optional).
   */
  description?: string;

  /**
   * Cloud stack name associated with this avatar (e.g., AWS CloudFormation stack name).
   */
  stackName: string;

  /**
   * Platform on which the avatar operates (optional). This could be a platform type
   * such as AWS, GCP, etc., defined by the AvatarPlatformType enum.
   */
  platform?: AvatarPlatformType;

  /**
   * Indicates whether the avatar is non-configurable (optional).
   * If true, the avatar's settings cannot be modified.
   */
  nonConfigurable?: boolean;

  /**
   * The organization to which this avatar belongs.
   */
  organizationId: Types.ObjectId;

  /**
   * The id of the user who created this avatar (optional).
   */
  user?: Types.ObjectId;

  /**
   * Indicates whether the avatar is publicly accessible.
   * If true, the avatar is available to everyone; otherwise, it is restricted to the organization.
   */
  public: boolean;

  /**
   * ID of the last user who modified this avatar (optional).
   */
  lastModifiedBy?: Types.ObjectId;

  /**************************
   * AWS-specific fields
   **************************/

  /**
   * AWS region for the avatar's cloud resources (optional).
   */
  awsRegion?: string;

  /**
   * IAM role for the EC2 instance, which defines permissions
   * and access for the avatar's EC2 resources (optional).
   */
  ec2IAMRole?: string;

  /**
   * The name of the EC2 key pair for secure access to the instance (optional).
   */
  ec2KeyPair?: string;

  /**
   * Security groups to be associated with the EC2 instance (optional).
   * These define network access controls.
   */
  ec2SecurityGroups?: string[];

  /**
   * The S3 bucket name used by the avatar for storage, such as configuration files
   * or related data (optional).
   */
  s3Bucket?: string;

  /**
   * Key in the S3 bucket for storing the template file related to this avatar's
   * infrastructure (optional). This might refer to a CloudFormation or Lambda template.
   */
  templateKey?: string;

  /**
   * The Amazon Machine Image (AMI) ID used to launch the EC2 instance for the avatar (optional).
   */
  amiId?: string;

  /**
   * EC2 instance type (e.g., t2.micro) specifying the hardware configuration for
   * running the avatar's cloud-based services (optional).
   */
  instanceType?: string;

  /**
   * IAM role ARN to be assumed by the Lambda function for the avatar (optional).
   */
  lambdaRoleArn?: string;

  /**
   * The key in the S3 bucket where the Lambda function's deployment package (ZIP) is stored (optional).
   */
  lambdaZipKey?: string;

  /**
   * The name of an SSM or configuration document that may be used to manage the EC2 instance
   * or other cloud resources (optional).
   */
  documentName?: string;

  /**
   * Source AWS account ID from which certain resources, such as AMIs or roles, may be shared (optional).
   */
  sourceAccount?: string;

  /**
   * Subnet IDs within the VPC where the EC2 instance is deployed (optional).
   * These define network access to the instance.
   */
  subnetIds?: string[];

  /********************************
   * GCP-specific fields
   ********************************/

  /**
   * The Google Cloud Platform project ID where the avatar is deployed (optional).
   */
  projectId?: string;

  /**
   * GCP region for the avatar's cloud resources (optional).
   */
  gcpRegion?: string;

  /**
   * Name of the instance group in GCP for managing the avatar's resources (optional).
   */
  instanceGroupName?: string;
}
