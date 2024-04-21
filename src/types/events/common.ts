/**
 * @file common.ts
 * @description Defines shared TypeScript interfaces used across multiple events.
 */

/**
 * @interface OnlyRequired
 * @description Defines a TypeScript interface for properties that are only required.
 * @property {string} id - The ID of the entity.
 * @property {number} version - The version number of the entity.
 */
interface OnlyRequired {
  id: string;
  version: number;
}

/**
 * @interface OperatorAddons
 * @description Defines a TypeScript interface for operator-specific addons.
 * @property {string} id - The ID of the operator.
 * @property {string} [aboutMe] - A brief description about the operator.
 * @property {boolean} [isPublic] - Flag indicating whether the operator is public or not.
 * @property {string} [identityType] - The type of identity of the operator.
 * @property {string} [identityPhoto] - The photo of the operator's identity.
 * @property {string} [identityNumber] - The identity number of the operator.
 * @property {boolean} [operatorRequestIntent] - Flag indicating the operator's request intent.
 * @property {number} version - The version number of the operator.
 */
interface OperatorAddons {
  id: string;
  aboutMe?: string;
  isPublic?: boolean;
  identityType?: string;
  identityPhoto?: string;
  identityNumber?: string;
  operatorRequestIntent?: boolean;
  version: number;
}

/**
 * @interface AddonOwner
 * @description Defines a TypeScript interface for addon ownership.
 * @property {string} [ownerId] - The ID of the addon owner.
 */
interface AddonOwner {
  ownerId?: string;
}

/**
 * @exports CommonTypes
 * @description Exporting shared interface types for broader consumption.
 */
export { OnlyRequired, OperatorAddons, AddonOwner };
