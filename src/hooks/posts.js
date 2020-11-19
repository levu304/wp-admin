import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthentication } from "./auth";
import cookie from "react-cookies";
import API from "../api";
import { setAuthors } from "../redux/actions/author";
import { setPostStatuses } from "../redux/actions/post";

export const usePosts = () => {
  const Authorization = cookie.load("Authorization");
  const { logout } = useAuthentication();
  const dispatch = useDispatch();
  const { authors } = useSelector((state) => state.author);
  const { statuses } = useSelector((state) => state.post);
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);

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
            logout();
            break;
          default:
            console.log(data);
            break;
        }
      });
  };

  const getAuthors = () => {
    API.get("/authors", {
      headers: {
        Authorization,
      },
    })
      .then((response) => {
        const {
          status,
          data: { data },
        } = response;
        if (status === 200) {
          dispatch(setAuthors(data));
        }
      })
      .catch((error) => {
        const { data, status } = error.response;
        switch (status) {
          case 401:
            logout();
            break;
          default:
            console.log(data);
            break;
        }
      });
  };

  const getPostStatuses = () => {
    API.get("/post-statuses", {
      headers: {
        Authorization,
      },
    })
      .then((response) => {
        const {
          status,
          data: { data },
        } = response;
        if (status === 200) {
          dispatch(setPostStatuses(data));
        }
      })
      .catch((error) => {
        const { data, status } = error.response;
        switch (status) {
          case 401:
            logout();
            break;
          default:
            console.log(data);
            break;
        }
      });
  };

  const updatePost = (params) => {
    API.post(`/post/${params.id}`, null, {
      headers: {
        Authorization,
      },
      params,
    })
      .then((response) => {
        console.log(response.data);
        const { status } = response;
        if (status === 200) {
          setUpdated(true);
        }
      })
      .catch((error) => {
        const { data, status } = error.response;
        switch (status) {
          case 401:
            logout();
            break;
          default:
            console.log(data);
            break;
        }
      });
  };

  const toggleUpdate = () => setUpdated(!updated);

  return {
    posts,
    authors,
    statuses,
    updated,
    toggleUpdate,
    getPosts,
    getAuthors,
    getPostStatuses,
    updatePost,
  };
};
