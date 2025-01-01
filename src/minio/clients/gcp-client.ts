import { Storage, File } from "@google-cloud/storage";
import {
  StorageClient,
  StorageConfig,
  StorageObject,
  UploadOptions,
} from "../types";

// Type guard for error objects
interface ErrorWithMessage {
  message: string;
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example
    return new Error(String(maybeError));
  }
}

function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

// Interface for GCP File metadata
interface GCPFileMetadata {
  size?: string | number;
  updated?: string;
  etag?: string;
}

export class GCPStorageClient implements StorageClient {
  private client: Storage;
  private bucket: string;

  constructor(config: StorageConfig) {
    this.client = new Storage({
      apiEndpoint: config.endpoint,
      credentials: {
        client_email: config.accessKey,
        private_key: config.secretKey,
      },
      projectId: config.region,
    });
    this.bucket = config.bucket;
  }

  async upload(
    key: string,
    data: Buffer | Blob | string,
    options?: UploadOptions,
  ): Promise<void> {
    const buffer = await this.toBuffer(data);
    const bucket = this.client.bucket(this.bucket);
    const file = bucket.file(key);

    try {
      await file.save(buffer, {
        contentType: options?.contentType,
        metadata: options?.metadata,
        public: options?.publicRead,
        validation: false,
      });
    } catch (error) {
      throw new Error(
        `Failed to upload object ${key}: ${getErrorMessage(error)}`,
      );
    }
  }

  async download(key: string): Promise<Buffer> {
    const bucket = this.client.bucket(this.bucket);
    const file = bucket.file(key);

    try {
      const [buffer] = await file.download();
      return buffer;
    } catch (error) {
      throw new Error(
        `Failed to download object ${key}: ${getErrorMessage(error)}`,
      );
    }
  }

  async delete(key: string): Promise<void> {
    const bucket = this.client.bucket(this.bucket);
    const file = bucket.file(key);

    try {
      await file.delete();
    } catch (error) {
      throw new Error(
        `Failed to delete object ${key}: ${getErrorMessage(error)}`,
      );
    }
  }

  async list(prefix?: string): Promise<StorageObject[]> {
    const bucket = this.client.bucket(this.bucket);
    const objects: StorageObject[] = [];

    try {
      const [files] = await bucket.getFiles({ prefix });

      files.forEach((file: File) => {
        const metadata = file.metadata as GCPFileMetadata;

        // Ensure we have valid size and updated values
        const size =
          metadata.size !== undefined
            ? typeof metadata.size === "string"
              ? parseInt(metadata.size, 10)
              : metadata.size
            : 0;

        const lastModified = metadata.updated
          ? new Date(metadata.updated)
          : new Date();

        objects.push({
          key: file.name,
          size,
          lastModified,
          etag: metadata.etag,
        });
      });

      return objects;
    } catch (error) {
      throw new Error(`Failed to list objects: ${getErrorMessage(error)}`);
    }
  }

  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    const bucket = this.client.bucket(this.bucket);
    const file = bucket.file(key);

    try {
      const [url] = await file.getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + expiresIn * 1000,
      });
      return url;
    } catch (error) {
      throw new Error(
        `Failed to generate signed URL for ${key}: ${getErrorMessage(error)}`,
      );
    }
  }

  private async toBuffer(data: Buffer | Blob | string): Promise<Buffer> {
    if (Buffer.isBuffer(data)) return data;
    if (typeof data === "string") return Buffer.from(data);
    return Buffer.from(await data.arrayBuffer());
  }
}
