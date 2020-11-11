import React, { Fragment, memo } from "react";
import { useLocation, NavLink, Link } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import {
  POSTS,
  MEDIA,
  PAGES,
  COMMENTS,
  USERS,
  POST_NEW,
  CATEGORIES,
  TAGS,
  USER_NEW,
  USER_DELETE,
  PROFILE,
  MEDIA_NEW,
  PAGE_NEW,
} from "../routes";
import {
  FaBookReader,
  FaImages,
  FaComments,
  FaUsers,
  FaCopy,
} from "react-icons/fa";
import styled from "styled-components";

const Sidebar = styled(Nav)`
  & a:hover,
  & .dropright .dropdown-item:focus,
  & .dropright .dropdown-item:hover {
    color: var(--primary) !important;
  }

  & a.active:hover {
    color: white !important;
  }

  & .dropright .dropdown-menu {
    background: var(--dark);
    border-radius: 0;
  }

  & .dropright .dropdown-item:focus,
  & .dropright .dropdown-item:hover {
    background-color: transparent;
  }

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
      {pathname === POSTS ||
      pathname === POST_NEW ||
      pathname === CATEGORIES ||
      pathname === TAGS ? (
        <Nav.Item>
          <NavLink
            to={POSTS}
            activeClassName="active"
            className="nav-link d-flex align-items-center px-4 text-white bg-primary"
          >
            <FaImages className="mr-2" />
            Posts
          </NavLink>

          <Nav activeKey={pathname} className="flex-column bg-secondary">
            <Nav.Item>
              <NavLink
                to={POSTS}
                activeClassName="active"
                className="nav-link d-flex align-items-center px-4 text-white"
              >
                <small>
                  <span
                    className={
                      pathname === POSTS ? "font-weight-bold" : undefined
                    }
                  >
                    All Posts
                  </span>
                </small>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to={POST_NEW}
                activeClassName="active"
                className="nav-link d-flex align-items-center px-4 text-white"
              >
                <small>
                  <span
                    className={
                      pathname === POST_NEW ? "font-weight-bold" : undefined
                    }
                  >
                    Add new
                  </span>
                </small>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to={CATEGORIES}
                activeClassName="active"
                className="nav-link d-flex align-items-center px-4 text-white"
              >
                <small>
                  <span
                    className={
                      pathname === CATEGORIES ? "font-weight-bold" : undefined
                    }
                  >
                    Categories
                  </span>
                </small>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to={TAGS}
                activeClassName="active"
                className="nav-link d-flex align-items-center px-4 text-white"
              >
                <small>
                  <span
                    className={
                      pathname === TAGS ? "font-weight-bold" : undefined
                    }
                  >
                    Tags
                  </span>
                </small>
              </NavLink>
            </Nav.Item>
          </Nav>
        </Nav.Item>
      ) : (
        <NavDropdown
          drop="right"
          className={
            pathname === POSTS ||
            pathname === POST_NEW ||
            pathname === CATEGORIES ||
            pathname === TAGS
              ? "bg-primary"
              : undefined
          }
          title={
            <Fragment>
              <FaBookReader className="mr-2" /> Posts
            </Fragment>
          }
        >
          <NavDropdown.Item className="text-white" as={Link} to={POSTS}>
            All Posts
          </NavDropdown.Item>
          <NavDropdown.Item className="text-white" as={Link} to={POST_NEW}>
            Add new
          </NavDropdown.Item>
          <NavDropdown.Item className="text-white" as={Link} to={CATEGORIES}>
            Categories
          </NavDropdown.Item>
          <NavDropdown.Item className="text-white" as={Link} to={TAGS}>
            Tags
          </NavDropdown.Item>
        </NavDropdown>
      )}

      {pathname === MEDIA || pathname === MEDIA_NEW ? (
        <Nav.Item>
          <NavLink
            to={MEDIA}
            activeClassName="active"
            className="nav-link d-flex align-items-center px-4 text-white bg-primary"
          >
            <FaImages className="mr-2" />
            Media
          </NavLink>

          <Nav activeKey={pathname} className="flex-column bg-secondary">
            <Nav.Item>
              <NavLink
                to={MEDIA}
                activeClassName="active"
                className="nav-link d-flex align-items-center px-4 text-white"
              >
                <small>
                  <span
                    className={
                      pathname === MEDIA ? "font-weight-bold" : undefined
                    }
                  >
                    Library
                  </span>
                </small>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to={MEDIA_NEW}
                activeClassName="active"
                className="nav-link d-flex align-items-center px-4 text-white"
              >
                <small>
                  <span
                    className={
                      pathname === MEDIA_NEW ? "font-weight-bold" : undefined
                    }
                  >
                    Add new
                  </span>
                </small>
              </NavLink>
            </Nav.Item>
          </Nav>
        </Nav.Item>
      ) : (
        <NavDropdown
          drop="right"
          className={
            pathname === MEDIA || pathname === MEDIA_NEW
              ? "bg-primary"
              : undefined
          }
          title={
            <Fragment>
              <FaImages className="mr-2" /> Media
            </Fragment>
          }
        >
          <NavDropdown.Item className="text-white" as={Link} to={MEDIA}>
            Library
          </NavDropdown.Item>
          <NavDropdown.Item className="text-white" as={Link} to={MEDIA_NEW}>
            Add new
          </NavDropdown.Item>
        </NavDropdown>
      )}

      {pathname === PAGES || pathname === PAGE_NEW ? (
        <Nav.Item>
          <NavLink
            to={PAGES}
            activeClassName="active"
            className="nav-link d-flex align-items-center px-4 text-white bg-primary"
          >
            <FaCopy className="mr-2" />
            Pages
          </NavLink>

          <Nav activeKey={pathname} className="flex-column bg-secondary">
            <Nav.Item>
              <NavLink
                to={PAGES}
                activeClassName="active"
                className="nav-link d-flex align-items-center px-4 text-white"
              >
                <small>
                  <span
                    className={
                      pathname === PAGES ? "font-weight-bold" : undefined
                    }
                  >
                    All Pages
                  </span>
                </small>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to={PAGE_NEW}
                activeClassName="active"
                className="nav-link d-flex align-items-center px-4 text-white"
              >
                <small>
                  <span
                    className={
                      pathname === PAGE_NEW ? "font-weight-bold" : undefined
                    }
                  >
                    Add new
                  </span>
                </small>
              </NavLink>
            </Nav.Item>
          </Nav>
        </Nav.Item>
      ) : (
        <NavDropdown
          drop="right"
          className={
            pathname === PAGES || pathname === PAGE_NEW
              ? "bg-primary"
              : undefined
          }
          title={
            <Fragment>
              <FaCopy className="mr-2" /> Pages
            </Fragment>
          }
        >
          <NavDropdown.Item className="text-white" as={Link} to={PAGES}>
            All Pages
          </NavDropdown.Item>
          <NavDropdown.Item className="text-white" as={Link} to={PAGE_NEW}>
            Add new
          </NavDropdown.Item>
        </NavDropdown>
      )}

      <Nav.Item className={pathname === COMMENTS ? "bg-primary" : undefined}>
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

      {pathname === USERS ||
      pathname === USER_NEW ||
      pathname === PROFILE ||
      pathname === USER_DELETE ? (
        <Nav.Item>
          <NavLink
            to={USERS}
            activeClassName="active"
            className="nav-link d-flex align-items-center px-4 text-white bg-primary"
          >
            <FaUsers className="mr-2" />
            Users
          </NavLink>

          <Nav activeKey={pathname} className="flex-column bg-secondary">
            <Nav.Item>
              <NavLink
                to={USERS}
                activeClassName="active"
                className="nav-link d-flex align-items-center px-4 text-white"
              >
                <small>
                  <span
                    className={
                      pathname === USERS || pathname === USER_DELETE
                        ? "font-weight-bold"
                        : undefined
                    }
                  >
                    All Users
                  </span>
                </small>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to={USER_NEW}
                activeClassName="active"
                className="nav-link d-flex align-items-center px-4 text-white"
              >
                <small>
                  <span
                    className={
                      pathname === USER_NEW ? "font-weight-bold" : undefined
                    }
                  >
                    Add new
                  </span>
                </small>
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to={PROFILE}
                activeClassName="active"
                className="nav-link d-flex align-items-center px-4 text-white"
              >
                <small>
                  <span
                    className={
                      pathname === PROFILE ? "font-weight-bold" : undefined
                    }
                  >
                    Your Profile
                  </span>
                </small>
              </NavLink>
            </Nav.Item>
          </Nav>
        </Nav.Item>
      ) : (
        <NavDropdown
          drop="right"
          className={
            pathname === USERS || pathname === USER_NEW || pathname === PROFILE
              ? "bg-primary"
              : undefined
          }
          title={
            <Fragment>
              <FaComments className="mr-2" /> Users
            </Fragment>
          }
        >
          <NavDropdown.Item className="text-white" as={Link} to={USERS}>
            All Users
          </NavDropdown.Item>
          <NavDropdown.Item className="text-white" as={Link} to={USER_NEW}>
            Add new
          </NavDropdown.Item>
          <NavDropdown.Item className="text-white" as={Link} to={PROFILE}>
            Your Profile
          </NavDropdown.Item>
        </NavDropdown>
      )}
    </Sidebar>
  );
});
