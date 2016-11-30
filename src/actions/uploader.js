import _ from 'lodash';
import Papa from 'papaparse';

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

export function beginLoadFileData(file) {
  return dispatch => {
    dispatch(dispatchLoadData());

    Papa.parse(file, {
        header:true,
        complete: function(results) {
          console.log("Finished:", results.data);
          let pcsv = new ParseCsv(results.data);
          //console.log(pcsv.shapeCsvAndRetrieve())
          dispatch(dispatchLoadDataSuccess(pcsv.shapeCsvAndRetrieve()));
        }
      });

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
 * Cell actions
 * 
 */
export const CELL_UPDATE_VALUE = 'CELL_UPDATE_VALUE';

function updateCellValue(newVal, cell) {
  return {
    type: CELL_UPDATE_VALUE,
    cell: cell,
    newVal: newVal
  }
}

export function dispatchUpdateCellValue(newVal,cell) {
  return dispatch => {
    dispatch(updateCellValue(newVal,cell));
  };
}

/**
 * Mapping actions
 * 
 * mapping header to drop target fields, validating each cell associated with the header column
 * 
 */
export const HEADER_ATTEMPT_MAP = 'HEADER_ATTEMPT_MAP';
export const HEADER_ATTEMPT_FINISH = 'HEADER_ATTEMPT_MAP';
export const CELL_VALIDATE_BEGIN = 'CELL_VALIDATE_BEGIN';
export const CELL_VALIDATE_PASS = 'CELL_VALIDATE_PASS';
export const CELL_VALIDATE_FAIL = 'CELL_VALIDATE_FAIL';


function dispatchAttemptMapping(headerCell, dropTarget) {
  return {
    type: HEADER_ATTEMPT_MAP,
    headerCell: headerCell,
    dropTarget: dropTarget
  }
}

// TODO
function dispatchAttemptMappingFinish(headerCell) {}

function dispatchValidateCellPass(cell, rule) {
  return {
    type: CELL_VALIDATE_PASS,
    cell: cell,
    rule: rule
  }
}

function dispatchValidateCellFail(cell, rule) {
  return {
    type: CELL_VALIDATE_FAIL,
    cell: cell,
    rule: rule
  }
}

// TODO
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
    _.map(getState().uploader.present.fileData.tableData, (row, rowdex) => {
      // for each row, get the cell in question
      let index = _.findIndex(row, (r) => { return r.column === header.id; });
      const cell  = row[index];
      // figure out the rules the cell needs to pass
      let rules = validationFuncs.getGeneratedRules(dropTarget);
      _.each(rules, (rule,i) => {
        
        // shows the iterative effect
        (function(index) {
          setTimeout(function() {
            
            // for each rule, validate the cell
            let result = validationFuncs.checkPassRule(cell, rule);
            if(result.valid) { 
              dispatch(dispatchValidateCellPass(cell, rule));
            } else {
              dispatch(dispatchValidateCellFail(cell, rule));
            }

          }, 50 * (rowdex*1.5));
        })(i)
           
      })
    });

    //dispatch(dispatchAttemptMappingFinish(header));
  }
}

function dispatchValidateCellBegin(cell) {
  return {
    type: CELL_VALIDATE_BEGIN,
    cell: cell
  }
}

export function revalidateSingleCell(cell) {
  return (dispatch, getState) => {
    let headers = getState().uploader.present.fileData.headerData;
    let col = 
      _.findIndex( 
        headers,
        (c) => {return c.id === cell.column;}
      );
    dispatch(dispatchValidateCellBegin(cell));
    let rules = validationFuncs.getGeneratedRules(headers[col].headerMap);
    _.each(rules, (rule,i) => {
      // for each rule, validate the cell
      let result = validationFuncs.checkPassRule(cell, rule);
      if(result.valid) { 
        dispatch(dispatchValidateCellPass(cell, rule));
      } else {
        dispatch(dispatchValidateCellFail(cell, rule));
      }
    });
  };
}