import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AddClassForm from './AddClassForm.js'
import { GoogleLogout } from 'react-google-login';

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onLogout: false,
    }
    if (props.onLogout) {
      this.state.onLogout = props.onLogout;
    }
  }

  render() {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">bunkalog</NavbarBrand>
        <Nav>
          <NavItem>
						<UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Add Class
              </DropdownToggle>
              <DropdownMenu right>
                <AddClassForm />
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavItem>
          <NavItem>
            <GoogleLogout
              clientId="724928841047-qeoov5rpo41njs7e09moms868eknu2fp.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={() => this.state.onLogout()}
            />
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
  }
}

export default NavBar;
