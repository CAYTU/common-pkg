import { allowedTaskTypesBasedOnRole } from "../roles-generator";
import { TaskType } from "../../../tasks/enums";
import { UserRole } from "../../../types/utils";
import { TEMPORARY_DISABLED_TASKS } from "../../tasks/allowed-task";

describe("allowedTaskTypesBasedOnRole", () => {
  // Helper function to create a set of tasks for comparison
  const createTaskSet = (tasks: TaskType[]) => new Set(tasks);

  describe("SuperAdmin Role", () => {
    it("should have access to all task types", () => {
      const roles = [UserRole.SuperAdmin];
      const result = allowedTaskTypesBasedOnRole(roles);
      const allTaskTypes = Object.values(TaskType);

      expect(createTaskSet(result)).toEqual(createTaskSet(allTaskTypes));
    });

    it("should have access to all tasks even with additional roles", () => {
      const roles = [UserRole.SuperAdmin, UserRole.Customer];
      const result = allowedTaskTypesBasedOnRole(roles);
      const allTaskTypes = Object.values(TaskType);

      expect(createTaskSet(result)).toEqual(createTaskSet(allTaskTypes));
    });
  });

  describe("Admin Role", () => {
    it("should have access to all tasks except simulation and temporary disabled tasks", () => {
      const roles = [UserRole.Admin];
      const result = allowedTaskTypesBasedOnRole(roles);
      const allTaskTypes = Object.values(TaskType);
      const expectedTasks = allTaskTypes.filter(
        (task) =>
          !TEMPORARY_DISABLED_TASKS.includes(task) &&
          task !== TaskType.Simulation,
      );

      expect(createTaskSet(result)).toEqual(createTaskSet(expectedTasks));
    });

    it("should not include temporary disabled tasks", () => {
      const roles = [UserRole.Admin];
      const result = allowedTaskTypesBasedOnRole(roles);

      TEMPORARY_DISABLED_TASKS.forEach((disabledTask) => {
        expect(result).not.toContain(disabledTask);
      });
    });
  });

  describe("Operator Role", () => {
    it("should have restricted access excluding flight and simulation", () => {
      const roles = [UserRole.Operator];
      const result = allowedTaskTypesBasedOnRole(roles);
      const allTaskTypes = Object.values(TaskType);
      const restrictedTasks = [
        ...TEMPORARY_DISABLED_TASKS,
        TaskType.Flight,
        TaskType.Simulation,
      ];
      const expectedTasks = allTaskTypes.filter(
        (task) => !restrictedTasks.includes(task),
      );

      expect(createTaskSet(result)).toEqual(createTaskSet(expectedTasks));
    });

    it("should not include flight or simulation tasks", () => {
      const roles = [UserRole.Operator];
      const result = allowedTaskTypesBasedOnRole(roles);

      expect(result).not.toContain(TaskType.Flight);
      expect(result).not.toContain(TaskType.Simulation);
    });
  });

  describe("Customer Role", () => {
    it("should have the most restricted access", () => {
      const roles = [UserRole.Customer];
      const result = allowedTaskTypesBasedOnRole(roles);
      const allTaskTypes = Object.values(TaskType);
      const restrictedTasks = [
        ...TEMPORARY_DISABLED_TASKS,
        TaskType.Connect,
        TaskType.Flight,
        TaskType.Simulation,
        TaskType.Telepresence,
      ];
      const expectedTasks = allTaskTypes.filter(
        (task) => !restrictedTasks.includes(task),
      );

      expect(createTaskSet(result)).toEqual(createTaskSet(expectedTasks));
    });

    it("should not include connect, flight, simulation, or telepresence tasks", () => {
      const roles = [UserRole.Customer];
      const result = allowedTaskTypesBasedOnRole(roles);

      expect(result).not.toContain(TaskType.Connect);
      expect(result).not.toContain(TaskType.Flight);
      expect(result).not.toContain(TaskType.Simulation);
      expect(result).not.toContain(TaskType.Telepresence);
    });

    it("should not include any temporary disabled tasks", () => {
      const roles = [UserRole.Customer];
      const result = allowedTaskTypesBasedOnRole(roles);

      TEMPORARY_DISABLED_TASKS.forEach((disabledTask) => {
        expect(result).not.toContain(disabledTask);
      });
    });
  });

  describe("Multiple Roles", () => {
    it("should use highest privilege role when multiple roles are present", () => {
      const roles = [UserRole.Customer, UserRole.Operator];
      const operatorResult = allowedTaskTypesBasedOnRole([UserRole.Operator]);
      const result = allowedTaskTypesBasedOnRole(roles);

      expect(createTaskSet(result)).toEqual(createTaskSet(operatorResult));
    });
  });

  describe("Invalid or Empty Roles", () => {
    it("should return empty array for no roles", () => {
      const roles: UserRole[] = [];
      const result = allowedTaskTypesBasedOnRole(roles);

      expect(result).toHaveLength(0);
    });

    it("should return empty array for unrecognized roles", () => {
      const roles = ["UnknownRole" as UserRole];
      const result = allowedTaskTypesBasedOnRole(roles);

      expect(result).toHaveLength(0);
    });
  });
});
