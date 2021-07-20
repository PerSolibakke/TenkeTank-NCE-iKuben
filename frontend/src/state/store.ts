import { combineReducers, createStore } from 'redux';
import apiErrorReducer from './reducers/apiErrorReducer';
import databaseReducer from './reducers/databaseReducer';
import fullscreenReducer from './reducers/fullscreenReducer';
import informationBoxReducer from './reducers/informationBoxReducer';

const rootReducer = combineReducers({
  apiError: apiErrorReducer,
  database: databaseReducer,
  fullscreenStatus: fullscreenReducer,
  informationBoxStatus: informationBoxReducer,
});
const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;