import React from 'react';
import { BrowserRouter, Switch, Route,
  // Redirect
} from 'react-router-dom';
import { Button, Form, FormGroup, Alert, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin, userSignup } from '../actions/auth';

class Login extends React.Component {
 state = {
   email: '',
   password: '',
   signupForm: false,
   first_name: '',
   last_name: '',
 };

 handleLogin = event => {
   event.preventDefault();
   console.log('hi');
   this.props.userLogin(this.state, this.props.history);
   this.setState(this.state);
 };

 handleSignup = event => {
   event.preventDefault();
   this.props.userSignup (this.state, this.props.history);
   // this.setState(this.state);
 }

 render () {
   const nameStyle = {
     display: 'flex',
     justifyContent: 'space-evenly',
     alignItems: 'center',
   }
   return (
     <div className="welcome-container">
       <Modal className="welcome-modal" isOpen centered>
         <Form onSubmit={this.handleLogin}>
           {!this.state.signupForm ? (
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
         )
           : (
             // Signup Form
           <ModalBody>
             Create Account
             <FormGroup style={nameStyle}>
               <Input
                 type="first_name"
                 name="first_name"
                 id="first_name"
                 placeholder="First Name"
                 value={this.state.first_name}
                 onChange={event => this.setState({first_name: event.target.value})}
               />
               <Input
                 type="last_name"
                 name="last_name"
                 id="last_name"
                 placeholder="Last Name"
                 value={this.state.last_name}
                 onChange={event => this.setState({last_name: event.target.value})}
               />
             </FormGroup>
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
           </ModalBody>
           ) }
           <ModalFooter>
             <Button type="submit" color="info">
               {this.state.signupForm ? 'Create User' : 'Login'}
             </Button>
             <a href="/signup">
              {this.state.signupForm ? 'Already a member?' : 'Not a member?'}
             </a>
           </ModalFooter>
         </Form>
       </Modal>
     </div>
   );
 };
};

const mapStateToProps = state => ({showLoginError: state.auth.showLoginError});

const mapDispatchToProps = dispatch => (bindActionCreators({userLogin, userSignup}, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Login);
