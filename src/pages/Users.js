import React from "react";
import UsersList from "../components/UsersList";
import PageTitle from "../components/PageTitle";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { USER_NEW } from "../routes";

export default () => {
  return (
    <div>
      <div className="d-flex flex-row align-items-center">
        <PageTitle title="Users" />
        <Button
          as={Link}
          to={USER_NEW}
          size="sm"
          variant="outline-primary"
          className="ml-3 font-weight-bold"
        >
          Add new
        </Button>
      </div>
      <UsersList />
    </div>
  );
};
