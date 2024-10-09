import { TaskType } from "../../tasks/enums";
import { UserRole } from "../../types/utils";

export const allowedTaskTypesBasedOnRole = (role: UserRole[]): TaskType[] => {
  const hasAdminOrSuperAdminRole =
    role.includes(UserRole.Admin) || role.includes(UserRole.SuperAdmin);
  const hasOperatorRole = role.includes(UserRole.Operator);
  const hasCustomerRole = role.includes(UserRole.Customer);

  switch (true) {
    case hasAdminOrSuperAdminRole:
    case hasOperatorRole:
      return [...Object.values(TaskType)];
    case hasCustomerRole:
      // All task types are allowed for customer except for simulation
      return [...Object.values(TaskType)].filter(
        (taskType) => taskType !== TaskType.Simulation,
      );
    default:
      return [];
  }
};
