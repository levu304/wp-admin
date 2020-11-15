import React, { Fragment, memo } from "react";
import { Link } from "react-router-dom";
import { USERS } from "../routes";

export default memo(({ roles }) => {
  return (
    <div>
      <Link to={USERS}>
        <small>All</small>
      </Link>
      {roles.map(({ name }, index) =>
        index !== roles.length ? (
          <Fragment key={index}>
            <span className="mx-2">{" | "}</span>
            <Link to={USERS + `?roles[]=${name}`}>
              <small>{name.charAt(0).toUpperCase() + name.slice(1)}</small>
            </Link>
          </Fragment>
        ) : (
          <Link key={index} to={USERS + `?roles[]=${name}`}>
            <small>{name.charAt(0).toUpperCase() + name.slice(1)}</small>
          </Link>
        )
      )}
    </div>
  );
});
