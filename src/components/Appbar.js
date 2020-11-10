import React, { memo } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {useAuthentication} from '../hooks/auth'

const CustomNavbar = styled(Navbar)`
  & .dropdown-menu {
    top: 130%;
    border-radius: 0;
  }

  &.navbar .dropdown-toggle:after,
  &.navbar .dropdown-toggle:before {
    display: none;
  }

  & .navbar-nav .nav-link {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export default memo(() => {
  const {
    data: { display_name },
  } = cookie.load("user");

  const {logout} = useAuthentication()

  return (
    <CustomNavbar bg="dark" variant="dark" expand="lg">
      <Nav className="mr-auto">
        <NavDropdown title="Dropdown" size="sm">
          <NavDropdown.Item href="#action/3.1">Visit Site</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="New" size="sm">
          <NavDropdown.Item href="#action/3.1">Visit Site</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown title={display_name} alignRight size="sm">
            <Link to="/profile" className="dropdown-item">
              Edit profile
            </Link>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </CustomNavbar>
  );
});
