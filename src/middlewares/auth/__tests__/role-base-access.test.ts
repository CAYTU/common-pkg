import { RbaUserACL } from "../role-base-access";
import { UserRole, splitRoles } from "../../../types/utils";

const user = (
  platform: UserRole[],
  org?: UserRole[],
): Record<string, unknown> => ({
  id: "u1",
  roles: platform,
  ...(org
    ? { rolesInCurrentOrganization: { organizationId: "o1", roles: org } }
    : {}),
});

/**
 * express-async-handler hands a thrown ForbiddenErr to `next(err)` rather than
 * letting it escape, so a bare `next` spy would score a denial as a pass.
 */
const run = async (guard: any, currentUser: unknown): Promise<boolean> => {
  const req: any = { currentUser };
  let passed = false;
  await guard(req, {} as any, (err?: unknown) => {
    passed = !err;
  });
  return passed;
};

describe("splitRoles", () => {
  it("partitions a mixed array and keeps unknown values", () => {
    expect(
      splitRoles([
        UserRole.All,
        UserRole.SuperAdmin,
        UserRole.All,
        "bogus" as UserRole,
      ]),
    ).toEqual({
      primary: [UserRole.SuperAdmin],
      permissions: [UserRole.All],
      unknown: ["bogus"],
    });
  });
});

describe("isSuperAdmin", () => {
  it("passes a platform super-admin", async () => {
    expect(
      await run(RbaUserACL.isSuperAdmin, user([UserRole.SuperAdmin])),
    ).toBe(true);
  });

  it("does NOT pass `all` — a member permission is not an identity", async () => {
    expect(await run(RbaUserACL.isSuperAdmin, user([UserRole.All]))).toBe(
      false,
    );
  });

  // The escalation this whole change exists to close: the schema permitted
  // `super-admin` inside an organization's array, and the old union read granted
  // platform god-mode from it.
  it("does NOT pass super-admin held only inside an organization", async () => {
    expect(
      await run(
        RbaUserACL.isSuperAdmin,
        user([UserRole.Customer], [UserRole.SuperAdmin]),
      ),
    ).toBe(false);
  });
});

describe("member permissions", () => {
  it("grants a verb from the org array", async () => {
    expect(
      await run(
        RbaUserACL.canCreate,
        user([UserRole.Customer], [UserRole.Create]),
      ),
    ).toBe(true);
  });

  it("treats `all` in the org array as every verb", async () => {
    const member = user([UserRole.Customer], [UserRole.All]);
    expect(await run(RbaUserACL.canCreate, member)).toBe(true);
    expect(await run(RbaUserACL.canEdit, member)).toBe(true);
    expect(await run(RbaUserACL.canDelete, member)).toBe(true);
  });

  it("does not grant a verb the member was never given", async () => {
    expect(
      await run(
        RbaUserACL.canDelete,
        user([UserRole.Customer], [UserRole.Create]),
      ),
    ).toBe(false);
  });

  it("lets identity imply verbs for admins and super-admins", async () => {
    expect(await run(RbaUserACL.canDelete, user([UserRole.SuperAdmin]))).toBe(
      true,
    );
    expect(
      await run(
        RbaUserACL.canDelete,
        user([UserRole.Customer], [UserRole.Admin]),
      ),
    ).toBe(true);
  });

  describe("STRICT_ROLE_AXES", () => {
    const strict = process.env.STRICT_ROLE_AXES;
    afterEach(() => {
      process.env.STRICT_ROLE_AXES = strict;
    });

    it("honours a platform-array permission while unmigrated data exists", async () => {
      delete process.env.STRICT_ROLE_AXES;
      expect(
        await run(
          RbaUserACL.canCreate,
          user([UserRole.Customer, UserRole.All]),
        ),
      ).toBe(true);
    });

    it("stops honouring it once the environment is migrated", async () => {
      process.env.STRICT_ROLE_AXES = "true";
      expect(
        await run(
          RbaUserACL.canCreate,
          user([UserRole.Customer, UserRole.All]),
        ),
      ).toBe(false);
    });

    it("leaves a properly-partitioned member unaffected either way", async () => {
      const member = user([UserRole.Customer], [UserRole.All]);
      process.env.STRICT_ROLE_AXES = "true";
      expect(await run(RbaUserACL.canCreate, member)).toBe(true);
      delete process.env.STRICT_ROLE_AXES;
      expect(await run(RbaUserACL.canCreate, member)).toBe(true);
    });
  });
});

describe("identity guards", () => {
  it("accepts an org-scoped admin as admin", async () => {
    expect(
      await run(
        RbaUserACL.isAdmin,
        user([UserRole.Customer], [UserRole.Admin]),
      ),
    ).toBe(true);
  });

  it("rejects a bare customer as admin", async () => {
    expect(await run(RbaUserACL.isAdmin, user([UserRole.Customer]))).toBe(
      false,
    );
  });

  it("rejects a user with no roles at all", async () => {
    expect(await run(RbaUserACL.canReadOnly, user([]))).toBe(false);
    expect(await run(RbaUserACL.isCustomer, user([]))).toBe(false);
  });
});
