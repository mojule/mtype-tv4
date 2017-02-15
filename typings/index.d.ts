/// <references path="./tv4.d.ts"/>
// Type definitions for mtype backed by json schemar mtype-node 0.1.x
// Project: https://github.com/mojule/mtype-tv4

declare namespace mtypeTv4 {

  /**
   * Object with properties referencing JsonSchema.  Passed to Validator constructor
   * Note: key (property name) is ignored when passed to Validator. Schema are referenced by their id value.
   */
  export type JsonSchemas = {
    [key: string]: tv4.JsonSchema
  }


  export interface Validator {
    /**
     *Creates a TV4 instance, populates with schemas and returns TV4 api.
     *Param: Object with named properties referencing JsonSchema.
     *Returns: Reference to instance of TV4 api populated with passed schemas.
     */
    Validator: (schemas: JsonSchemas) => tv4.TV4


    /**
     *Static method on Validator wrapping TV4 schema validator in mtype.
     *Param: Instance of Tv4 api (returned by Validator constructor).
     *Returns: Instance of mtype api for validation of json objects against named schema.
     */
    mtype(validator: tv4.TV4): mtype.api
  }

}


declare var validator : mtypeTv4.Validator
export = validator
export as namespace mtypeTv4
