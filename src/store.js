import { applyMiddleware, createStore } from 'redux';
import rootReducer from  './reducers';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

export default(initialState) => {
    return createStore(
      rootReducer,
      process.env.NODE_ENV === 'production' ?
        applyMiddleware(thunkMiddleware) :
        applyMiddleware(logger, thunkMiddleware)
    );
}
