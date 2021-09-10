import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { GoogleLogin } from 'react-google-login';

import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onLoginSuccess: props.onLoginSuccess,
    }
  }

  render() {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">bunkalog</NavbarBrand>
      </Navbar>

      <GoogleLogin
        clientId="724928841047-qeoov5rpo41njs7e09moms868eknu2fp.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={(response) => {this.state.onLoginSuccess(response)}}
      />
    </div>
  );
  }
}

export default LoginPage;
