'use strict';

var tv4 = require('tv4');
var T = require('mtype');

var Validator = function Validator() {
  var schema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var validator = tv4.freshApi();

  var schemas = Object.keys(schema).map(function (name) {
    return schema[name];
  });

  schemas.forEach(function (schema) {
    return validator.addSchema(schema);
  });

  return validator;
};

Validator.mtype = function () {
  var validator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Validator();

  var schemaNames = validator.getSchemaUris();

  var is = schemaNames.reduce(function (map, name) {
    map[name] = function (obj) {
      return validator.validate(obj, name);
    };

    return map;
  }, {});

  return T(is);
};

module.exports = Validator;