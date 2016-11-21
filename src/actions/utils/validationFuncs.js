"use strict";

import _ from 'lodash';

const _NUMBER_    = () => { return {"type": 'number'};};
const _BOOLEAN_   = () => { return {"type": 'boolean'};};
const _DATE_      = () => { return {"type": 'date'};};
const _TIMESTAMP_ = () => { return {"type": 'date'};};
const _OBJECT_    = () => { return {"type": 'object'};};
const _STRING_    = (limit) => { return {"type": 'string', "max": limit.max};};

function _determineRequired(field, schemaType) {
  switch(schemaType) {
    case "pg": 
      return field.nullable === "True" ? true : false;
    case "mysql": 
      return false;
    default:
      console.log("default switch executed, required check");
      return field.nullable === "True" ? true : false;
  }
}

function _matchPgType(type) {
  switch(type) {
    case "INTEGER":
      return _NUMBER_();
    case "VARCHAR(255)":
      return _STRING_({max:255});
    case "TEXT":
      return _STRING_({max:10000});
    case "BOOLEAN":
      return _BOOLEAN_();
    case "DATE":
      return _DATE_();
    case "JSON":
      return _OBJECT_();
    default:
      return null;
  }
}

function _determineTypeMatch(field, schemaType) {
  switch(schemaType) {
    case "pg": 
      return _matchPgType(field.type);
    case "mysql": 
      return "null";
    default:
      console.log("default switch executed, required check");
      return _matchPgType(field.type);
  }
}



function getGeneratedRules(field, schemaType) {
  let rules = [];
  schemaType = schemaType ? schemaType : "pg";
  // take field and generate some rules

  // required field
  if(_determineRequired(field)) {
    rules.push("required");
  }

  // determine type required
  rules.push(_determineTypeMatch(field)) 

}
// :
// "False"
// primary_key
// :
// true
// type
// :
// "INTEGER"
//   return rules;
// }

function checkPassRule() {
  let valid = true;
  let message = 'All checks pass';


  return {"valid": valid, "message": message};
}



export default {
 getGeneratedRules,
 checkPassRule
};


// function _checkRequired(field, schemaType) {
//   switch(schemaType) {
//     case "pg": 
//       return field.nullable === "True" 
//         ? {"valid": true} 
//         : {"valid": false, "message": `Field ${field.column_name} is required, please insert a value`};
//     case "mysql": 
//       return {"valid": false} 
//     default:
//       console.log("default switch executed, required check");
//       return field.nullable === "True" 
//         ? {"valid": true} 
//         : {"valid": false, "message": `Field ${field.column_name} is required, please insert a value`};
//   }
// }