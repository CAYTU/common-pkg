import { FileContextType } from "../enums";

/**
 * Represents a template setup data object for an avatar.
 */
export interface TemplateSetupData {
  channel_name?: string;
  apiKey?: string;
  transcription_model?: string;
  completion_model?: string;
  speech_model?: string;
  voice_model?: string;
  think_mode?: string;
  file_context_type?: FileContextType;
  s3_context_key?: string;
  conversation_history?: {
    [key: string]: string;
  }[];
}
