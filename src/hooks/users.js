import { useState } from "react";
import API from "../api";
import { load } from "react-cookies";
import { useAuthentication } from "./auth";
import { useHistory } from "react-router-dom";
import { USERS } from "../routes";

export const useUsers = () => {
  const Authorization = load("Authorization");
  const { push, replace } = useHistory();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const addUser = (params, callback) => {
    const user = load("user");
    API.post("/users", null, {
      headers: {
        Authorization,
      },
      params: { ...params, id: user.ID },
    })
      .then((response) => {
        callback();
        const { status } = response;
        if (status === 201) {
          push(USERS);
        }
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
  };

  const updateUser = (params, newPassword, callback) => {
    API.post(`/users/${params.id}`, null, {
      headers: {
        Authorization,
      },
      params:
        newPassword && newPassword !== ""
          ? { ...params, password: newPassword }
          : params,
    })
      .then((response) => {
        const { data, status } = response;
        callback(true, { data, status });
      })
      .catch((error) => {
        const { data, status } = error.response;
        callback(false, { data, status });
      });
  };

  const updateUsersRole = (params, callback) => {
    API.put(`/users/role`, null, {
      headers: {
        Authorization,
      },
      params,
    })
      .then((response) => {
        const { data, status } = response;
        callback(true, { data, status });
      })
      .catch((error) => {
        const { data, status } = error.response;
        callback(false, { data, status });
      });
  };

  const deleteUsers = (params, callback) => {
    API.delete(`/users`, {
      headers: {
        Authorization,
      },
      params,
    })
      .then((response) => {
        const { data, status } = response;
        callback(true, { data, status });
      })
      .catch((error) => {
        const { data, status } = error.response;
        callback(false, { data, status });
      });
  };

  const deleteUser = (params) => {
    API.delete(`/users`, {
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

  return {
    users,
    isLoading,
    getUsers,
    addUser,
    deleteUser,
    updateUsersRole,
    deleteUsers,
    updateUser,
  };
};
