# mtype-tv4

Extends [mtype](https://www.npmjs.com/package/mtype) type checking facade to support JSON schema via TV4.

Mtype functions can be used to test that an object complies with a specified JSON schema.

i.e.  const result = mtype.is( myObj, 'schemaName' )

## Usage

```javascript

// Sample Schema
const personSchema = {
  'id': 'person',  // Use this id to refer to this schema in Mtype calls
  'type': 'object',
  'properties': {
    'name': {
      'type': 'string'
    },
    'title': {
      'type': 'string'
    },
    'age': {
      'type': 'number'
    }
  },
  'required': [ 'name', 'title' ]
}

const productSchema = {
  'id': 'product', // Use this id to refer to this schema in Mtype calls
  'type': 'object',
  'properties': {
    'desc': {
      'type': 'string'
    },
    'price': {
      'type': 'number'
    }
  },
  'required': [ 'desc', 'price' ]

}

// Note: Property names are discarded.  Reference schema using 'id' value. e.g. 'person'
const schemas = {
  a: personSchema,
  b: productSchema
}

// create TV4 instance loaded with passed schemas
const validator = Validator( schemas )

// create mtype instance backed by TV4 instance created above
const t = Validator.mtype(validator)

// Test data
const trump = {
  name: 'Trump',
  title: 'SCROTUS',
  age : 70
}

const hat = {
  'desc': 'red maga hat',
  'price': 19.99
}

// test against schema etc
console.log( t.is( trump, 'person' ) )  // true
console.log( t.is( trump, 'product' ) ) // false
console.log( t.is( hat, 'product' ) ) // true
console.log( t.some( hat, 'person','product' ) ) // true
console.log( t.types() ) // [ 'person', 'product' ]

```

## license

MIT

