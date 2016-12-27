import _ from 'lodash';
import Papa from 'papaparse';

import ParseCsv from './utils/parseCsv';
import validationFuncs from './utils/validationFuncs';

export const UPLOAD_FILE = 'LOAD_FILE';
export const UPLOAD_FILE_SUCCESS = 'LOAD_FILE_SUCCESS';
export const UPLOAD_FILE_PROGRESS = 'LOAD_FILE_PROGRESS';
export const UPLOAD_FILE_FAILED = 'LOAD_FILE_FAILED';

function dispatchUploadFile() {
  return {
    type: UPLOAD_FILE
  };
}

function dispatchUpoadFileSuccess(headerData, tableData) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    headerData: headerData,
    tableData: tableData
  };
}

export function dispatchUploadFileProgress(progress) {
  return {
    type: UPLOAD_FILE_PROGRESS,
    progress: progress
  };
}

// function dispatchUploadFileFailed(message) {
//   return {
//     type: LOAD_DATA_FAILED,
//     errorMessage: message
//   };
// }


// Sample tests
//import {testFileData} from '../tests/App.samples.js';

export function beginLoadFileData(file, encoding = "utf-8") {
  return dispatch => {
    dispatch(dispatchUploadFile());
    let finalResults = [];
    Papa.parse(file, {
        header:true,
        encoding: encoding,
        // fired at every row
        step: function(results, parser) {
          // TODO error handle
          //console.log("Row errors:", results.errors);

          finalResults[finalResults.length] = results.data[0];
        },
        complete: function(results,file) {
          console.log('1')
          const {
            headerData, 
            tableData
          } = (new ParseCsv(finalResults)).shapeCsvAndRetrieve();
          dispatch(dispatchUpoadFileSuccess(headerData, tableData));
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

function dispatchValidateCellPass(cell, rule, headerCell) {
  return {
    type: CELL_VALIDATE_PASS,
    cell: cell,
    headerCell: headerCell,
    rule: rule
  }
}

function dispatchValidateCellFail(cell, rule, headerCell) {
  return {
    type: CELL_VALIDATE_FAIL,
    cell: cell,
    headerCell: headerCell,
    rule: rule
  }
}

export function endHeaderDragDroppedMapped(header, dropTarget) {
  return (dispatch, getState) => {
    dispatch(dispatchAttemptMapping(header,dropTarget));
    // figure out the rules the cell needs to pass
    let rules = validationFuncs.getGeneratedRules(dropTarget);
    // get the uploaded data as iterable
    let iterable = 
      getState().uploader.present
        .get('tableData')
        .values();

    function validateSingleCell(parentRow) {
      const cell = parentRow.get(header.get('rowIndex'));
      _.each(rules, (rule,i) => {
        let result = validationFuncs.checkPassRule(cell, rule);
        if(result.valid) { 
          dispatch(dispatchValidateCellPass(cell, rule, header));
        } else {
          dispatch(dispatchValidateCellFail(cell, rule, header));
        }
      });

      let next = iterable.next();      
      if(!next.done) {
         setTimeout(function() {
           validateSingleCell(next.value)
          }, 0);
      }
    }

    validateSingleCell(iterable.next().value);
    //dispatch(dispatchAttemptMappingFinish(header));
  };  
}

function dispatchValidateCellBegin(cell) {
  return {
    type: CELL_VALIDATE_BEGIN,
    cell: cell
  }
}

export function revalidateSingleCell(cell) {
  return (dispatch, getState) => {
    let headerMap = getState().uploader.present
      .getIn(['headerData', cell.get('columnIndex'), 'headerMap']);

      console.log(headerMap)



    dispatch(dispatchValidateCellBegin(cell));
    let rules = validationFuncs.getGeneratedRules(headerMap);
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