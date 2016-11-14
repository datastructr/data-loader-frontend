import { 
  GET_SCHEMAS, GET_SCHEMAS_SUCCESS, GET_SCHEMAS_FAILED
} from '../actions/schemas';

const initialState = {
  availableSchemas: [],
  schemasLoading: false,
  schemasLoaded: false,
  schemasLoadError: false,
  schemasErrorMessage: '',
  activeSchemaId: null
};

export default function schemas(state = initialState, action) {
  switch (action.type) {
  case GET_SCHEMAS:
    return Object.assign({}, state, {
      schemasLoading: true,
      schemasLoaded: false,
      schemas: [],
      schemasErrorMessage: ''
    });
  case GET_SCHEMAS_SUCCESS:
    return Object.assign({}, state, {
      schemas: action.schemas,
      schemasLoading: false,
      schemasLoaded: true,
      schemasLoadError: false,
      schemasErrorMessage: ''
    });
  case GET_SCHEMAS_FAILED:
    return Object.assign({}, state, {
      schemas: [],
      schemasLoading: false,
      schemasLoaded: false,
      schemasLoadError: true,
      schemasErrorMessage: action.errorMessage
    });
  default:
    return state;
  }
}
