import { useEffect, useState } from "react";
import API from "../api";
import cookie from "react-cookies";
import { useAuthentication } from "./auth";
import { useDispatch, useSelector } from "react-redux";
import { setRoles } from "../redux/actions/role";

export const useRoles = () => {
  const Authorization = cookie.load("Authorization");
  const user = cookie.load("user");
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuthentication();
  const { roles } = useSelector((state) => state.role);
  const dispatch = useDispatch();

  const getRoles = () => {
    setIsLoading(true);
    API.get("/roles", {
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
          dispatch(setRoles(data));
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
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (user.roles[0] === "administrator" && roles.length === 0) {
      getRoles();
    }
  }, [roles]);

  return { roles, isLoading };
};
