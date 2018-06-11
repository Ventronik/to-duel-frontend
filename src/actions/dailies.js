import request from '../helpers/request';

export const FETCH_DAILIES_SUCCESS = 'FETCH_DAILIES_SUCCESS';

export const fetchDailies = (id) => (
  dispatch => {
    request(`/users/${id}/dailies`)
    .then((response) => {
      dispatch({type: FETCH_DAILIES_SUCCESS, payload: response.data.data})
    })
  }
)

// export const fetchCompletedStatus = (userId, dailyId) => {
//   dispatch => {
//     request(`/users/${userId}/dailies/${dailyId}/dailyHistory`, 'get')
//     .then(response => {
//       const completedStatus = response.data.data ? response.data.data.completed : false
//       this.setState({completed: completedStatus})
//     })
//   }
// }

export const fetchStreak = (userId, dailyId) => {
  dispatch => {
    request(`/users/${userId}/dailies/${dailyId}/dailyHistory/streak`, 'patch')
    .then((response) => {
      if(response.data.data===0) {
        return request(`/users/${userId}/dailies/${dailyId}/dailyHistory/streak`, 'patch', {daysAgo: 1})
      } else {
        return response
      }
    })
    .then((response) => {
      if(response) {
        this.setState({streak: response.data.data})
      }
    })
    .then((response) => {
      this.fetchCompletedStatus(userId, dailyId)
    })
  }
}

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
