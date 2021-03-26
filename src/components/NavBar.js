import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AddClassForm from './AddClassForm.js'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">bunkalog</NavbarBrand>
        <NavbarToggler onClick={toggle} />
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

export default NavBar;
