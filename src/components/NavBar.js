import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import {GoogleLogout} from 'react-google-login';
import config from '../config.js';

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';


/**
 * Defines the navbar component used in the app
 * @param {Props} props Used to know if user is logged in or not. Info is used
 *    to render a logout button when logged in
 * @return {string} NavBar's HTML
 */
function NavBar(props) {
  console.log('Function Call: NavBar.js: render()');
  console.log('Variable Value Check: NavBar.js: props.isUserLoggedIn ' +
    props.isUserLoggedIn);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href={config.BASEPATH}>bunkalog</NavbarBrand>
        { (props.isUserLoggedIn) &&
          <Nav>
            <NavItem>
              <NavLink href={config.BASEPATH + '#/add-new-class'}>
                Add New Class
              </NavLink>
            </NavItem>
            <NavItem>
              <GoogleLogout
                // eslint-disable-next-line max-len
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

/**
 * @prop {Object} propTypes Props passed to the component
 * @prop {bool} propTypes.isUserLoggedIn Indicates the authentication status
 *    of the user
 * @prop {func} propTypes.onLogout Callback function called when user
 *    successfully logs out
 */
NavBar.propTypes={
  isUserLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func,
};

export default NavBar;
