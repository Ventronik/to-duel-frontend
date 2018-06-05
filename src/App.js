import React from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { getUser } from './actions/auth'
import { fetchDailies, add } from './actions/dailies'

import './styles/App.css';

import logo from './assets/logo.svg';
import Header from './components/Header'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchDailies
  }
  render() {
    return (
      <div className="App">
        <Header />
        <div>
          <button onClick={()=> this.props.add(-5)}> -5 </button>
          <button onClick={()=> this.props.add(-1)}> -1 </button>
        {this.props.counter}
          <button onClick={()=> this.props.add(1)}> +1 </button>
          <button onClick={()=> this.props.add(5)}> +5 </button>
        </div>`
      </div>
    );
  }
}

const mapStateToProps = ( {counter} ) => {
  return {counter}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({add}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
