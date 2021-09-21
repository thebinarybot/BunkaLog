import React from 'react';

import axios from 'axios';
import config from './config.js';
import Cookies from 'js-cookie';

import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';

import LoginPageView from './views/LoginPageView.js';
import HomePageView from './views/HomePageView.js';
import AddNewClassView from './views/AddNewClassForm.js';

import NavBar from './components/NavBar.js';


/**
 * The main app component
 */
class App extends React.Component {
  /**
   * @param {Props} props No props are expected
   */
  constructor(props) {
    super(props);

    if (localStorage.getItem('isUserLoggedIn') === null) {
      this.state = {
        isUserLoggedIn: false,
      };
      localStorage.setItem('isUserLoggedIn', false);
    } else {
      this.state = {
        isUserLoggedIn: JSON.parse(localStorage.getItem('isUserLoggedIn')),
      };
    }
  }


  /**
   * This function is called after successful authentication with Google to
   *    notify the API server about the authentication
   * @param {GoogleUser} response The response object recieved from Google on
   *    successful authentication
   */
  loginSucceed(response) {
    console.log('Function Call: App.js: loginSucceed()');
    // console.log(response);

    const requestOption = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      url: config.PROXY_URL + '/login',
      data: {response},
    };

    axios(requestOption)
        .then(function(response) {
          // console.log(response.data);
          const sessionId = response.data;
          // console.log(sessionId);
          // console.log('response' + response);
          Cookies.set('bunkalog_session_id', sessionId);

          this.setState({isUserLoggedIn: true});
          localStorage.setItem('isUserLoggedIn', true);
        }.bind(this))
        .catch(function(error) {
          console.log(error);
        });
  }


  /**
   * This function is called after successful logout with Google account. It
   *    notifies the API server of the logout.
   */
  logoutSucceed() {
    console.log('Function Call: App.js: logoutSucceed()');

    this.setState({isUserLoggedIn: false});
    localStorage.setItem('isUserLoggedIn', false);

    const requestOption = {
      method: 'POST',
      params: {'session_id': Cookies.get('bunkalog_session_id')},
      url: config.PROXY_URL + '/logout',
    };

    axios(requestOption)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
  }


  /**
   * Renders the app
   * @return {string} The app's HTML
   */
  render() {
    console.log('Function Call: App.js: render()');

    const isUserLoggedIn = this.state.isUserLoggedIn;
    console.log('Variable Value Check: App.js: isUserLoggedIn ' +
      isUserLoggedIn);

    return (
      <React.Fragment>
        <NavBar isUserLoggedIn={isUserLoggedIn}
          onLogout={() => this.logoutSucceed()} />

        <Router basename="/">
          <Switch>
            <Route path="/login">
              {
                (isUserLoggedIn &&
                <Redirect to="/" />)
              }
              <LoginPageView
                onSuccessfulLogin={(response) => this.loginSucceed(response)} />
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
