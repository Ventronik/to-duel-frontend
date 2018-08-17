import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import request from '../helpers/request';
import { ListGroup, ListGroupItem, Badge, Button, FormGroup } from 'reactstrap';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fetchDuel } from '../actions/duels';
import { Container, Row, Col, Card, CardHeader, Alert } from 'reactstrap';
import withAuthentication from '../helpers/withAuthentication'
import { rejectDuel, confirmDuel } from '../actions/duels';
import U2AcceptDuel from './u2AcceptDuel'

//this.state.duel is not this.props.duel. props contains a list of duels. state contains daily data about the duel in questions.

class Duel extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      duel: [],
      user: {},
      opponent: {}
    }
  }

  fetchDuel = (userId, duelId) => {
    request(`/users/${userId}/duels/${duelId}`)
    .then((response) => {
      let userDailies= [];
      let opponentDailies= []
      let userDailyCounts= [0,0,0]
      let opponentDailyCounts= [0,0,0]

      if (this.props.userId === response.data.data.u1_id){
        response.data.data.user1_dailies.forEach(daily=> {

            userDailies.push(daily.name)
          daily.history.forEach(ele=> {
            let index = userDailies.indexOf(daily.name)
            if(ele.completed === true) userDailyCounts[index]++
          })
        })
        response.data.data.user2_dailies.forEach(daily=> {
          opponentDailies.push(daily.name)
          daily.history.forEach(ele=> {
            let index = opponentDailies.indexOf(daily.name)
            if(ele.completed === true) opponentDailyCounts[index]++
          })
        })
      } else {
        response.data.data.user2_dailies.forEach(daily=> {
          userDailies.push(daily.name)
          daily.history.forEach(ele => {
            let index = userDailies.indexOf(daily.name)
            if(ele.completed === true) userDailyCounts[index]++
          })
        })
        response.data.data.user1_dailies.forEach(daily=> {
          opponentDailies.push(daily.name)
          daily.history.forEach(ele => {
            let index = opponentDailies.indexOf(daily.name)
            if(ele.completed === true) opponentDailyCounts[index]++
          })
        })
      }
      this.setState({duel: response.data.data, user:{userDailies, userDailyCounts}, opponent:{opponentDailies, opponentDailyCounts}}, )
    })
  }

  // Mounting Methods
  componentDidMount = async () => {
    if (this.props.authState) {
      this.fetchDuel(this.props.authState.id, this.props.duel.id)
    }
  }

  componentWillUpdate = async (prevProps, prevState) => {
    if(prevProps.authState !== this.props.authState || prevProps.dailies !== this.props.dailies){
      this.fetchDuel(this.props.authState.id, this.props.duel.id)
    }
  }

  render () {
    const {
      end_time,
      id,
      u1_confirmed,
      u1_id,
      u2_id,
      u2_accepted
    } = this.props.duel
    const opponentName = this.props.duel.u1_name === this.props.authState.name ? this.props.duel.u2_name : this.props.duel.u1_name
    const { dailies } = this.props.dailies
    const dailyNames = dailies.map(daily=> daily.name)

    return (
      <Container
        className="justify-content-between duel-background">
          <Row
            className="duel-header">
            <Col>
              <h3>vs. {opponentName}</h3>
            {(this.state.user.userDailyCounts && this.state.user.userDailyCounts.reduce((acc, val)=> acc + val ) > this.state.opponent.opponentDailyCounts.reduce((acc, val)=> acc + val )) && (Date.parse(this.props.duel.end_time) < Date.parse(new Date())) ? <Alert color="success">You Won!</Alert> : null }
            {(this.state.user.userDailyCounts && this.state.user.userDailyCounts.reduce((acc, val)=> acc + val ) < this.state.opponent.opponentDailyCounts.reduce((acc, val)=> acc + val )) && (Date.parse(this.props.duel.end_time) < Date.parse(new Date())) ? <Alert color="danger">You Lose!</Alert> : null }
            </Col>
          </Row>
          <Row className="duel-body">
            <Col xs="12" md="6">
              <Card>
                <CardHeader><Badge pill>{this.state.user.userDailies ? this.state.user.userDailyCounts.reduce((acc, val)=> acc + val ) : null}/15</Badge> Your Dailies:</CardHeader>
                    <ListGroup>
                      <ListGroupItem>{
                          this.state.user.userDailies && this.props.dailies ?

                          dailyNames.find(ele => ele === this.state.user.userDailies[0])

                        : null}
                           <Badge color='info' pill>{this.state.user.userDailies ? this.state.user.userDailyCounts[0]: null}/5</Badge></ListGroupItem>
                      <ListGroupItem>{this.state.user.userDailies ? this.state.user.userDailies[1]: null} <Badge color='info' pill>{this.state.user.userDailies ? this.state.user.userDailyCounts[1]: null}/5</Badge></ListGroupItem>
                      <ListGroupItem>{this.state.user.userDailies ? this.state.user.userDailies[2]: null} <Badge color='info' pill>{this.state.user.userDailies ? this.state.user.userDailyCounts[2]: null}/5</Badge></ListGroupItem>
                    </ListGroup>
              </Card>
            </Col>
            <Col xs="12" md="6">
              <Card>
                <CardHeader><Badge pill>{this.state.opponent.opponentDailies ? this.state.opponent.opponentDailyCounts.reduce((acc, val)=> acc + val ) : null}/15</Badge> {opponentName} Dailies:</CardHeader>
                  <ListGroup>
                    <ListGroupItem>{this.state.opponent.opponentDailies ? this.state.opponent.opponentDailies[0]: null} <Badge color='info' pill>{this.state.opponent.opponentDailies ? this.state.opponent.opponentDailyCounts[0]: null}/5</Badge></ListGroupItem>
                    <ListGroupItem>{this.state.opponent.opponentDailies ? this.state.opponent.opponentDailies[1]: null} <Badge color='info' pill>{this.state.opponent.opponentDailies ? this.state.opponent.opponentDailyCounts[1]: null}/5</Badge></ListGroupItem>
                    <ListGroupItem>{this.state.opponent.opponentDailies ? this.state.opponent.opponentDailies[2]: null} <Badge color='info' pill>{this.state.opponent.opponentDailies ? this.state.opponent.opponentDailyCounts[2]: null}/5</Badge></ListGroupItem>
                  </ListGroup>
              </Card>
            </Col>
          </Row>
          { u2_accepted && !u1_confirmed && end_time > this.props.today && this.props.authState.id === u1_id ?
            <FormGroup>
              <Button
                onClick={(event)=>{
                  event.preventDefault()
                  this.props.confirmDuel(this.props.authState.id, id)
                  }}
                color="info">
                Accept Your Opponent's Terms
              </Button>
              {" "}
              <Button
                onClick={(event)=>{
                  event.preventDefault()
                  this.props.rejectDuel(this.props.authState.id, id)
                  }}
                color="secondary">
                Reject This Charlatan's Duel
              </Button>
            </FormGroup> :
            null}
            { (u2_accepted && !u1_confirmed && end_time > this.props.today && !(this.props.authState.id === u1_id)) ||
              (!u2_accepted && end_time > this.props.today && !(this.props.authState.id === u2_id)) ?
              <div>
                <Alert color="warning">Awaiting Opponents Response</Alert>
              </div>
             : null}
          { !u2_accepted && end_time > this.props.today && this.props.authState.id === u2_id ?
            <U2AcceptDuel authState={this.props.authState} duelId={id} opponent={opponentName}/>
            : null }
      </Container>
    )
  }
}

const mapStateToProps = ({dailies}) => {
 return {dailies}
}

const mapDispatchToProps = (dispatch) => {
 return bindActionCreators({rejectDuel, confirmDuel}, dispatch)
}

export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(Duel));
