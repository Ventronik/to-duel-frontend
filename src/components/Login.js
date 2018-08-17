import React from 'react';
import { Button, Form, FormGroup, Alert, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin } from '../actions/auth';

class Login extends React.Component {
 state = {
   email: '',
   password: '',
   first_name: '',
   last_name: '',
 };

 handleLogin = event => {
   event.preventDefault();
   this.props.userLogin(this.state, this.props.history);
   this.setState(this.state);
 };

 render () {
   return (
     <div className="welcome-container">
       <Modal className="welcome-modal" isOpen centered>
         <Form onSubmit={this.handleLogin}>
           <ModalHeader>Login</ModalHeader>
           <ModalBody>
             <FormGroup>
               <Input
                 type="email"
                 name="email"
                 id="email"
                 placeholder="Email"
                 value={this.state.email}
                 onChange={event => this.setState({email: event.target.value})}
               />
             </FormGroup>
             <FormGroup>
               <Input
                 type="password"
                 name="password"
                 id="password"
                 placeholder="Password"
                 value={this.state.password}
                 onChange={event => this.setState({password: event.target.value})}
               />
             </FormGroup>
             {this.props.showLoginError ? (
               <Alert color="danger">
                 Email or password is incorrect.
               </Alert>
             ) : null}
           </ModalBody>
           <ModalFooter>
             <Button type="submit" color="info"> Login </Button>
             <a href="/signup"> Not a member? </a>
           </ModalFooter>
         </Form>
       </Modal>
     </div>
   )
 };
};

const mapStateToProps = state => ({showLoginError: state.auth.showLoginError});

const mapDispatchToProps = dispatch => (bindActionCreators({userLogin}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Login);
