/**
 * Common properties for objects stored in MongoDB with extended data.
 */
export interface IMongooseObjectExt {
    /**
     * The date when the object was last updated (optional).
     */
    updatedAt?: Date;
  
    /**
     * The date when the object was created (optional).
     */
    createdAt?: Date;
  }
  