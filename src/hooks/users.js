import { useEffect, useState } from "react";
import API from "../api";
import cookie from "react-cookies";

export const useUsers = (params) => {
  const Authorization = cookie.load("Authorization");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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
            const { message } = data.data[0];
            setErrorMessage(message);
            break;
          default:
            break;
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getUsers(params);
  }, [params]);

  return { users, isLoading, errorMessage, getUsers };
};
