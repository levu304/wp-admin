import { useDispatch, useSelector } from "react-redux";
import { load } from "react-cookies";
import API from "../api";
import { setTags } from "../redux/actions/tag";
import { useAuthentication } from "./auth";

export const useTags = () => {
  const Authorization = load("Authorization");
  const dispatch = useDispatch();
  const { logout } = useAuthentication();

  const { tags } = useSelector((state) => state.tag);

  const getTags = (params) => {
    API.get("/tags", {
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
          dispatch(setTags(data));
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

  const createCategory = (params, callback) => {
    API.post("/categories", null, {
      headers: {
        Authorization,
      },
      params,
    })
      .then((response) => {
        console.log(response.data);
        callback();
      })
      .catch((error) => {
        callback();
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

  return { tags, getTags, createCategory };
};
