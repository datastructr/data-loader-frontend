import { 
  LOAD_DATA, LOAD_DATA_SUCCESS, LOAD_DATA_FAILED,

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
  default:
    return state;
  }
}