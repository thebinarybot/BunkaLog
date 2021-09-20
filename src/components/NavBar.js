import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { GoogleLogout } from 'react-google-login';
import config from '../config.js';

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

function NavBar(props)
{
  console.log('Function Call: NavBar.js: render()');
  console.log('Variable Value Check: NavBar.js: props.isUserLoggedIn ' + props.isUserLoggedIn);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href={config.BASEPATH}>bunkalog</NavbarBrand>
        { (props.isUserLoggedIn) &&
          <Nav>
            <NavItem>
              <NavLink href={config.BASEPATH + "#/add-new-class"}>Add New Class</NavLink>
            </NavItem>
            <NavItem>
              <GoogleLogout
                clientId="724928841047-qeoov5rpo41njs7e09moms868eknu2fp.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={() => props.onLogout()}
              />
            </NavItem>
          </Nav>
        }
      </Navbar>
    </div>
  );
}

export default NavBar;
