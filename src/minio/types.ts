// types.ts
export interface StorageConfig {
  endpoint: string;
  port?: number;
  useSSL?: boolean;
  accessKey: string;
  secretKey: string;
  region?: string;
  bucket: string;
}

export interface StorageObject {
  key: string;
  size: number;
  lastModified: Date;
  etag?: string;
}

export interface UploadOptions {
  contentType?: string;
  metadata?: Record<string, string>;
  publicRead?: boolean;
}

export interface StorageClient {
  upload(
    key: string,
    data: Buffer | Blob | string,
    options?: UploadOptions,
  ): Promise<void>;
  download(key: string): Promise<Buffer>;
  delete(key: string): Promise<void>;
  list(prefix?: string): Promise<StorageObject[]>;
  getSignedUrl(key: string, expiresIn?: number): Promise<string>;
}
