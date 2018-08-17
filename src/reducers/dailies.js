import { combineReducers } from 'redux';
import { FETCH_DAILIES_SUCCESS, CHECK } from '../actions/dailies'
import { CLEAR_DAILIES } from '../actions/auth'


const filteredArchivedDailies = (action) => {
  if(action.payload) {
    const filteredDailies =  action.payload.filter((daily)=> !daily.archived)
    return filteredDailies
  }
  return action.payload
}

const dailies = (state = [], action) => {
  switch(action.type){
    case FETCH_DAILIES_SUCCESS:
      return filteredArchivedDailies(action)
    case CHECK:
      return state.map(ele =>
        ele.id === action.payload ?
        { ...ele, checked: !ele.checked} : {...ele} )
    case CLEAR_DAILIES:
      return state = []
    default:
      return state
  }
}




const rootReducer = combineReducers({
    dailies,
});

export default rootReducer;
