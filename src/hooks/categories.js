import { useDispatch, useSelector } from "react-redux";
import cookie from "react-cookies";
import API from "../api";
import { setCategories } from "../redux/actions/category";
import { useAuthentication } from "./auth";

export const useCategories = () => {
  const Authorization = cookie.load("Authorization");
  const dispatch = useDispatch();
  const { logout } = useAuthentication();

  const { categories } = useSelector((state) => state.category);

  const getCatetories = (params) => {
    API.get("/categories", {
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
          dispatch(setCategories(data));
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
        console.log(response.data)
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
  }

  return { categories, getCatetories, createCategory };
};
