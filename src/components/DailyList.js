import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import Daily from './Daily'
import 'bootstrap/dist/css/bootstrap.css'

import { fetchDailies, addDaily } from '../actions/dailies';
import withAuthentication from '../helpers/withAuthentication'

class DailyList extends React.Component {
  
  // Mounting Methods
  componentDidMount = async () => {
    if (this.props.authState) {
      this.props.fetchDailies(this.props.authState.id)
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if(prevProps.authState !== this.props.authState){
      this.props.fetchDailies(this.props.authState.id)
    }
  }


  render () {
    const dailiesData = this.props.dailies.dailies
    console.log(dailiesData)
    const Dailies = dailiesData.map(daily => {
      return (
        <Daily
          key={daily.id}
          daily={daily}
        />
      )
    })

    console.log(this.props)

    const formStyle = {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    }
    return (
      <ListGroup>
        <ListGroupItem
          className="justify-content-between">
          <h2> DAILIES </h2>
        </ListGroupItem>
        {Dailies}
        <form
          style={formStyle}
          onSubmit={(event)=>{
            event.preventDefault()
            this.props.addDaily(event.target.name.value,this.props.authState.id)}}
          >
          <input type="text" name="name" />
          <Button color="info"
            > New Daily</Button>
        </form>
      </ListGroup>
    )
  }
}

const mapStateToProps = ({dailies, auth}) => {
  return {dailies, auth}
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchDailies, addDaily}, dispatch)
}

export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(DailyList))
