import ParseCsv from './utils/parseCsv';

export const LOAD_DATA = 'LOAD_DATA';
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_FAILED = 'LOAD_DATA_FAILED';

function loadData() {
  return {
    type: LOAD_DATA
  };
}

function loadDataSuccess(data) {
  return {
    type: LOAD_DATA_SUCCESS,
    fileData: data
  };
}

function loadDataFailed(message) {
  return {
    type: LOAD_DATA_FAILED,
    errorMessage: message
  };
}


// Sample tests
import {testFileData} from '../tests/App.samples.js';

export function beginLoadFileData() {
  return dispatch => {
    dispatch(loadData());

    // TODO load and papaparse

    let pcsv = new ParseCsv(testFileData);
    dispatch(loadDataSuccess(pcsv.shapeCsvAndRetrieve()));
  };
}