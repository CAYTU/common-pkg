import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { NotAuthorizedErr } from "../../errors/not-authorized";
import { TaskType } from "../../types/utils";

/**
 * Middleware to check if the user is authorized to perform a task.
 *
 * This middleware verifies if the user has the necessary permissions to
 * perform the specified task. It checks the user's `allowedTaskTypes` in
 * the request payload and compares it with the task type from the request body.
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
        "You are not allowed to perform any task in this organization."
      );
    }

    // check if connected to his own organization or not
    const connectedToOwnOrganization =
      currentUser?.currentOrganizationId === currentUser?.ownedOrganizationId;

    if (connectedToOwnOrganization) {
      const typeOfTaskInArray = currentUser?.allowedTaskTypes
        ? typeof currentUser?.allowedTaskTypes[0]
        : null;
      const typeOfTaskInRoles = currentUser?.rolesInCurrentOrganization
        ?.allowedTaskTypes
        ? typeof currentUser?.rolesInCurrentOrganization?.allowedTaskTypes[0]
        : null;

      const typeOfTaskInBody = typeof type;

      console.log("typeOfTaskInArray", typeOfTaskInArray);
      console.log("typeOfTaskInRoles", typeOfTaskInRoles);
      console.log("typeOfTaskInBody", typeOfTaskInBody);

      // If the user is allowed to perform the specific task, grant access.
      if (currentUser.allowedTaskTypes?.includes(type as TaskType)) {
        return next();
      }
    } else {
      // If the user is allowed to perform the specific task, grant access.
      if (
        currentUser.rolesInCurrentOrganization?.allowedTaskTypes?.includes(
          type as TaskType
        )
      ) {
        return next();
      }
    }

    // If the user is not allowed to perform the task, throw an error.
    throw new NotAuthorizedErr(
      `You are not allowed to perform the task: ${type}`
    );
  }
);

export { allowedTask };
