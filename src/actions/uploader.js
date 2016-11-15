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

export const HEADER_BEGIN_DRAG = 'HEADER_BEGIN_DRAG';
export const HEADER_END_DRAG = 'HEADER_END_DRAG';


export function beginHeaderDrag(headerCell) {
  return dispatch => {
    dispatch((() => {
      return {
        type: HEADER_BEGIN_DRAG,
        headerCell: headerCell
      }
    })());
  }
}

function endHeaderDrag(headerCell) {
  return {
    type: HEADER_END_DRAG,
    headerCell: headerCell
  }
}

export function endHeaderDragDropped(header) {
  return dispatch => {
    dispatch(endHeaderDrag(header));
  }
}


export const HEADER_ATTEMPT_MAP = 'HEADER_ATTEMPT_MAP';

function attemptMapping(headerCell, dropTarget) {
  return {
    type: HEADER_ATTEMPT_MAP,
    headerCell: headerCell,
    dropTarget: dropTarget
  }
}

export function endHeaderDragDroppedMapped(header, dropTarget) {
  return dispatch => {
    dispatch(attemptMapping(header,dropTarget));
   
  }
}