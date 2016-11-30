import Immutable, { Map, List, fromJS } from 'immutable';

import { 
  LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_FAILED,
  HEADER_BEGIN_DRAG, HEADER_END_DRAG,HEADER_ATTEMPT_MAP,
  CELL_VALIDATE_BEGIN, CELL_VALIDATE_PASS, CELL_VALIDATE_FAIL, CELL_UPDATE_VALUE
} from '../actions/uploader';

const initialState = Map({
  tableData: Immutable.List(),
  headerData: Immutable.List(),
  fileLoading: false,
  fileLoaded: false,
  fileLoadError: false,
  fileErrorMessage: ''
});

const cell = (state, action) => {
  switch (action.type) {
  case CELL_VALIDATE_BEGIN:
    return state.withMutations(state => {
        state
          .set('rulesFailed', List())
          .set('rulesPassed', List())
      });
  case CELL_VALIDATE_PASS:
    return state
            .set('rulesPassed', state.get('rulesPassed').push(action.rule))
  case CELL_VALIDATE_FAIL:
    return state
            .set('rulesFailed', state.get('rulesFailed').push(action.rule))
  case CELL_UPDATE_VALUE:
    return state
            .set('value', action.newVal)
  default:
    return state; 
  }
}

const rowReducer = (state, action) => {
  switch (action.type) {
  case CELL_VALIDATE_BEGIN:
  case CELL_VALIDATE_PASS:
  case CELL_VALIDATE_FAIL:
  case CELL_UPDATE_VALUE:
    return state
            .set(action.cell.get('columnIndex'), cell(state.get(action.cell.get('columnIndex')), action));
  default:
    return state; 
  }
}


const tableReducer = (state, action) => {
  switch (action.type) {
  case CELL_VALIDATE_BEGIN: 
  case CELL_VALIDATE_PASS:
  case CELL_VALIDATE_FAIL:
  case CELL_UPDATE_VALUE: 
    return state
            .set(action.cell.get('row'), rowReducer(state.get(action.cell.get('row')), action));
  default:
    return state;
    
  }
}

const header = (state, action) => {
  switch (action.type) {
  case HEADER_BEGIN_DRAG:
    return state
              .set('headerDragging', true);
  case HEADER_END_DRAG:
    return state
              .set('headerDragging', false);
  case HEADER_ATTEMPT_MAP:
    return state.withMutations(state => {
        state
          .set('validated', false)
          .set('validating', true)
          .set('validatePass', false)
          .set('validateFail', false)
          .set('validateMessage', '')
          .set('rowsPassedCount', 0)
          .set('rowsPassedFailed', 0)
          .set('headerMap', action.dropTarget)
    });
  default:
    return state;
  }
};

const headerReducer = (state, action) => {
  switch (action.type) {
  case HEADER_BEGIN_DRAG:
  case HEADER_END_DRAG:
  case HEADER_ATTEMPT_MAP:
    return state
            .set(action.headerCell.get('rowIndex'), header(state.get(action.headerCell.get('rowIndex')), action));
  default:
    return state;
  }
}

export default function uploader(state = initialState, action) {
  switch (action.type) {
  case LOAD_DATA:
    return state.withMutations(state => {
        state
          .set('fileLoading', true)
          .set('fileLoaded', false)
          .set('fileErrorMessage', '')
    });
  case LOAD_DATA_SUCCESS:
    return state.withMutations(state => {
        state
          .set('fileLoading', false)
          .set('fileLoaded', true)
          .set('fileLoadError', false)
          .set('fileErrorMessage', '')
          .set('tableData', fromJS(action.tableData))
          .set('headerData', fromJS(action.headerData))
    });
  case LOAD_DATA_FAILED:
    return state.withMutations(state => {
        state
          .set('fileLoading', false)
          .set('fileLoaded', false)
          .set('fileLoadError', true)
          .set('fileErrorMessage', action.errorMessage)
    });
  case HEADER_BEGIN_DRAG:
  case HEADER_END_DRAG:
  case HEADER_ATTEMPT_MAP: 
    return state
            .set('headerData', headerReducer(state.get('headerData'), action))
  case CELL_VALIDATE_PASS: 
  case CELL_VALIDATE_FAIL: 
  case CELL_UPDATE_VALUE: 
  case CELL_VALIDATE_BEGIN: 
    return state
            .set('tableData', tableReducer(state.get('tableData'), action))
  default:
    return state;
  }
}