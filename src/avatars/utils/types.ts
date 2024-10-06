// Type definitions for avatars

/**
 * Type representing the file context for a task, specifying the type of
 * data involved (e.g., text, audio, or file).
 */
export type FileContextType = "text" | "audio" | "file";

/**
 * Type representing the platform used for the avatar's deployment.
 */
export type AvatarPlatformType = "aws" | "gcp";

/**
 * Represents a template setup data object for an avatar, containing configurations
 * and parameters used during the avatar's setup process.
 */
export interface TemplateSetupData {
  /**
   * The name of the communication or messaging channel for the avatar (optional).
   * This could represent a unique identifier for a specific channel the avatar will interact with.
   */
  channel_name?: string;

  /**
   * API key used for authenticating requests to external services or platforms (optional).
   * This could be necessary for services like transcription, speech, or AI models.
   */
  apiKey?: string;

  /**
   * The model used for transcription (optional).
   * This could represent an AI model name or version that the avatar uses for speech-to-text.
   */
  transcription_model?: string;

  /**
   * The model used for text completion (optional).
   * This defines the AI model the avatar uses for generating or completing text responses.
   */
  completion_model?: string;

  /**
   * The model used for speech processing (optional).
   * This refers to the specific model for processing or recognizing speech inputs.
   */
  speech_model?: string;

  /**
   * The model used for voice synthesis (optional).
   * This defines the avatar's voice or speech generation model for converting text into spoken audio.
   */
  voice_model?: string;

  /**
   * The mode of thinking or reasoning applied by the avatar during interactions (optional).
   * This could refer to a predefined mode or style the avatar uses to approach conversations.
   */
  think_mode?: string;

  /**
   * Type of file context related to the avatar's setup (optional).
   * This defines the context in which files are used during the avatar's setup,
   * such as configuration or initialization files.
   */
  file_context_type?: FileContextType;

  /**
   * S3 key for retrieving the file containing the context for the avatar setup (optional).
   * This key points to a file in an S3 bucket used during the avatar's initialization.
   */
  s3_context_key?: string;

  /**
   * A history of previous conversations the avatar has been involved in (optional).
   * This is an array of key-value objects where each key represents a context
   * identifier and the value is the corresponding conversation data.
   */
  conversation_history?: {
    [key: string]: string;
  }[];
}
