import ParseSchema from './utils/parseSchema';

export const GET_SCHEMAS = 'GET_SCHEMAS';
export const GET_SCHEMAS_SUCCESS = 'GET_SCHEMAS_SUCCESS';
export const GET_SCHEMAS_FAILED = 'GET_SCHEMAS_FAILED';

function dispatchGetSchemas() {
  return {
    type: GET_SCHEMAS
  };
}

function dispatchGetSchemasSuccess(schemaData) {
  return {
    type: GET_SCHEMAS_SUCCESS,
    schemaData: schemaData
  };
}

function dispatchGetSchemasFailed(message) {
  return {
    type: GET_SCHEMAS_FAILED,
    errorMessage: message
  };
}


// Sample tests
import {schemaSamples} from '../tests/App.samples.js';

export function getSchemaData() {
  return dispatch => {
    dispatch(dispatchGetSchemas());
    // TODO
    let psch = new ParseSchema(schemaSamples);
    dispatch(dispatchGetSchemasSuccess(psch.shapeSchemasAndRetrieve()));
  };
}


export const FIELD_ATTEMPT_MAP = 'FIELD_ATTEMPT_MAP';

function dispatchAttemptMapping(dropTarget, headerCell) {
  return {
    type: FIELD_ATTEMPT_MAP,
    headerCell: headerCell,
    dropTarget: dropTarget
  }
}

export function dropTargetRecieveHeader(dropTarget, header) {
  return dispatch => {
    console.log(">>>>>>>>>>>>>>>>>>>>>")
    console.log(dropTarget)
    dispatch(dispatchAttemptMapping(dropTarget,header));
  }
}