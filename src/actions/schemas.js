

export const GET_SCHEMAS = 'GET_SCHEMAS';
export const GET_SCHEMAS_SUCCESS = 'GET_SCHEMAS_SUCCESS';
export const GET_SCHEMAS_FAILED = 'GET_SCHEMAS_FAILED';

function getSchemas() {
  return {
    type: GET_SCHEMAS
  };
}

function getSchemasSuccess(schemas) {
  return {
    type: GET_SCHEMAS_SUCCESS,
    schemas: schemas
  };
}

function getSchemasFailed(message) {
  return {
    type: GET_SCHEMAS_FAILED,
    errorMessage: message
  };
}

export function getSchemaData() {
  return dispatch => {
    dispatch(getSchemas());
    // TODO
    let schemas = {};
    dispatch(getSchemasSuccess(schemas))
  };
}


export function dropTargetRecieveHeader(dropTarget, header) {
  console.log("===============> 2")
  console.log(dropTarget, header)
}