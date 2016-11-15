import { 
  LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_FAILED,
  HEADER_BEGIN_DRAG, HEADER_END_DRAG,
  VALIDATE_COLUMN_BEGIN, VALIDATE_COLUMN_END
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
      headerMapping: true
    });
  case HEADER_END_DRAG:
    if (state.id !== action.headerCell.id) {
      return state;
    }
    return Object.assign({}, state,{
      headerMapping: false
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
  default:
    return state;
  }
}