import { useEffect, useState } from "react";
import API from "../api";
import cookie from "react-cookies";
import { useAuthentication } from "./auth";

export const useUsers = (params) => {
  const Authorization = cookie.load("Authorization");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {logout} = useAuthentication();

  const getUsers = (params) => {
    setIsLoading(true);
    API.get("/users", {
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
          setUsers(data);
        }
      })
      .catch((error) => {
        const { data, status } = error.response;
        switch (status) {
          case 401:
            logout();
            break;
          default:
            console.log(data)
            break;
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getUsers(params);
  }, [params]);

  return { users, isLoading, getUsers };
};
