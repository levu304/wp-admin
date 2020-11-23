import { Fragment, memo } from "react";
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
  USER_EDIT,
  PROFILE,
  MEDIA_NEW,
  PAGE_NEW,
  CATEGORY_EDIT,
} from "../routes";
import {
  FaBookReader,
  FaImages,
  FaComments,
  FaUsers,
  FaUser,
  FaCopy,
} from "react-icons/fa";
import styled from "styled-components";
import { load } from "react-cookies";

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
  const user = load("user");

  return (
    <Sidebar activeKey={pathname} className="flex-column">
      <hr />
      {[POSTS, POST_NEW, CATEGORIES, CATEGORY_EDIT, TAGS].includes(pathname) ? (
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
                      [CATEGORIES, CATEGORY_EDIT].includes(pathname)
                        ? "font-weight-bold"
                        : undefined
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
            [POSTS, POST_NEW, CATEGORIES, TAGS].includes(pathname)
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

      {[MEDIA, MEDIA_NEW].includes(pathname) ? (
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
            [MEDIA, MEDIA_NEW].includes(pathname) ? "bg-primary" : undefined
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

      {[PAGES, PAGE_NEW].includes(pathname) ? (
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
            [PAGES, PAGE_NEW].includes(pathname) ? "bg-primary" : undefined
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

      {typeof user !== "undefined" &&
      typeof user["capabilities"] !== "undefined" &&
      typeof user.capabilities["list_users"] === "undefined" ? (
        <Nav.Item className={pathname === PROFILE ? "bg-primary" : undefined}>
          <NavLink
            to={{
              pathname: PROFILE,
              state: {
                user,
              },
            }}
            activeClassName="active"
            className="nav-link d-flex align-items-center px-4 text-white"
          >
            <FaUser className="mr-2" />
            Profile
          </NavLink>
        </Nav.Item>
      ) : [USERS, USER_NEW, PROFILE, USER_DELETE, USER_EDIT].includes(
          pathname
        ) ? (
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
                      [USERS, USER_DELETE, USER_EDIT].includes(pathname)
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
                to={{
                  pathname: PROFILE,
                  state: {
                    user,
                  },
                }}
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
            [USERS, USER_NEW, PROFILE].includes(pathname)
              ? "bg-primary"
              : undefined
          }
          title={
            <Fragment>
              <FaUsers className="mr-2" /> Users
            </Fragment>
          }
        >
          <NavDropdown.Item className="text-white" as={Link} to={USERS}>
            All Users
          </NavDropdown.Item>
          <NavDropdown.Item className="text-white" as={Link} to={USER_NEW}>
            Add new
          </NavDropdown.Item>
          <NavDropdown.Item
            className="text-white"
            as={Link}
            to={{
              pathname: PROFILE,
              state: {
                user,
              },
            }}
          >
            Your Profile
          </NavDropdown.Item>
        </NavDropdown>
      )}
    </Sidebar>
  );
});
