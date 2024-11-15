/**
 * Type representing the platform used for the avatar's deployment.
 */
export type AvatarPlatformType = "aws" | "gcp";

/**
 * Represents the setup data for configuring an assistant or avatar with models, services, and user-specific details.
 */
export interface TemplateSetupData {
  /**
   * A record of API keys used for external services.
   * The key is a string representing the service name, and the value is the corresponding API key.
   */
  api_keys?: Record<string, string>;

  /**
   * An object containing the models used by the assistant for different tasks such as transcription, completion, and speech processing.
   */
  models?: {
    /**
     * The model used for transcription (e.g., converting speech to text).
     */
    transcription_model?: string;

    /**
     * The model used for text completion (e.g., generating or completing text responses).
     */
    completion_model?: string;

    /**
     * The model used for speech recognition or processing.
     */
    speech_model?: string;

    /**
     * The model used for voice synthesis (e.g., converting text to speech).
     */
    voice?: string;
  };

  /**
   * An object containing configurations for various services the assistant interacts with.
   * It includes optional embedding services for handling text embeddings.
   */
  services: {
    [key: string]: any;
    /**
     * Configuration for embedding services, such as models and credentials used to generate text embeddings.
     */
    embedding?: {
      /**
       * The model used for generating text embeddings.
       */
      embedding_model?: string;

      /**
       * Credentials for accessing embedding-related services, particularly for documents.
       */
      credentials?: {
        /**
         * A document credential, which might be used to authenticate or authorize access to document processing services.
         */
        document?: string;
      };
    };
  };

  /**
   * An object containing details about the assistant, including its name and user-related context.
   */
  assistant?: {
    /**
     * The name of the assistant or avatar.
     */
    assistant_name?: string;

    /**
     * An object representing the user information interacting with the assistant.
     */
    user?: {
      /**
       * The first name of the user.
       */
      firstname: string;

      /**
       * The full name of the user.
       */
      Name: string;

      /**
       * The job function or role of the user.
       */
      Function: string;
    };

    /**
     * The base context used by the assistant during interactions (e.g., initial setup or default information).
     */
    base_context?: string;

    /**
     * Additional context for the assistant, which could be null if no extra context is provided.
     */
    addition_context: string | null;
  };
}
