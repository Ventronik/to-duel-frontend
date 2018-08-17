import request from '../helpers/request';

export const FETCH_DAILIES_SUCCESS = 'FETCH_DAILIES_SUCCESS';
export const CHECK = 'CHECK';


export const fetchDailies = (id) => (
  dispatch => {
    request(`/users/${id}/dailies`)
    .then((response) => {
      dispatch({
        type: FETCH_DAILIES_SUCCESS,
        payload: response.data.data})
    })
  }
)

export const addDaily = (name, userId) => (
  dispatch => {
    request(`/users/${userId}/dailies`, 'post', {name})
    .then((response) => {
      dispatch(fetchDailies(userId))
    })
  }
);

export const handleCheck = (userId, dailyId, completed) => (
  dispatch => {
    request(`/users/${userId}/dailies/${dailyId}/dailyHistory`, 'post', {completed})
    .then((response) => {
      dispatch(fetchDailies(userId))
    })
  }
);

export const archiveDaily = (userId, dailyId) => (
  dispatch => {
    request(`/users/${userId}/dailies/${dailyId}`, 'patch', {archived: true})
    .then((response) => {
      dispatch(fetchDailies(userId))
    })
  }
);
