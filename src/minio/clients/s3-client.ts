// import { S3 } from "aws-sdk";
// import {
//   StorageClient,
//   StorageConfig,
//   StorageObject,
//   UploadOptions,
// } from "../types";

// // Type guard for error objects
// interface ErrorWithMessage {
//   message: string;
// }

// function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
//   return (
//     typeof error === "object" &&
//     error !== null &&
//     "message" in error &&
//     typeof (error as Record<string, unknown>).message === "string"
//   );
// }

// function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
//   if (isErrorWithMessage(maybeError)) return maybeError;

//   try {
//     return new Error(JSON.stringify(maybeError));
//   } catch {
//     // fallback in case there's an error stringifying the maybeError
//     // like with circular references for example
//     return new Error(String(maybeError));
//   }
// }

// function getErrorMessage(error: unknown) {
//   return toErrorWithMessage(error).message;
// }

// interface S3ObjectMetadata {
//   Key?: string;
//   Size?: number;
//   LastModified?: Date;
//   ETag?: string;
// }

// export class S3StorageClient implements StorageClient {
//   private client: S3;
//   private bucket: string;

//   constructor(config: StorageConfig) {
//     this.client = new S3({
//       endpoint: config.endpoint,
//       accessKeyId: config.accessKey,
//       secretAccessKey: config.secretKey,
//       region: config.region,
//       s3ForcePathStyle: true, // Required for MinIO compatibility
//       signatureVersion: "v4",
//     });
//     this.bucket = config.bucket;
//   }

//   async upload(
//     key: string,
//     data: Buffer | Blob | string,
//     options?: UploadOptions,
//   ): Promise<void> {
//     const buffer = await this.toBuffer(data);

//     const params: S3.PutObjectRequest = {
//       Bucket: this.bucket,
//       Key: key,
//       Body: buffer,
//       ContentType: options?.contentType,
//       Metadata: options?.metadata,
//       ACL: options?.publicRead ? "public-read" : "private",
//     };

//     try {
//       await this.client.upload(params).promise();
//     } catch (error) {
//       throw new Error(
//         `Failed to upload object ${key}: ${getErrorMessage(error)}`,
//       );
//     }
//   }

//   async download(key: string): Promise<Buffer> {
//     try {
//       const response = await this.client
//         .getObject({
//           Bucket: this.bucket,
//           Key: key,
//         })
//         .promise();

//       if (!response.Body) {
//         throw new Error("Response body is empty");
//       }

//       return Buffer.from(response.Body as Buffer | Uint8Array);
//     } catch (error) {
//       throw new Error(
//         `Failed to download object ${key}: ${getErrorMessage(error)}`,
//       );
//     }
//   }

//   async delete(key: string): Promise<void> {
//     try {
//       await this.client
//         .deleteObject({
//           Bucket: this.bucket,
//           Key: key,
//         })
//         .promise();
//     } catch (error) {
//       throw new Error(
//         `Failed to delete object ${key}: ${getErrorMessage(error)}`,
//       );
//     }
//   }

//   async list(prefix?: string): Promise<StorageObject[]> {
//     const objects: StorageObject[] = [];
//     let continuationToken: string | undefined;

//     do {
//       try {
//         const response = await this.client
//           .listObjectsV2({
//             Bucket: this.bucket,
//             Prefix: prefix,
//             ContinuationToken: continuationToken,
//           })
//           .promise();

//         response.Contents?.forEach((item: S3ObjectMetadata) => {
//           if (!item.Key) {
//             return; // Skip items without a key
//           }

//           objects.push({
//             key: item.Key,
//             size: item.Size ?? 0,
//             lastModified: item.LastModified ?? new Date(),
//             etag: item.ETag,
//           });
//         });

//         continuationToken = response.NextContinuationToken;
//       } catch (error) {
//         throw new Error(`Failed to list objects: ${getErrorMessage(error)}`);
//       }
//     } while (continuationToken);

//     return objects;
//   }

//   async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
//     try {
//       const url = await this.client.getSignedUrlPromise("getObject", {
//         Bucket: this.bucket,
//         Key: key,
//         Expires: expiresIn,
//       });

//       if (!url) {
//         throw new Error("Generated URL is empty");
//       }

//       return url;
//     } catch (error) {
//       throw new Error(
//         `Failed to generate signed URL for ${key}: ${getErrorMessage(error)}`,
//       );
//     }
//   }

//   private async toBuffer(data: Buffer | Blob | string): Promise<Buffer> {
//     if (Buffer.isBuffer(data)) return data;
//     if (typeof data === "string") return Buffer.from(data);
//     return Buffer.from(await data.arrayBuffer());
//   }
// }
