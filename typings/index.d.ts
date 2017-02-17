// Type definitions for mtype backed by json schema mtype-tv4 0.1.x
// Project: https://github.com/mojule/mtype-tv4

declare namespace mTV4 {

  /**
   * Object with properties referencing JsonSchema.  Passed to Validator constructor
   * Note: key (property name) is ignored when passed to Validator. Schema are referenced by their id value.
   */
  export type JsonSchemas = {
    [key: string]: tv4.JsonSchema
  }

  /**
   *Validator interface describes javascript function with attached property mtype
   *Typescript implementation would be:
   *   const Validator = <IValidator> function (schemas: JsonSchema): string  { .... }
   *   Validator.mtype = ( validator ) => {...}
   *For explanation of Typescript construct refer to http://stackoverflow.com/questions/12766528/build-a-function-object-with-properties-in-typescript
   */
  export interface Validator {
    /**
  *Creates a TV4 instance, populates with schemas and returns TV4 api.
  *Param: Object with named properties referencing JsonSchema.
  *Returns: Reference to instance of TV4 api populated with passed schemas.
  */
    (schemas: JsonSchemas): tv4.TV4

    /**
     *Static method on Validator wrapping TV4 schema validator in mtype.
     *Param: Instance of Tv4 api (returned by Validator constructor).
     *Returns: Instance of mtype api for validation of json objects against named schema.
     */
    mtype: (validator: tv4.TV4) => mtype.api
  }

}


declare const validator: Validator

export = validator
export as namespace mTV4
