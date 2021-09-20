import React from 'react';

import axios from 'axios';
import config from './config.js';
import Cookies from 'js-cookie';

import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';

import LoginPageView from './views/LoginPageView.js';
import HomePageView from './views/HomePageView.js';
import AddNewClassView from './views/AddNewClassForm.js';

import NavBar from './components/NavBar.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: JSON.parse(localStorage.getItem('isUserLoggedIn')) || false,
    };
  }


  loginSucceed(response)
  {
    console.log('Function Call: App.js: loginSucceed()');
    console.log(response);

    const requestOption = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      url: config.PROXY_URL + '/login',
      data: {response}
    }

    axios(requestOption)
      .then(function (response) {
        //console.log(response.data);
        const session_id = response.data;
        console.log(session_id);
        //console.log('response' + response);
        Cookies.set('bunkalog_session_id', session_id);
        
        this.setState({isUserLoggedIn: true});
        localStorage.setItem('isUserLoggedIn', true);
      }.bind(this))
/*      .then(data => {
        console.log('data ' + data);
      })*/
      .catch(function (error) {
        console.log(error);
      });
  }

  logoutSucceed()
  {
    console.log('Function Call: App.js: logoutSucceed()');

    this.setState({isUserLoggedIn: false});
    localStorage.setItem('isUserLoggedIn', false);

    const requestOption = {
      method: 'POST',
      params: {'session_id': Cookies.get('bunkalog_session_id')},
      url: config.PROXY_URL + '/logout'
    }

    axios(requestOption)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render()
  {
    console.log('Function Call: App.js: render()');

    const isUserLoggedIn = this.state.isUserLoggedIn;
    console.log('Variable Value Check: App.js: isUserLoggedIn ' + isUserLoggedIn);

    return (
      <React.Fragment>
      <NavBar isUserLoggedIn={isUserLoggedIn} onLogout={() => this.logoutSucceed()} />

      <Router basename="/">
        <Switch>
          <Route path="/login">
            {
              (isUserLoggedIn &&
                <Redirect to="/" />)
            }
            <LoginPageView onSuccessfulLogin={(response) => this.loginSucceed(response)} />
          </Route>
          <Route path="/add-new-class">
            <AddNewClassView />
          </Route>
          <Route path="/">
            { (!isUserLoggedIn) &&
              <Redirect to="login" />
            }
            <HomePageView />
          </Route>
        </Switch>
      </Router>
      </React.Fragment>
    );
  }
}


export default App;
