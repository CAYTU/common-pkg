import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { ForbiddenErr } from "../../errors/forbidden";
import { UserRole } from "../../types/utils";

/**
 * Role Based Access Control (RBAC) middleware for user access control.
 */
const RbaUserACL = {
  /**
   * Middleware that allows access for users with UserRole.Create, UserRole.All, or UserRole.Admin roles.
   * Throws a ForbiddenErr if access is denied.
   */
  canCreate: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      let hasSufficientPermissions = false;
      let lackingRole: string | undefined;

      if (userRoles) {
        for (const role of userRoles) {
          if (
            [UserRole.Create, UserRole.All, UserRole.SuperAdmin].includes(role)
          ) {
            hasSufficientPermissions = true;
            break;
          } else {
            lackingRole = role;
          }
        }
      }

      if (hasSufficientPermissions) {
        next();
      } else {
        throw new ForbiddenErr(
          `You do not have sufficient permissions as ${
            lackingRole ?? "user"
          } to perform this operation.`
        );
      }
    }
  ),

  /**
   * Middleware that allows access for users with UserRole.Update, UserRole.All, or UserRole.Admin roles.
   * Throws a ForbiddenErr if access is denied.
   */
  canEdit: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      let hasSufficientPermissions = false;
      let lackingRole: string | undefined;

      if (userRoles) {
        for (const role of userRoles) {
          if (
            [UserRole.All, UserRole.Update, UserRole.SuperAdmin].includes(role)
          ) {
            hasSufficientPermissions = true;
            break;
          } else {
            lackingRole = role;
          }
        }
      }

      if (hasSufficientPermissions) {
        next();
      } else {
        throw new ForbiddenErr(
          `You do not have sufficient permissions as ${
            lackingRole ?? "user"
          } to perform this operation.`
        );
      }
    }
  ),

  /**
   * Middleware that allows access for users with UserRole.Delete, UserRole.All, or UserRole.Admin roles.
   * Throws a ForbiddenErr if access is denied.
   */
  canDelete: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      let hasSufficientPermissions = false;
      let lackingRole: string | undefined;

      if (userRoles) {
        for (const role of userRoles) {
          if (
            [UserRole.All, UserRole.Delete, UserRole.SuperAdmin].includes(role)
          ) {
            hasSufficientPermissions = true;
            break;
          } else {
            lackingRole = role;
          }
        }
      }

      if (hasSufficientPermissions) {
        next();
      } else {
        throw new ForbiddenErr(
          `You do not have sufficient permissions as ${
            lackingRole ?? "user"
          } to perform this operation.`
        );
      }
    }
  ),

  /**
   * Middleware that allows read-only access for users with UserRole.ReadOnly, UserRole.All, or UserRole.Admin roles.
   * Throws a ForbiddenErr if access is denied.
   */
  canReadOnly: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      let hasSufficientPermissions = false;
      let lackingRole: string | undefined;

      if (userRoles) {
        for (const role of userRoles) {
          if (
            [
              UserRole.ReadOnly,
              UserRole.All,
              UserRole.Admin,

              // By the read-only role is attributed to all basic roles
              UserRole.Customer,
              UserRole.Operator,
              UserRole.Developer,
              UserRole.Robot,
              UserRole.Invited,

              UserRole.SuperAdmin,
            ].includes(role)
          ) {
            hasSufficientPermissions = true;
            break;
          } else {
            lackingRole = role;
          }
        }
      }

      if (hasSufficientPermissions) {
        next();
      } else {
        throw new ForbiddenErr(
          `You do not have sufficient permissions as ${
            lackingRole ?? "user"
          } to perform this operation.`
        );
      }
    }
  ),

  /**
   * Middleware that allows access for users with UserRole.Customer, UserRole.Admin, UserRole.All, or UserRole.Operator roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isCustomer: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      let hasSufficientPermissions = false;
      let lackingRole: string | undefined;

      if (userRoles) {
        for (const role of userRoles) {
          if (
            [
              UserRole.Customer,
              UserRole.Admin,
              UserRole.Operator,
              UserRole.Developer,
              UserRole.SuperAdmin,
            ].includes(role)
          ) {
            hasSufficientPermissions = true;
            break;
          } else {
            lackingRole = role;
          }
        }
      }

      if (hasSufficientPermissions) {
        next();
      } else {
        throw new ForbiddenErr(
          `You do not have sufficient permissions as ${
            lackingRole ?? "user"
          } to perform this operation.`
        );
      }
    }
  ),

  /**
   * Middleware that allows access for users with UserRole.Operator, UserRole.Admin, or UserRole.All roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isOperator: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      let hasSufficientPermissions = false;
      let lackingRole: string | undefined;

      if (userRoles) {
        for (const role of userRoles) {
          if (
            [UserRole.Admin, UserRole.Operator, UserRole.SuperAdmin].includes(
              role
            )
          ) {
            hasSufficientPermissions = true;
            break;
          } else {
            lackingRole = role;
          }
        }
      }

      if (hasSufficientPermissions) {
        next();
      } else {
        throw new ForbiddenErr(
          `You do not have sufficient permissions as ${
            lackingRole ?? "user"
          } to perform this operation.`
        );
      }
    }
  ),

  /**
   * Middleware that allows access for users with UserRole.Admin or UserRole.All roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isAdmin: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      let hasSufficientPermissions = false;
      let lackingRole: string | undefined;

      if (userRoles) {
        for (const role of userRoles) {
          if ([UserRole.Admin, UserRole.SuperAdmin].includes(role)) {
            hasSufficientPermissions = true;
            break;
          } else {
            lackingRole = role;
          }
        }
      }

      if (hasSufficientPermissions) {
        next();
      } else {
        throw new ForbiddenErr(
          `You do not have sufficient permissions as ${
            lackingRole ?? "user"
          } to perform this operation.`
        );
      }
    }
  ),

  /**
   * Middleware that allows access for users with UserRole.SuperAdmin or UserRole.All roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isSuperAdmin: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      let hasSufficientPermissions = false;
      let lackingRole: string | undefined;

      if (userRoles) {
        for (const role of userRoles) {
          if ([UserRole.SuperAdmin].includes(role)) {
            hasSufficientPermissions = true;
            break;
          } else {
            lackingRole = role;
          }
        }
      }

      if (hasSufficientPermissions) {
        next();
      } else {
        throw new ForbiddenErr(
          `You do not have sufficient permissions as ${
            lackingRole ?? "user"
          } to perform this operation.`
        );
      }
    }
  ),

  /**
   * Middleware that allows access for users with UserRole.Developer or UserRole.All roles.
   * Throws a ForbiddenErr if access is denied.
   */
  isDeveloper: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      let hasSufficientPermissions = false;
      let lackingRole: string | undefined;

      if (userRoles) {
        for (const role of userRoles) {
          if ([UserRole.Developer, UserRole.SuperAdmin].includes(role)) {
            hasSufficientPermissions = true;
            break;
          } else {
            lackingRole = role;
          }
        }
      }

      if (hasSufficientPermissions) {
        next();
      } else {
        throw new ForbiddenErr(
          `You do not have sufficient permissions as ${
            lackingRole ?? "user"
          } to perform this operation.`
        );
      }
    }
  ),

  /**
   * Middleware that allows access for users with UserRole.Robot.
   * Throws a ForbiddenErr if access is denied.
   */
  isRobot: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if the user is connected to their own organization
      const connectedToOwnOrganization =
        !req.currentUser?.currentOrganizationId ||
        req.currentUser.currentOrganizationId ===
          req.currentUser.ownedOrganizationId;

      const userRoles = connectedToOwnOrganization
        ? req.currentUser?.roles
        : req.currentUser?.rolesInCurrentOrganization?.roles;

      if (userRoles?.some((role) => [UserRole.Robot].includes(role))) {
        next();
      } else {
        throw new ForbiddenErr(
          `You do not have sufficient permissions as user to perform this operation.`
        );
      }
    }
  ),
};

export { RbaUserACL };
