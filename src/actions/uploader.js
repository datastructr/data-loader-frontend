import _ from 'lodash';

import ParseCsv from './utils/parseCsv';
import validationFuncs from './utils/validationFuncs';

export const LOAD_DATA = 'LOAD_DATA';
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_FAILED = 'LOAD_DATA_FAILED';

function dispatchLoadData() {
  return {
    type: LOAD_DATA
  };
}

function dispatchLoadDataSuccess(data) {
  return {
    type: LOAD_DATA_SUCCESS,
    fileData: data
  };
}

function dispatchLoadDataFailed(message) {
  return {
    type: LOAD_DATA_FAILED,
    errorMessage: message
  };
}


// Sample tests
import {testFileData} from '../tests/App.samples.js';

export function beginLoadFileData() {
  return dispatch => {
    dispatch(dispatchLoadData());

    // TODO load and papaparse

    let pcsv = new ParseCsv(testFileData);
    dispatch(dispatchLoadDataSuccess(pcsv.shapeCsvAndRetrieve()));
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

function dispatchEndHeaderDrag(headerCell) {
  return {
    type: HEADER_END_DRAG,
    headerCell: headerCell
  }
}

export function endHeaderDragDropped(header) {
  return dispatch => {
    dispatch(dispatchEndHeaderDrag(header));
  }
}


/**
 * Mapping actions
 * 
 * mapping header to drop target fields, validating each cell associated with the header column
 * 
 */
export const HEADER_ATTEMPT_MAP = 'HEADER_ATTEMPT_MAP';
export const HEADER_ATTEMPT_FINISH = 'HEADER_ATTEMPT_MAP';
export const CELL_VALIDATE_PASS = 'CELL_VALIDATE_PASS';
export const CELL_VALIDATE_FAIL = 'CELL_VALIDATE_FAIL';

function dispatchAttemptMapping(headerCell, dropTarget) {
  return {
    type: HEADER_ATTEMPT_MAP,
    headerCell: headerCell,
    dropTarget: dropTarget
  }
}

function dispatchAttemptMappingFinish(headerCell) {}

function dispatchValidateCellPass(cell, rule) {
  
  return {
    type: CELL_VALIDATE_PASS,
    cell: cell,
    rule: rule
  }
}

function dispatchValidateCellFail(cell, rule) {}

/**
 * called after a header has been mapped. When done so, each cell in that column needs
 * to be validated
 */
function validateColumnCell(cell, dropTarget) {
  // use drop target to validate the cell

  // dispatch success 

  // or dispatch failure
}

export function endHeaderDragDroppedMapped(header, dropTarget) {
  return (dispatch, getState) => {
    dispatch(dispatchAttemptMapping(header,dropTarget));
    // get the uploaded data
    _.map(getState().uploader.present.fileData.tableData, (row) => {
      // for each row, get the cell in question
      let index = _.findIndex(row, (r) => { return r.column === header.id; });
      const cell  = row[index];
      // figure out the rules the cell needs to pass
      let rules = validationFuncs.getGeneratedRules(dropTarget);
      _.each(rules, (rule,i) => {
        // for each rule, validate the cell
        let result = validationFuncs.checkPassRule(cell, rule);
        if(result.valid) {
          dispatch(dispatchValidateCellPass(cell, rule));
        } else {
          dispatch(dispatchValidateCellFail(cell, rule));
        }
      })
    });

    //dispatch(dispatchAttemptMappingFinish(header));
  }
}