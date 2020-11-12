import { useEffect, useState } from "react";
import API from "../api";
import cookie from "react-cookies";

export const useSettings = () => {
  const Authorization = cookie.load("Authorization");
  const [languages, setLanguages] = useState("");

  const getLanguages = () => {
    API.get("/settings/languages", {
      headers: {
        Authorization,
      },
    })
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          setLanguages(data);
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

  useEffect(() => {
    getLanguages();
  }, []);

  return { languages };
};
