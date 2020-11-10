import { useEffect, useState } from "react";
import API from "../api";
import cookie from "react-cookies";

export const useRoles = () => {
  const Authorization = cookie.load("Authorization");
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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
          setRoles(data);
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
    getRoles();
  }, []);

  return { roles, isLoading, errorMessage };
};
