import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { getClientId, getLoginApiUrl } from "../utils/gitHubUtils";
import { getAccessToken } from "../api/api";

const Login = ({ setToken }) => {
  console.log("Entrou");
  const url = window.location.href;
  let hasCode = url.includes("?code=");

  useEffect(() => {
    if (hasCode) {
      getAccessToken(url.split("?code=")[1]).then((res) => {
        setToken(res);
      });
    }
    return () => {
      hasCode = false;
    };
  }, [hasCode]);

  const subimitLogin = (e) => {
    e.preventDefault();
    window.location.href = `${getLoginApiUrl()}?client_id=${getClientId()}`;
  };

  return (
    <Button
      variant="contained"
      onClick={(e) => subimitLogin(e)}
      color="success"
    >
      GitHub Login
    </Button>
  );
};

export default Login;
