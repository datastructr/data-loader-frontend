import { 
  GET_SCHEMAS, GET_SCHEMAS_SUCCESS, GET_SCHEMAS_FAILED,
  FIELD_ATTEMPT_MAP
} from '../actions/schemas';

const initialState = {
  availableSchemas: [],
  schemasLoading: false,
  schemasLoaded: false,
  schemasLoadError: false,
  schemasErrorMessage: '',
  activeSchemaId: null
};


const property = (state = {id:null}, action) => {
  switch (action.type) {
  case FIELD_ATTEMPT_MAP:
    if (state.column_name !== action.dropTarget.column_name) {
      return state;
    }
    return Object.assign({}, state,{
      fieldMapping: true
    });
  default:
    return state;
    
  }
}

const propertyReducer = (state = [], action) => {
  switch (action.type) {
  case FIELD_ATTEMPT_MAP:
    return state.map(h =>
      property(h, action)
    );
  default:
    return state;
    
  }
}

const schema = (state = {name:null}, action) => {
  switch (action.type) {
  case FIELD_ATTEMPT_MAP:
    if (state.name !== action.dropTarget.belongsTo) {
      return state;
    }
    return Object.assign({}, state,{
      properties: propertyReducer(state.properties, action)
    });
  default:
    return state;
    
  }
}

const schemaReducer = (state = [], action) => {
  switch (action.type) {
  case FIELD_ATTEMPT_MAP:
    return state.map(s =>
      schema(s, action)
    );
  default:
    return state;
    
  }
}

export default function schemas(state = initialState, action) {
  switch (action.type) {
  case GET_SCHEMAS:
    return Object.assign({}, state, {
      schemasLoading: true,
      schemasLoaded: false,
      availableSchemas: [],
      schemasErrorMessage: ''
    });
  case GET_SCHEMAS_SUCCESS:
    return Object.assign({}, state, {
      availableSchemas: action.schemaData.availableSchemas,
      schemasLoading: false,
      schemasLoaded: true,
      schemasLoadError: false,
      schemasErrorMessage: ''
    });
  case GET_SCHEMAS_FAILED:
    return Object.assign({}, state, {
      availableSchemas: [],
      schemasLoading: false,
      schemasLoaded: false,
      schemasLoadError: true,
      schemasErrorMessage: action.errorMessage
    });
  case FIELD_ATTEMPT_MAP: 
    return Object.assign({}, state, {
      availableSchemas: schemaReducer(state.availableSchemas, action)
    });
  default:
    return state;
  }
}
