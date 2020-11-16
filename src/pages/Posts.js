import React from "react";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { POST_NEW } from "../routes";
import PostsList from "../components/PostsList";

export default () => {
  return (
    <Main>
      <div className="d-flex flex-row align-items-center">
        <PageTitle title="Posts" />
        <Button
          as={Link}
          to={POST_NEW}
          size="sm"
          variant="outline-primary"
          className="ml-3 font-weight-bold"
        >
          Add new
        </Button>
      </div>

      <PostsList />
    </Main>
  );
};
