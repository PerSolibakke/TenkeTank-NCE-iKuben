import { combineReducers, createStore } from 'redux';
import apiErrorReducer from './reducers/apiErrorReducer';
import databaseReducer from './reducers/databaseReducer';
import informationBoxReducer from './reducers/informationBoxReducer';

const rootReducer = combineReducers({
  apiError: apiErrorReducer,
  database: databaseReducer,
  informationBoxStatus: informationBoxReducer,
});
const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;