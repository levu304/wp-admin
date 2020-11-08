import React, { memo } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
  POSTS,
  MEDIA,
  PAGES,
  COMMENTS,
  USERS
} from "../routes";

export default memo(() => {
  const { pathname } = useLocation();

  return (
    <Nav activeKey={pathname} className="flex-column">
      <hr />
      <Nav.Item className={pathname === POSTS ? "bg-primary" : ""}>
        <NavLink to={POSTS} activeClassName="active" className="nav-link px-4 text-white">
          Posts
        </NavLink>
      </Nav.Item>
      <Nav.Item className={pathname === MEDIA ? "bg-primary" : ""}>
        <NavLink to="/media" activeClassName="active" className="nav-link px-4 text-white">
          Media
        </NavLink>
      </Nav.Item>
      <Nav.Item className={pathname === PAGES ? "bg-primary" : ""}>
        <NavLink to="/pages" activeClassName="active" className="nav-link px-4 text-white">
          Pages
        </NavLink>
      </Nav.Item>
      <Nav.Item className={pathname === COMMENTS ? "bg-primary" : ""}>
        <NavLink to="/comments" activeClassName="active" className="nav-link px-4 text-white">
          Comments
        </NavLink>
      </Nav.Item>
      <hr />
      <Nav.Item className={pathname === USERS ? "bg-primary" : ""}>
        <NavLink to="/users" activeClassName="active" className="nav-link px-4 text-white">
          Users
        </NavLink>
      </Nav.Item>
    </Nav>
  );
});
