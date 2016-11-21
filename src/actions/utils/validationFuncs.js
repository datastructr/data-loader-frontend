const NUMBER  = 'number',
      BOOLEAN = 'boolean',
      DATE    = 'date',
      STRING  = 'boolean',
      OBJECT  = 'object',
      _NUMBER_    = () => { return {"type": NUMBER};},
      _BOOLEAN_   = () => { return {"type": BOOLEAN};},
      _DATE_      = () => { return {"type": DATE};},
      _TIMESTAMP_ = () => { return {"type": DATE};},
      _OBJECT_    = () => { return {"type": OBJECT};},
      _STRING_    = (limit) => { return {"type": STRING, "max": limit.max};};

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
  if(_determineRequired(field, schemaType)) {
    rules.push({"check": 'required'});
  }

  // determine type required
  rules.push({"check": 'dataType', "dataType": _determineTypeMatch(field, schemaType)}); 
  
  return rules;
}

function _validateOrConvertDataType() {
  return {valid:true};
}

function _validateRequired(cell) {
  if(!cell.value || typeof(cell.value) === undefined || cell.value === null || cell.length === 0) {
    return {"valid": false, "message": `Field ${cell.column_name} is required, please insert a value`};
  } else {
    return {"valid": true}
  }
}

function checkPassRule(cell, rule) {
  switch(rule.check) {
    case 'required':
      return _validateRequired(cell);
    case 'dataType':
      return _validateOrConvertDataType(cell, rule.dataType);
    default:
      console.log("default switch executed, check pass rule");
      return null;
  }
}



export default {
 getGeneratedRules,
 checkPassRule
};