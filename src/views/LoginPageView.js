import React from 'react';
import PropTypes from 'prop-types';
import './LoginPageView.css';

import {GoogleLogin} from 'react-google-login';


/**
 * The layout shown to a user who is not logged in
 */
class LoginPageView extends React.Component {
  /**
   * @param {Props} props Expected to recieve a callback function to notify
   *    successful login
   */
  constructor(props) {
    super(props);
    this.state = {
      onSuccessfulLogin: props.onSuccessfulLogin,
    };
  }


  /**
   * @return {string} LoginPageView's HTML
   */
  render() {
    return (
      <div className="flex-container">
        <GoogleLogin
          // eslint-disable-next-line max-len
          clientId="724928841047-qeoov5rpo41njs7e09moms868eknu2fp.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={(response) => {
            this.state.onSuccessfulLogin(response);
          }}
        />
      </div>
    );
  }
}

LoginPageView.propTypes={
  onSuccessfulLogin: PropTypes.func,
};

export default LoginPageView;
