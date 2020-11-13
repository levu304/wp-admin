import React, { useMemo } from "react";
import { usePosts } from "../hooks/posts";
import { useLocation } from "react-router-dom";
import { paramsToObject } from "../common";

export default () => {
  const { search } = useLocation();
  const defaultParams = { context: "edit" };
  const params = useMemo(
    () =>
      search !== ""
        ? { ...defaultParams, ...paramsToObject(search) }
        : defaultParams,
    [search]
  );
  const { posts } = usePosts(params);
  console.log(posts);
  return null;
};
