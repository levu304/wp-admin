import { useEffect, useState } from "react";
import API from "../api";
import cookie from "react-cookies";
import { useAuthentication } from "./auth";
import { useHistory } from "react-router-dom";
import { USERS } from "../routes";

export const useUsers = (params) => {
  const Authorization = cookie.load("Authorization");
  const { push, replace } = useHistory();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hashPassword, setHashPassword] = useState(null);
  const [updated, setUpdated] = useState(false);

  const { logout } = useAuthentication();

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
        console.log(response.data);
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
            console.log(data);
            break;
        }
      })
      .finally(() => setIsLoading(false));
  };

  const addUser = (params) => {
    const user = cookie.load('user');
    setIsLoading(true);
    API.post("/users", null, {
      headers: {
        Authorization,
      },
      params: {...params, id: user.ID}
    })
      .then((response) => {
        setIsLoading(false);
        const {
          status,
          data: { data },
        } = response;
        if (status === 201) {
          push(USERS);
        }
      })
      .catch((error) => {
        setIsLoading(false);
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

  const updateUser = (params, newPassword) => {
    setIsLoading(true);
    API.post(
      `/users/${params.id}`,
      null,
      {
        headers: {
          Authorization,
        },
        params: newPassword && newPassword !== ""
        ? { ...params, password: newPassword }
        : params,
      }
    )
      .then((response) => {
        const {
          status,
          data: { data },
        } = response;
        if (status === 200) {
          setUpdated(true);
        }
      })
      .catch((error) => {
        const { data, status } = error.response;
        console.log(error.response);
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

  const deleteUser = (params) => {
    setIsLoading(true);
    API.delete(`/users/${params.id}`, {
      headers: {
        Authorization,
      },
      params,
    })
      .then((response) => {
        setIsLoading(false);
        const {
          status,
          data: { data },
        } = response;
        if (status === 200) {
          replace(USERS);
        }
      })
      .catch((error) => {
        setIsLoading(false);
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

  const generatePassword = () => {
    API.get(`/generate-password`, {
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
          setHashPassword(data);
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

  const toggleUpdateAlert = () => setUpdated(!updated);

  useEffect(() => {
    if (typeof params !== "undefined") {
      getUsers(params);
    }
  }, []);

  return {
    users,
    hashPassword,
    isLoading,
    updated,
    getUsers,
    addUser,
    deleteUser,
    updateUser,
    generatePassword,
    toggleUpdateAlert,
  };
};
