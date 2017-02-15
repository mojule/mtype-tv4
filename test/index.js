'use strict'

const assert = require( 'assert' )
const Validator = require( '../src' )
const personSchema = require( './fixtures/person.schema.json' )
const productSchema = require( './fixtures/product.schema.json' )



describe( 'test mtype-tv4', () => {
  describe( 'test default behaviour', () => {
    it( 'should create validator', () => {
      const validator = Validator()
      assert.equal( typeof validator, 'object' )
      const t = Validator.mtype( validator )
      const types = t.types()
      assert.equal( types.length, 0 )
    })

  })

  describe( 'test simple validation', () => {
    const schemas = {
      a: personSchema,
      b: productSchema
    }
    const validator = Validator( schemas )
    const t = Validator.mtype( validator )
    const personSchemaId = 'person'
    const productSchemaId = 'product'

    it( 'should check setup', () => {
      const types = t.types()
      assert.equal( types.length, 2 )
      assert.equal( types[ 0 ], personSchemaId )
      assert.equal( types[ 1 ], productSchemaId )
    })
    it( 'should invalidate some objects against schema', () => {
      let result = t.is( {}, personSchemaId )
      assert.equal( result, false )
      result = t.is( { 'name': 77 }, personSchemaId )
      assert.equal( result, false )
      result = t.is( { 'age': 77 }, personSchemaId )
    })
    it( 'should validate some objects against schema', () => {
      let result = t.is( { 'name': 'donald' }, personSchemaId )
      assert.equal( result, false )
      result = t.is( {
        'name': 'donald',
        'title': 'SCROTUS'
      }, personSchemaId )
      assert.equal( result, true )
    })
    it( 'should validate an object is at least one of some schema', () => {
      const result = t.some( {
        'name': 'donald',
        'title': 'SCROTUS',
        'age': 77
      }, personSchemaId, productSchemaId )
      assert.equal( result, true )
    })
  })
})
11111