import React, { Fragment, memo } from "react";
import { useLocation, NavLink, Link } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { POSTS, MEDIA, PAGES, COMMENTS, USERS, POST_NEW } from "../routes";
import {
  FaCopy,
  FaBookReader,
  FaImages,
  FaComments,
  FaUsers,
} from "react-icons/fa";
import styled from "styled-components";

const Sidebar = styled(Nav)`
  & .dropright.nav-item .nav-link {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    display: flex;
    align-items: center;
    color: white;
  }

  & .dropright.nav-item .nav-link::after {
    display: none;
  }
`;

export default memo(() => {
  const { pathname } = useLocation();

  return (
    <Sidebar activeKey={pathname} className="flex-column">
      <hr />
      <NavDropdown
        drop="right"
        className={pathname === POSTS || pathname === POST_NEW ? "bg-primary" : ""}
        title={
          <Fragment>
            <FaBookReader className="mr-2" /> Posts
          </Fragment>
        }
      >
        <NavDropdown.Item as={Link} to={POSTS}>
          All Posts
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to={POST_NEW}>
          Add new
        </NavDropdown.Item>
      </NavDropdown>
      <Nav.Item className={pathname === MEDIA ? "bg-primary" : ""}>
        <NavLink
          to={MEDIA}
          activeClassName="active"
          className="nav-link d-flex align-items-center px-4 text-white"
        >
          <FaImages className="mr-2" />
          Media
        </NavLink>
      </Nav.Item>
      <Nav.Item className={pathname === PAGES ? "bg-primary" : ""}>
        <NavLink
          to={PAGES}
          activeClassName="active"
          className="nav-link d-flex align-items-center px-4 text-white"
        >
          <FaCopy className="mr-2" />
          Pages
        </NavLink>
      </Nav.Item>
      <Nav.Item className={pathname === COMMENTS ? "bg-primary" : ""}>
        <NavLink
          to="/comments"
          activeClassName="active"
          className="nav-link d-flex align-items-center px-4 text-white"
        >
          <FaComments className="mr-2" />
          Comments
        </NavLink>
      </Nav.Item>
      <hr />
      <Nav.Item className={pathname === USERS ? "bg-primary" : ""}>
        <NavLink
          to="/users"
          activeClassName="active"
          className="nav-link d-flex align-items-center px-4 text-white"
        >
          <FaUsers className="mr-2" />
          Users
        </NavLink>
      </Nav.Item>
    </Sidebar>
  );
});
