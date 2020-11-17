import { useDispatch, useSelector } from "react-redux";
import cookie from "react-cookies";
import API from "../api";
import { setCategories } from "../redux/actions/category";

export const useCategories = () => {
  const Authorization = cookie.load("Authorization");
  const dispatch = useDispatch();
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
        console.log(error.response);
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

  return { categories, getCatetories };
};
