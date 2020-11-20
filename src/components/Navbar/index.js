import React, { useState } from 'react';
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
import {Search} from '../Search';
import './navbar.css';

export const MyNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="color-nav" light expand="md" fixed="top">
        
        {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="style-text" href="./discover">Discover</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Last Films
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  2020
                </DropdownItem>
                <DropdownItem>
                  2019
                </DropdownItem>
                <DropdownItem />
                <DropdownItem>
                  2018
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="/components/">About us</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <Search onSearched={value=>props.onSearched(value)}/>
        <NavbarText>Simple Text</NavbarText>
      </Navbar>
    </div>
  );
}