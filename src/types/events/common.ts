export interface OnlyRequired {
  id: string;
  version: number;
}

export interface OperatorAddons {
  id: string;
  aboutMe?: string;
  // Needed when the operator request is made through an invitation from an org
  isPublic?: boolean;

  // Specific to operators
  identityType?: string;
  identityPhoto?: string;
  identityNumber?: string;
  operatorRequestIntent?: boolean;

  version: number;
}

export interface AddonOwner {
  ownerId?: string;
}
