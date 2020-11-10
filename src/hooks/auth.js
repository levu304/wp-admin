import { useState } from "react";
import cookie from "react-cookies";
import API from "../api";
import { SIGN_IN, LANDING } from "../routes";
import { useHistory } from "react-router-dom";

export const useAuthentication = () => {
  const { replace } = useHistory();

  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null)

  const login = (user_login, user_password, remember) => {
    API.post("/login", {
      user_login,
      user_password,
      remember,
    })
      .then((response) => {
        setIsSubmit(false);
        const {
          status,
          data: { data },
        } = response;
        if (status === 200) {
          const { user, authorization } = data;
          cookie.save("Authorization", authorization, { path: "/" });
          cookie.save("user", user, { path: "/" });
          replace(LANDING, "urlhistory");
        }
      })
      .catch((error) => {
        setIsSubmit(false);
        const { data, status } = error.response;
        switch (status) {
          case 401:
            const { message } = data.data[0];
            setError(message);
            break;
          default:
            break;
        }
      });
  };

  const logout = () => {
    const Authorization = cookie.load("Authorization");
    API.get("/logout", {
      headers: {
        Authorization,
      },
    })
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          cookie.remove("Authorization", { path: "/" });
          cookie.remove("user", { path: "/" });
        }
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => replace(SIGN_IN, "urlhistory"));
  };

  return { logout, login, isSubmit, error };
};
