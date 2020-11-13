import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cookie from "react-cookies";
import API from "../api";

export const usePosts = (params) => {
  const Authorization = cookie.load("Authorization");
  const [posts, setPosts] = useState([]);

  const getPosts = (params) => {
    API.get("/posts", {
      headers: {
        Authorization,
      },
      params,
    })
      .then((response) => {
        const {
          status,
          data: { data },
        } = response;
        if (status === 200) {
          setPosts(data);
        }
      })
      .catch((error) => {
        const { data, status } = error.response;
        switch (status) {
          case 401:
            // logout();
            break;
          default:
            console.log(data);
            break;
        }
      });
  };

  useEffect(() => {
    if (typeof params !== "undefined") {
      getPosts(params);
    }
  }, []);

  return { posts, getPosts };
};
