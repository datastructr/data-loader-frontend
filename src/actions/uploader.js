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

function dispatchLoadDataSuccess(headerData, tableData) {
  return {
    type: LOAD_DATA_SUCCESS,
    headerData: headerData,
    tableData: tableData
  };
}

// function dispatchLoadDataFailed(message) {
//   return {
//     type: LOAD_DATA_FAILED,
//     errorMessage: message
//   };
// }


// Sample tests
//import {testFileData} from '../tests/App.samples.js';

export function beginLoadFileData(file) {
  return dispatch => {
    dispatch(dispatchLoadData());

    Papa.parse(file, {
        header:true,
        complete: function(results) {
          const {
            headerData, 
            tableData
          } = (new ParseCsv(results.data)).shapeCsvAndRetrieve();
          dispatch(dispatchLoadDataSuccess(headerData, tableData));
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
//function dispatchAttemptMappingFinish(headerCell) {}

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

export function endHeaderDragDroppedMapped(header, dropTarget) {
  return (dispatch, getState) => {
    dispatch(dispatchAttemptMapping(header,dropTarget));
    // get the uploaded data
    let iterables = 
      getState().uploader.present
        .get('tableData')
        .values();

    // figure out the rules the cell needs to pass
    let rules = validationFuncs.getGeneratedRules(dropTarget);

    function validateSingleCell() {
 
      let itr = iterables.next();
      let row = itr.value;
      const cell = row.get(header.get('rowIndex'));

      // for each rule, validate the cell
      _.each(rules, (rule,i) => {
        let result = validationFuncs.checkPassRule(cell, rule);
        if(result.valid) { 
          dispatch(dispatchValidateCellPass(cell, rule));
        } else {
          dispatch(dispatchValidateCellFail(cell, rule));
        }
      });

      if(!itr.done) {
         setTimeout(function() {
           validateSingleCell()
          }, 0);
      }
    }

    validateSingleCell();

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