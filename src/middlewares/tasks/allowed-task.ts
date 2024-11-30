import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { NotAuthorizedErr } from "../../errors/not-authorized";
import { UserRole } from "../../types/utils";
import { TaskType } from "../../tasks/enums";

/**
 * An array containing task types that are temporarily disabled.
 */
const TEMPORARY_DISABLED_TASKS = [
  TaskType.Delivery,
  TaskType.Cleaning,
  TaskType.Inspection,

  // Add more task types here...
  TaskType.Custom,
];

/**
 * Middleware to check if the user is authorized to perform a task.
 *
 * This middleware verifies whether the user has the necessary permissions to
 * perform the specified task. It examines the user's `allowedTaskTypes` from
 * the request payload and compares it with the task type provided in the request body.
 * If the user is not authorized, it throws a `NotAuthorizedErr`.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns {void}
 * @throws {NotAuthorizedErr} If the user is not authorized to perform the task.
 *
 * @example
 * // Usage in a route
 * router.post("/", authorize, allowedTask, createTask);
 */
const allowedTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { currentUser } = req;
    const { type } = req.body;

    // If currentUser does not have `allowedTaskTypes` in the payload,
    // the user is not allowed to perform any task.
    if (
      (!currentUser?.allowedTaskTypes ||
        currentUser?.allowedTaskTypes?.length === 0) &&
      (!currentUser?.rolesInCurrentOrganization ||
        currentUser?.rolesInCurrentOrganization?.allowedTaskTypes?.length === 0)
    ) {
      throw new NotAuthorizedErr(
        "You are not allowed to perform any task in this organization.",
      );
    }

    // Check if the user is a super-admin.
    const isSuperAdmin = currentUser.roles?.includes(UserRole.SuperAdmin);

    // Check if the user is currently connected to their organization.
    const isCurrentUserOrganization =
      currentUser.rolesInCurrentOrganization?.organizationId?.toString() ===
      currentUser.ownedOrganizationId?.toString();

    if (isSuperAdmin) {
      /**
       * If the user is a super-admin, they are allowed to perform any task.
       * Therefore, we can skip the check and proceed to the next middleware.
       */
      return next();
    } else {
      if (isCurrentUserOrganization) {
        /**
         * If the user is connected to their organization, check whether the user is allowed
         * to perform the task within their organization or on the platform.
         */
        if (
          currentUser.rolesInCurrentOrganization?.allowedTaskTypes?.includes(
            type as TaskType,
          ) ||
          currentUser.allowedTaskTypes?.includes(type as TaskType)
        ) {
          return next();
        }
      } else {
        // If the user is not connected to their organization, check whether the user
        // is allowed to perform the task within the organization they are attempting to access.
        if (
          currentUser.rolesInCurrentOrganization?.allowedTaskTypes?.includes(
            type as TaskType,
          )
        ) {
          return next();
        }
      }
    }

    // If the user is not allowed to perform the task, throw an error.
    throw new NotAuthorizedErr(
      `You are not allowed to perform the task: ${type}`,
    );
  },
);

export { allowedTask, TEMPORARY_DISABLED_TASKS };
