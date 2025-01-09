import { TaskType } from "../../tasks/enums";
import { UserRole } from "../../types/utils";
import { TEMPORARY_DISABLED_TASKS } from "../tasks/allowed-task";

/**
 * Determines the allowed task types based on the user's role(s).
 *
 * @param role - An array of user roles to evaluate.
 * @returns An array of task types the user is allowed to access.
 */
export const allowedTaskTypesBasedOnRole = (role: UserRole[]): TaskType[] => {
  // Check for specific roles in the provided role array
  const hasSuperAdminRole = role.includes(UserRole.SuperAdmin);
  const hasAdminRole = role.includes(UserRole.Admin);
  const hasOperatorRole = role.includes(UserRole.Operator);
  const hasCustomerRole = role.includes(UserRole.Customer);

  // Get all available task types
  const allTaskTypes = Object.values(TaskType);

  switch (true) {
    case hasSuperAdminRole:
      return allTaskTypes;

    case hasAdminRole:
      return allTaskTypes.filter(
        (taskType) =>
          !TEMPORARY_DISABLED_TASKS.includes(taskType) &&
          taskType !== TaskType.Simulation,
      );

    case hasOperatorRole:
      return allTaskTypes.filter(
        (taskType) =>
          !TEMPORARY_DISABLED_TASKS.includes(taskType) &&
          ![TaskType.Flight, TaskType.Simulation].includes(taskType),
      );

    case hasCustomerRole: {
      const restrictedTasks = [
        ...TEMPORARY_DISABLED_TASKS,
        TaskType.Flight,
        TaskType.Simulation,
        TaskType.Telepresence,
      ];

      // Ensure we're not adding duplicates in restrictedTasks
      const uniqueRestrictedTasks = [...new Set(restrictedTasks)];

      return allTaskTypes.filter(
        (taskType) => !uniqueRestrictedTasks.includes(taskType),
      );
    }

    default:
      return [];
  }
};

// Add type checking to ensure TaskType enum matches
export type ValidateTaskType = {
  [K in TaskType]: string;
};
