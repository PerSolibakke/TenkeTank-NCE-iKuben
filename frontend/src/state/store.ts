import { combineReducers, createStore } from 'redux';
import apiErrorReducer from './reducers/apiErrorReducer';
import nodeReducer from './reducers/nodeReducer';
import informationBoxReducer from './reducers/informationBoxReducer';

const rootReducer = combineReducers({
  apiError: apiErrorReducer,
  node: nodeReducer,
  informationBoxStatus: informationBoxReducer,
});
const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;