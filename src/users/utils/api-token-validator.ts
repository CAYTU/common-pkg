import { ApiToken } from "../models/api-tokens";
import { UserPayload } from "../../utils/encryptor";
import { ApiTokenUtils } from "../../utils/api-token-utils";

// Complete API token validation function
export const validateApiToken = async (token: string): Promise<UserPayload> => {
  const prefix = ApiTokenUtils.extractPrefix(token);
  if (!prefix) {
    throw new Error("Invalid API token format");
  }

  // Find tokens with matching prefix
  const apiTokens = await ApiToken.find({
    tokenPrefix: prefix,
    isActive: true,
  }).populate(
    "userId",
    "username roles allowedTaskTypes ownedOrganizationId rolesInOrganization isVerified isCompleted",
  );

  if (!apiTokens || apiTokens.length === 0) {
    throw new Error("Invalid or revoked API token");
  }

  // Verify token against stored hashes
  let validToken: any = null;
  for (const apiToken of apiTokens) {
    const isValid = await ApiTokenUtils.verify(token, apiToken.tokenHash);
    if (isValid) {
      validToken = apiToken;
      break;
    }
  }

  if (!validToken) {
    throw new Error("Invalid API token");
  }

  // Check expiration
  if (validToken.expiresAt && new Date() > validToken.expiresAt) {
    throw new Error("API token has expired");
  }

  // Check if user is active
  const user = validToken.userId;
  if (!user || !user.isVerified) {
    throw new Error("User account is not active");
  }

  // Update last used timestamp (async)
  ApiToken.findByIdAndUpdate(validToken._id, {
    lastUsedAt: new Date(),
  })
    .exec()
    .catch(() => {});

  // Return UserPayload format
  return {
    id: user._id.toString(),
    username: user.username,
    roles: validToken.permissions.roles,
    allowedTaskTypes: validToken.permissions.allowedTaskTypes,
    currentOrganizationId: validToken.permissions.organizationId?.toString(),
    ownedOrganizationId: user.ownedOrganizationId?.toString(),
    rolesInCurrentOrganization: getUserRolesInOrg(
      user,
      validToken.permissions.organizationId?.toString(),
    ),
    isVerified: user.isVerified,
    isCompleted: user.isCompleted,
  };
};

// Helper function
function getUserRolesInOrg(user: any, organizationId?: string) {
  if (!organizationId) return undefined;
  return user.rolesInOrganization?.find(
    (org: any) => org.organizationId.toString() === organizationId,
  );
}
