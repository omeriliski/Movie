import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { Search } from '../Search';
import './navbar.css';

export const MyNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="pl-5" light expand="md" fixed="top" style={{ backgroundColor: '#123c69' }}>

        {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/"><span className="style-text font-weight-bold">Home</span> </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <span className="style-text font-weight-bold">Discover</span>
              </DropdownToggle>
              <DropdownMenu left>
                <DropdownItem>
                  Years of Movies
                </DropdownItem>
                <DropdownItem>
                  Types of Movies
                </DropdownItem>
                <DropdownItem />
                <DropdownItem>
                  Popular People's Movies
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink className="style-text" href="./discover">
                <span className="style-text font-weight-bold">Privacy Policy</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/components/"><span
                className="style-text font-weight-bold">About</span>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <Search />
        <img
          width="70" height="70"
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" />
      </Navbar>
    </div>
  );
}