import React from 'react';
import './LoginPageView.css';

import { GoogleLogin } from 'react-google-login';



class LoginPageView extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      onSuccessfulLogin: props.onSuccessfulLogin
    }
  }

  render() {
    return (
      <div className="flex-container">
        <GoogleLogin
          clientId="724928841047-qeoov5rpo41njs7e09moms868eknu2fp.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={(response) => {this.state.onSuccessfulLogin(response)}}
        />
      </div>
    );
  }
}

export default LoginPageView;
