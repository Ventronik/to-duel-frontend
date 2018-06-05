import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { getUser } from './actions/auth'
import { fetchDailies, add } from './actions/dailies';
import { AuthenticatedRoute } from './helpers';

import './styles/App.css';
import Header from './components/Header';
import Login from './components/Login';

class App extends React.Component {
  componentDidMount = () => {
    this.props.fetchDailies()
    console.log('load')
  }
  render() {
    return (
      <div className="App">
        <Header />

        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
        <p>
          {console.log(this.props.dailies)}
        </p>
      </div>
    );
  }
}

const mapStateToProps = ( {counter, dailies} ) => {
  return {counter, dailies}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchDailies, add}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
