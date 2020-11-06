import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import Wrapper from "../templates/Wrapper";
import { SIGN_IN } from "../routes";
import cookie from "react-cookies";

export default ({ component: Component, ...rest }) => {
  const { pathname } = useLocation();
  const token = cookie.load("token");

  return (
    <Route
      {...rest}
      render={(props) =>
        typeof token !== "undefined" && token && token !== "" ? (
          <Wrapper>
            <Component {...props} />
          </Wrapper>
        ) : (
          <Redirect
            to={{
              pathname: SIGN_IN,
              state: {
                fromPath: pathname,
              },
            }}
          />
        )
      }
    />
  );
};
