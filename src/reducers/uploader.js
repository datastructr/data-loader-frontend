import { 
  LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_FAILED,
  HEADER_BEGIN_DRAG, HEADER_END_DRAG,
  HEADER_ATTEMPT_MAP,
  CELL_VALIDATE_BEGIN, CELL_VALIDATE_PASS, CELL_VALIDATE_FAIL,
  CELL_UPDATE_VALUE
} from '../actions/uploader';

const initialState = {
  fileData: {
    tableData: [],
    headerData: []
  },
  fileLoading: false,
  fileLoaded: false,
  fileLoadError: false,
  fileErrorMessage: ''
};


const header = (state = {id:null}, action) => {
  switch (action.type) {
  case HEADER_BEGIN_DRAG:
    if (state.id !== action.headerCell.id) {
      return state;
    }
    return Object.assign({}, state,{
      headerDragging: true
    });
  case HEADER_END_DRAG:
    if (state.id !== action.headerCell.id) {
      return state;
    }
    return Object.assign({}, state,{
      headerDragging: false
    });
  case HEADER_ATTEMPT_MAP:
    if (state.id !== action.headerCell.id) {
      return state;
    }
    return Object.assign({}, state,{
      validated: false,
      validating: true,
      validatePass: false,
      validateFail: false,
      validateMessage: '',
      rowsPassedCount: 0,
      rowsPassedFailed: 0,
      headerMap: action.dropTarget
    });
  default:
    return state;
    
  }
}

const headerReducer = (state = [], action) => {
  switch (action.type) {
  case HEADER_BEGIN_DRAG:
    return state.map(h =>
      header(h, action)
    );
  case HEADER_END_DRAG:
    return state.map(h =>
      header(h, action)
    );
  case HEADER_ATTEMPT_MAP:
    return state.map(h =>
      header(h, action)
    );
  default:
    return state;
    
  }
}

const cell = (state = {id:null}, action) => {
  switch (action.type) {
  case CELL_VALIDATE_BEGIN:
    if (state.id !== action.cell.id) {
      return state;
    }
    return Object.assign({}, state, {
      rulesPassed: [],
      rulesFailed: []
    });
  case CELL_VALIDATE_PASS:
    if (state.id !== action.cell.id) {
      return state;
    }
    return Object.assign({}, state, {
      rulesPassed: [action.rule].concat(state.rulesPassed)
    });
  case CELL_VALIDATE_FAIL:
    if (state.id !== action.cell.id) {
      return state;
    }
    return Object.assign({}, state, {
      rulesFailed: [action.rule].concat(state.rulesFailed)
    });
  case CELL_UPDATE_VALUE:
    if (state.id !== action.cell.id) {
      return state;
    }
    return Object.assign({}, state, {
      value: action.newVal
    });
  default:
    return state; 
  }
}

const rowReducer = (state = [], action) => {
  switch (action.type) {
  case CELL_VALIDATE_BEGIN:
    return state.map(c => {
     return  cell(c, action)
    });
  case CELL_VALIDATE_PASS:
    return state.map(c => {
     return  cell(c, action)
    });
  case CELL_VALIDATE_FAIL:
    return state.map(c => {
     return  cell(c, action)
    });
  case CELL_UPDATE_VALUE:
    return state.map(c => {
     return  cell(c, action)
    });
  default:
    return state; 
  }
}

const tableReducer = (state = [], action) => {
  switch (action.type) {
  case CELL_VALIDATE_BEGIN: 
    return state.map(row =>
      rowReducer(row, action)
    );
  case CELL_VALIDATE_PASS:
    return state.map(row =>
      rowReducer(row, action)
    );
  case CELL_VALIDATE_FAIL:
    return state.map(row =>
      rowReducer(row, action)
    );
  case CELL_UPDATE_VALUE: 
    return state.map(row =>
      rowReducer(row, action)
    );
  default:
    return state;
    
  }
}

export default function uploader(state = initialState, action) {
  switch (action.type) {
  case LOAD_DATA:
    return Object.assign({}, state, {
      fileLoading: true,
      fileLoaded: false,
      fileData: [],
      fileErrorMessage: ''
    });
  case LOAD_DATA_SUCCESS:
    return Object.assign({}, state, {
      fileData: action.fileData,
      fileLoading: false,
      fileLoaded: true,
      fileLoadError: false,
      fileErrorMessage: ''
    });
  case LOAD_DATA_FAILED:
    return Object.assign({}, state, {
      fileData: [],
      fileLoading: false,
      fileLoaded: false,
      fileLoadError: true,
      fileErrorMessage: action.errorMessage
    });
  case HEADER_BEGIN_DRAG:
    return Object.assign({}, state, {
      fileData: Object.assign({}, state.fileData, {
        headerData: headerReducer(state.fileData.headerData, action) 
      })
    });
  case HEADER_END_DRAG:
    return Object.assign({}, state, {
      fileData: Object.assign({}, state.fileData, {
        headerData: headerReducer(state.fileData.headerData, action) 
      })
    });
  case HEADER_ATTEMPT_MAP: 
    return Object.assign({}, state, {
      fileData: Object.assign({}, state.fileData, {
        headerData: headerReducer(state.fileData.headerData, action) 
      })
    });
  case CELL_VALIDATE_PASS: 
    return Object.assign({}, state, {
      fileData: Object.assign({}, state.fileData, {
        tableData: tableReducer(state.fileData.tableData, action) 
      })
    });
  case CELL_VALIDATE_FAIL: 
    return Object.assign({}, state, {
      fileData: Object.assign({}, state.fileData, {
        tableData: tableReducer(state.fileData.tableData, action) 
      })
    });
  case CELL_UPDATE_VALUE: 
    return Object.assign({}, state, {
      fileData: Object.assign({}, state.fileData, {
        tableData: tableReducer(state.fileData.tableData, action) 
      })
    });
  case CELL_VALIDATE_BEGIN: 
    return Object.assign({}, state, {
      fileData: Object.assign({}, state.fileData, {
        tableData: tableReducer(state.fileData.tableData, action) 
      })
    });
  default:
    return state;
  }
}

