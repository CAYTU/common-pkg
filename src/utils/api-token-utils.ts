import * as crypto from "crypto";
import * as bcrypt from "bcryptjs";

export interface GenerateTokenResult {
  plainToken: string;
  tokenHash: string;
  tokenPrefix: string;
}

export class ApiTokenUtils {
  private static readonly PREFIX_LIVE = "ct_live_";
  private static readonly PREFIX_TEST = "ct_test_";
  private static readonly TOKEN_LENGTH = 64;

  // Generate new API token
  static async generate(
    environment: "production" | "development" = "production",
  ): Promise<GenerateTokenResult> {
    const prefix =
      environment === "production" ? this.PREFIX_LIVE : this.PREFIX_TEST;
    const randomBytes = crypto.randomBytes(this.TOKEN_LENGTH);
    const tokenSecret = randomBytes.toString("hex");
    const plainToken = `${prefix}${tokenSecret}`;

    // Hash for storage
    const salt = await bcrypt.genSalt(12);
    const tokenHash = await bcrypt.hash(plainToken, salt);

    return { plainToken, tokenHash, tokenPrefix: prefix };
  }

  // Verify token against hash
  static async verify(plainToken: string, tokenHash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainToken, tokenHash);
    } catch (error) {
      return false;
    }
  }

  // Check if token format is valid
  static isValidFormat(token: string): boolean {
    return (
      token.startsWith(this.PREFIX_LIVE) || token.startsWith(this.PREFIX_TEST)
    );
  }

  // Extract prefix from token
  static extractPrefix(token: string): string {
    if (token.startsWith(this.PREFIX_LIVE)) return this.PREFIX_LIVE;
    if (token.startsWith(this.PREFIX_TEST)) return this.PREFIX_TEST;
    return "";
  }
}
