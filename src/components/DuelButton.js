import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { bindActionCreators } from 'redux';

import DuelDailySelector from './DuelDailySelector';
import { fetchDuels, addDuel, fetchDuel, fetchOpponents } from '../actions/duels';
import { getUser } from '../actions/auth';
// import withAuthentication from '../helpers/withAuthentication';

class DuelButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      removeSelected: false,
      closeAll: false,
      dailySelector: false,
      value: [],
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  componentDidMount = async () => {
    // if (this.props.authState) {
      this.props.fetchOpponents()
    // }
  }

	handleSelectChange = (value) => {
		const newValue = value.split(',');
	  this.setState(this.state.value.length === 3 ? {value: [this.state.value[0],this.state.value[1],newValue[3]]}: { value: newValue});
  }

  render () {
    const opponents = this.props.duels.opponentList
    const duels = opponents.map((opponent,key) => {
      return (
        <option key={key} value={opponent.id}>{opponent.first_name} {opponent.last_name}</option>
      )
    })

    return (
      <div>
        <Button color="info" onClick={this.toggle}>New Duel</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} >
          <ModalHeader toggle={this.toggle}>Duel Settings</ModalHeader>
          <ModalBody>
            <Form
              onSubmit={(event)=>{
                event.preventDefault()
                this.props.addDuel(this.props.authState.id, event.target.select.value, this.state.value);
                this.setState({value: [], modal: !this.state.modal})
              }}>
              <FormGroup>
                <Label for="select"><h5>Who Has BESMEARCHED Your Honor?</h5></Label>
              <Input type="select" name="select" id="select">
                  {duels}
                </Input>
              </FormGroup>
              <FormGroup>
                <DuelDailySelector dailies={this.props.dailies} handleSelectChange={this.handleSelectChange} value={this.state.value} removeSelected={this.state.removeSelected}/>
              </FormGroup>
            <Button color="danger">Demand Satisfaction!</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = ({duels, duelData, auth, opponentList, dailies}) => {
  return {duels, duelData, auth, opponentList, dailies}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchDuels, fetchDuel, getUser, addDuel, fetchOpponents }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DuelButton);
