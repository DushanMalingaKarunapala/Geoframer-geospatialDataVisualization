import { legacy_createStore as createStore} from 'redux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { taskMiddleware } from 'react-palm/tasks';
import logger from 'redux-logger';
import keplerGlReducer from 'kepler.gl/reducers';

const rootReducer = combineReducers({
  keplerGl: keplerGlReducer,
  // Add your other reducers here
});

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(logger, taskMiddleware)
);

export default store;
