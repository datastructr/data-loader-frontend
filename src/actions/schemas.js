import ParseSchema from './utils/parseSchema';

export const GET_SCHEMAS = 'GET_SCHEMAS';
export const GET_SCHEMAS_SUCCESS = 'GET_SCHEMAS_SUCCESS';
export const GET_SCHEMAS_FAILED = 'GET_SCHEMAS_FAILED';

function getSchemas() {
  return {
    type: GET_SCHEMAS
  };
}

function getSchemasSuccess(schemas) {
  console.log("sfqdgqefeew==---=-=-")
  console.log(schemas)
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


// Sample tests
import {schemaSamples} from '../tests/App.samples.js';

export function getSchemaData() {
  return dispatch => {
    dispatch(getSchemas());
    // TODO
    let psch = new ParseSchema(schemaSamples);
    dispatch(getSchemasSuccess(psch.shapeSchemasAndRetrieve()));
  };
}


export function dropTargetRecieveHeader(dropTarget, header) {
  console.log("===============> 2")
  console.log(dropTarget, header)
}