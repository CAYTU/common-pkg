/**
 * This module used to carry a second, hand-maintained copy of `UserRole`,
 * `PrimaryRoles` and `UserPermissions`. `utils/encryptor` typed the JWT payload
 * against that copy while the RBAC guards used the one in `types/utils`, so the
 * two could drift apart while still comparing equal at runtime, as string enums
 * do.
 *
 * `types/utils` is the single source of truth. This re-export keeps existing
 * importers working.
 */
export {
  UserRole,
  PrimaryRoles,
  UserPermissions,
  isPrimaryRole,
  isUserPermission,
  splitRoles,
} from "../../types/utils";
export type { PrimaryRole, UserPermission } from "../../types/utils";
