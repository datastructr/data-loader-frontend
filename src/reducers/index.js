import { combineReducers } from 'redux';

import uploader from './uploader';
import schemas from './schemas';
import reporter  from './reporter';

export default combineReducers({
  uploader : uploader,
  schemas : schemas,
  reporter : reporter
});