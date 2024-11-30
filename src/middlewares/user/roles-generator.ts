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

  // Use a switch statement to determine allowed tasks based on roles
  switch (true) {
    // SuperAdmin has access to all task types
    case hasSuperAdminRole:
      return [...Object.values(TaskType)];

    // Admins and Operators have similar restrictions, except Operators have additional limitations
    case hasAdminRole:
      return [...Object.values(TaskType)].filter(
        (taskType) =>
          ![...TEMPORARY_DISABLED_TASKS, TaskType.Simulation].includes(
            taskType,
          ), // Exclude disabled tasks and "Simulation"
      );

    // Operators have more restricted access, excluding "Flight" and "Simulation" tasks
    case hasOperatorRole:
      return [...Object.values(TaskType)].filter(
        (taskType) =>
          ![
            ...TEMPORARY_DISABLED_TASKS,
            TaskType.Flight,
            TaskType.Simulation,
          ].includes(taskType), // Exclude disabled tasks, "Flight", and "Simulation"
      );

    // Customers have the most restricted access, excluding multiple task types
    case hasCustomerRole:
      return [...Object.values(TaskType)].filter(
        (taskType) =>
          ![
            ...TEMPORARY_DISABLED_TASKS,
            TaskType.Connect,
            TaskType.Flight,
            TaskType.Simulation,
            TaskType.Telepresence,
          ].includes(taskType), // Exclude disabled tasks and several other types
      );

    // Default case: return an empty array for unrecognized roles
    default:
      return [];
  }
};
