// import { Client as MinioClient, BucketItem } from "minio";
// import {
//   StorageClient,
//   StorageConfig,
//   StorageObject,
//   UploadOptions,
// } from "../types";

// // Error handling types and utilities
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
//     return new Error(String(maybeError));
//   }
// }

// function getErrorMessage(error: unknown) {
//   return toErrorWithMessage(error).message;
// }

// export class MinioStorageClient implements StorageClient {
//   private client: MinioClient;
//   private bucket: string;

//   constructor(config: StorageConfig) {
//     this.client = new MinioClient({
//       endPoint: config.endpoint,
//       port: config.port,
//       useSSL: config.useSSL ?? true,
//       accessKey: config.accessKey,
//       secretKey: config.secretKey,
//       region: config.region,
//     });
//     this.bucket = config.bucket;
//   }

//   async upload(
//     key: string,
//     data: Buffer | Blob | string,
//     options?: UploadOptions,
//   ): Promise<void> {
//     try {
//       const buffer = await this.toBuffer(data);
//       await this.client.putObject(this.bucket, key, buffer, buffer.length, {
//         "Content-Type": options?.contentType,
//         ...options?.metadata,
//       });

//       if (options?.publicRead) {
//         await this.client.setBucketPolicy(
//           this.bucket,
//           this.generatePublicPolicy(key),
//         );
//       }
//     } catch (error) {
//       throw new Error(
//         `Failed to upload object ${key}: ${getErrorMessage(error)}`,
//       );
//     }
//   }

//   async download(key: string): Promise<Buffer> {
//     try {
//       const stream = await this.client.getObject(this.bucket, key);
//       return new Promise((resolve, reject) => {
//         const chunks: Buffer[] = [];
//         stream.on("data", (chunk: Buffer) => chunks.push(chunk));
//         stream.on("end", () => resolve(Buffer.concat(chunks)));
//         stream.on("error", (error) =>
//           reject(new Error(getErrorMessage(error))),
//         );
//       });
//     } catch (error) {
//       throw new Error(
//         `Failed to download object ${key}: ${getErrorMessage(error)}`,
//       );
//     }
//   }

//   async delete(key: string): Promise<void> {
//     try {
//       await this.client.removeObject(this.bucket, key);
//     } catch (error) {
//       throw new Error(
//         `Failed to delete object ${key}: ${getErrorMessage(error)}`,
//       );
//     }
//   }

//   async list(prefix?: string): Promise<StorageObject[]> {
//     const stream = this.client.listObjects(this.bucket, prefix);
//     const objects: StorageObject[] = [];

//     return new Promise((resolve, reject) => {
//       stream.on("data", (obj: BucketItem) => {
//         // Ensure all required properties are present and valid
//         if (!obj.name || typeof obj.size !== "number" || !obj.lastModified) {
//           console.warn(`Skipping invalid object: ${JSON.stringify(obj)}`);
//           return;
//         }

//         objects.push({
//           key: obj.name,
//           size: obj.size,
//           lastModified: obj.lastModified,
//           etag: obj.etag || undefined,
//         } satisfies StorageObject);
//       });
//       stream.on("end", () => resolve(objects));
//       stream.on("error", (error) => reject(new Error(getErrorMessage(error))));
//     });
//   }

//   async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
//     try {
//       const url = await this.client.presignedGetObject(
//         this.bucket,
//         key,
//         expiresIn,
//       );
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

//   private generatePublicPolicy(key: string): string {
//     return JSON.stringify({
//       Version: "2012-10-17",
//       Statement: [
//         {
//           Sid: "PublicRead",
//           Effect: "Allow",
//           Principal: "*",
//           Action: ["s3:GetObject"],
//           Resource: [`arn:aws:s3:::${this.bucket}/${key}`],
//         },
//       ],
//     });
//   }
// }
