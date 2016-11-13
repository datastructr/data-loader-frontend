
export const LOAD_DATA = 'LOAD_DATA';
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_FAILED = 'LOAD_DATA_FAILED';

function loadData() {
  return {
    type: LOAD_DATA
  };
}

function loadDataSuccess(data) {
  return {
    type: LOAD_DATA_SUCCESS,
    data: data
  };
}

function loadDataFailed(message) {
  return {
    type: LOAD_DATA_FAILED,
    errorMessage: message
  };
}

export function beginLoadData() {
  return dispatch => {
    dispatch(loadData());
    // TODO
    let data = {};
    dispatch(loadDataSuccess(data))
  };
}