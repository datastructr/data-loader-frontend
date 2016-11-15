import ParseSchema from './utils/parseSchema';

export const GET_SCHEMAS = 'GET_SCHEMAS';
export const GET_SCHEMAS_SUCCESS = 'GET_SCHEMAS_SUCCESS';
export const GET_SCHEMAS_FAILED = 'GET_SCHEMAS_FAILED';

function getSchemas() {
  return {
    type: GET_SCHEMAS
  };
}

function getSchemasSuccess(schemaData) {
  return {
    type: GET_SCHEMAS_SUCCESS,
    schemaData: schemaData
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


export const FIELD_ATTEMPT_MAP = 'FIELD_ATTEMPT_MAP';

function attemptMapping(dropTarget, headerCell) {
  return {
    type: FIELD_ATTEMPT_MAP,
    headerCell: headerCell,
    dropTarget: dropTarget
  }
}

export function dropTargetRecieveHeader(dropTarget, header) {
  return dispatch => {
    dispatch(attemptMapping(dropTarget,header));
  }
}