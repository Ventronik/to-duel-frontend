import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import { FETCH_DUELS_SUCCESS, FETCH_DUEL_SUCCESS, FETCH_OPPONENTS } from '../actions/duels'
import { CLEAR_DUELS } from '../actions/auth'

const duels = (state = [], action) => {
  switch(action.type){
    case FETCH_DUELS_SUCCESS:
      return action.payload
    case CLEAR_DUELS:
      return state = []
    default:
      return state
  }
}

const duelData = (state = [], action) => {
  switch(action.type){
    case FETCH_DUEL_SUCCESS:
      return action.payload
    case CLEAR_DUELS:
      return state = []
    default:
      return state
  }
}

const opponentList = (state = [], action) => {
  switch(action.type){
    case FETCH_OPPONENTS:
      return action.payload
    case CLEAR_DUELS:
      return state = []
    default:
      return state
  }
}

const rootReducer = combineReducers({
    duels, duelData, opponentList
});

export default rootReducer;
