import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { ForbiddenErr } from "../../errors/forbidden";
import {
  PrimaryRole,
  UserPermission,
  UserRole,
  isUserPermission,
} from "../../types/utils";

/**
 * Roles come in two axes, and they must not be read against each other.
 *
 * A *primary role* says who someone is. It exists per scope: a user has a
 * primary role on the platform (`roles`) and one in each organization they
 * belong to (`rolesInCurrentOrganization.roles`). `SuperAdmin` is the exception
 * — it is platform-only, and a `super-admin` value sitting in an organization's
 * array must grant nothing, or any organization could mint a platform
 * administrator.
 *
 * A *member permission* (`create`, `update`, `delete`, `readOnly`, and the `all`
 * wildcard) says what a member may do inside one organization. It is only ever
 * read from that organization's array. `all` has never meant super-admin; it
 * means "every verb, for this member, in this organization".
 *
 * Until the role-partition migration has run, live data still carries
 * permissions in the platform array. Reading strictly on day one would silently
 * revoke verbs from those users, so permission reads fall back to the platform
 * array and warn. Set STRICT_ROLE_AXES=true once an environment's data has been
 * migrated, to drop the fallback. See CAYTU/Caytu-Infra#920.
 */
const strictAxes = () => process.env.STRICT_ROLE_AXES === "true";

const platformRolesOf = (user: any): UserRole[] => user?.roles ?? [];

const orgRolesOf = (user: any): UserRole[] =>
  user?.rolesInCurrentOrganization?.roles ?? [];

/**
 * Identity check. `SuperAdmin` is honoured only from the platform array; every
 * other primary role may be held either on the platform or in the current
 * organization.
 */
const hasPrimaryRole = (user: any, roles: PrimaryRole[]): boolean => {
  const platform = platformRolesOf(user);
  const org = orgRolesOf(user);

  return roles.some((role) =>
    role === UserRole.SuperAdmin
      ? platform.includes(role)
      : platform.includes(role) || org.includes(role),
  );
};

/**
 * Permission check, satisfied by any of:
 *   - a super-admin on the platform, or an admin here — identity implies verbs;
 *   - the `all` wildcard in this organization;
 *   - the specific permission in this organization.
 *
 * In compat mode the last two also accept the permission from the platform
 * array, which is where unmigrated data still keeps it.
 */
const hasPermission = (user: any, permissions: UserPermission[]): boolean => {
  if (hasPrimaryRole(user, [UserRole.SuperAdmin, UserRole.Admin])) return true;

  const granted: UserRole[] = [...permissions, UserRole.All];
  const org = orgRolesOf(user);
  if (granted.some((permission) => org.includes(permission))) return true;

  if (strictAxes()) return false;

  const legacy = platformRolesOf(user).filter(isUserPermission);
  const matched = granted.some((permission) =>
    legacy.includes(permission as UserPermission),
  );

  if (matched) {
    console.warn(
      `[rbac] user ${user?.id ?? "?"} granted ${permissions.join("/")} from a ` +
        `platform-array permission (${legacy.join(",")}). Member permissions belong ` +
        `in rolesInOrganization — run the role-partition migration, then set ` +
        `STRICT_ROLE_AXES=true.`,
    );
  }

  return matched;
};

/**
 * Role Based Access Control (RBAC) middleware for user access control.
 */
const RbaUserACL = {
  hasPrimaryRole,
  hasPermission,

  /** Allows super-admins, admins, and members holding `create` (or `all`). */
  canCreate: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (hasPermission(req.currentUser, [UserRole.Create])) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /** Allows super-admins, admins, and members holding `update` (or `all`). */
  canEdit: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (hasPermission(req.currentUser, [UserRole.Update])) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /** Allows super-admins, admins, and members holding `delete` (or `all`). */
  canDelete: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (hasPermission(req.currentUser, [UserRole.Delete])) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /**
   * Allows anyone who is somebody. Every primary role can read, so this is an
   * identity check, with an escape hatch for a member whose only grant is
   * `readOnly` (or `all`).
   */
  canReadOnly: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const isSomebody = hasPrimaryRole(req.currentUser, [
        UserRole.Invited,
        UserRole.Robot,
        UserRole.Customer,
        UserRole.Developer,
        UserRole.Operator,
        UserRole.Admin,
        UserRole.SuperAdmin,
      ]);

      if (isSomebody || hasPermission(req.currentUser, [UserRole.ReadOnly])) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /** Allows customers and anyone above them. */
  isCustomer: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        hasPrimaryRole(req.currentUser, [
          UserRole.Customer,
          UserRole.Admin,
          UserRole.Operator,
          UserRole.Developer,
          UserRole.SuperAdmin,
        ])
      ) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /** Allows operators, admins and super-admins. */
  isOperator: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        hasPrimaryRole(req.currentUser, [
          UserRole.Admin,
          UserRole.Operator,
          UserRole.SuperAdmin,
        ])
      ) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /** Allows admins and super-admins. */
  isAdmin: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        hasPrimaryRole(req.currentUser, [UserRole.Admin, UserRole.SuperAdmin])
      ) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /**
   * Allows super-admins only, and only by virtue of the platform array — a
   * `super-admin` value inside an organization's roles grants nothing here.
   */
  isSuperAdmin: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (hasPrimaryRole(req.currentUser, [UserRole.SuperAdmin])) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /** Allows developers and super-admins. */
  isDeveloper: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        hasPrimaryRole(req.currentUser, [
          UserRole.Developer,
          UserRole.SuperAdmin,
        ])
      ) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),

  /** Allows robot accounts and super-admins. */
  isRobot: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        hasPrimaryRole(req.currentUser, [UserRole.Robot, UserRole.SuperAdmin])
      ) {
        next();
      } else {
        throw new ForbiddenErr(
          `You are not allowed to perform this operation.`,
        );
      }
    },
  ),
};

export { RbaUserACL };
