import { createStore, applyMiddleware, Store, Middleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '@/reducers/index';

let store: Store;
const middlewares: Middleware[] = [];
const configureStore = (initialState?: any): Store => {
  if (store) {
    return store;
  }

  middlewares.push(thunk);

  store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  return store;
};

export default configureStore;
