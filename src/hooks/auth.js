import { remove, load } from "react-cookies";
import API from "../api";
import { SIGN_IN } from "../routes";
import { useHistory } from "react-router-dom";

export const useAuthentication = () => {
  const { replace } = useHistory();

  const login = ({ username, password, remember }, callback) => {
    API.post("/login", {
      user_login: username,
      user_password: password,
      remember,
    })
      .then((response) => {
        const {
          status,
          data: { data },
        } = response;
        if (status === 200) {
          callback(data);
        }
      })
      .catch((error) => {
        callback(error.response.data, true);
      });
  };

  const logout = () => {
    const Authorization = load("Authorization");
    API.get("/logout", {
      headers: {
        Authorization,
      },
    })
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          remove("Authorization", { path: "/" });
          remove("user", { path: "/" });
        }
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => replace(SIGN_IN, "urlhistory"));
  };

  return { logout, login };
};
