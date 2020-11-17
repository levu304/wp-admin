import { useEffect } from "react";
import API from "../api";
import cookie from "react-cookies";
import { useAuthentication } from "./auth";
import { useDispatch, useSelector } from "react-redux";
import { setLanguages } from "../redux/actions/settings";

export const useSettings = () => {
  const Authorization = cookie.load("Authorization");
  const { logout } = useAuthentication();
  const dispatch = useDispatch();
  const { languages } = useSelector((state) => state.settings);

  const getLanguages = () => {
    API.get("/settings/languages", {
      headers: {
        Authorization,
      },
    })
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          dispatch(setLanguages(data));
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

  useEffect(() => {
    if (languages.length === 0) {
      getLanguages();
    }
  }, [languages]);

  return { languages };
};

export const useClickOutside = (ref, callback) => {
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback(event);
    }
  };
};
