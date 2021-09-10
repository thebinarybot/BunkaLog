import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AddClassForm from './AddClassForm.js'

import {
  Navbar,
  NavbarToggler,
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
        </Nav>
      </Navbar>
    </div>
  );
  }
}

export default NavBar;
