import { memo } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { load } from "react-cookies";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuthentication } from "../hooks/auth";
import { PROFILE } from "../routes";

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
  const user = load("user");

  const { logout } = useAuthentication();

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
          <NavDropdown title={user.name} alignRight size="sm">
            <NavDropdown.Item
              as={Link}
              to={{
                pathname: PROFILE,
                state: { user },
              }}
            >
              Edit profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </CustomNavbar>
  );
});
