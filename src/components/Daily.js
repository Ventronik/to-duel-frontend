import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteDaily } from '../actions/dailies';
import request from '../helpers/request';
import { ListGroupItem, Badge } from 'reactstrap';
import FontAwesome from 'react-fontawesome'



class Daily extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      completed: '',
      streak: 0,
    }
  }

  fetchCompletedStatus = (userId, dailyId) => {
    request(`/users/${userId}/dailies/${dailyId}/dailyHistory`, 'get')
    .then(response => {
      const completedStatus = response.data.data ? response.data.data.completed : false
      this.setState({completed: completedStatus})
    })
  }

  handleCheck = (userId, dailyId, completed) => {
    request(`/users/${userId}/dailies/${dailyId}/dailyHistory`, 'post', {completed: completed})
    .then((response) => {
      this.fetchCompletedStatus(userId, dailyId)
    })
    .then(response => {
      this.fetchStreak(userId, dailyId)
    })
  }

  fetchStreak = (userId, dailyId) => {
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


  // Mounting Methods

  componentDidMount = async () => {
    this.fetchStreak(this.props.daily.users_id, this.props.daily.id)
    this.fetchCompletedStatus(this.props.daily.users_id, this.props.daily.id)
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if(prevProps.authState !== this.props.authState){
      this.fetchCompletedStatus(this.props.authState.id)
    }
  }

  render() {
    const {id, name, users_id,
      // streak, archived,
    } = this.props.daily

    const dailyStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }

    const completedDailyStyle = {
      fontWeight: 'bold',
    }

    const iconContainerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }

    const deleteIcon = {
      fontSize: '1.5em',
      color: '#8F0000'
    }

    return (
      <ListGroupItem
        style={dailyStyle}
        color={this.state.completed?'success' : null}
        >
          {!this.state.completed ?
            <FontAwesome
              name='square-o'
              size='2x'
              onClick={()=>{
                this.handleCheck(users_id, id, !this.state.completed)
              }}
            /> :
            <FontAwesome
              name='check-square'
              size='2x'
              onClick={()=>{
                this.handleCheck(users_id, id, !this.state.completed)
              }}
            />
          }
          <div style={!this.state.completed ? completedDailyStyle: null}>
            {name}
          </div>
          <div style={iconContainerStyle}>
            <Badge pill>{this.state.streak}</Badge>
            <FontAwesome
              name='remove'
              style={deleteIcon}
              onClick={() => {
                console.log(`delete ${id}`)
                this.props.deleteDaily(users_id, id)
              }}
            />
          </div>
        </ListGroupItem>
      )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({deleteDaily}, dispatch)
}

export default connect(null, mapDispatchToProps)(Daily)
