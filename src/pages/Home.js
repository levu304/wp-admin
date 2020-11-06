import React from "react";
import { Redirect } from "react-router-dom";
import { POSTS } from "../routes";

export default () => {
  return <Redirect to={POSTS} />;
};
