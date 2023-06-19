import { useState, useEffect } from "react";

//store
import { useAuthStore } from "../store";

//jwt
import jwt from "jwt-decode";

export const useAuth = () => {
  const { user, logoutUser } = useAuthStore((state) => ({
    user: state.user,
    logoutUser: state.logoutUser,
  }));
  const [token, setToken] = useState(user?.access_token || null);

  const handleAuthorization = async () => {
    const { access_token } = user;

    if (!access_token || access_token.length === 0) {
      logoutUser();
      return setToken("expired");
    }

    const decodedAccess = jwt(access_token);

    const expAccess = new Date(decodedAccess.exp * 1000);
    const now = new Date();
    const isAccessTokenExpired = now > expAccess;

    if (isAccessTokenExpired) {
      logoutUser();
      return setToken("expired");
    }

    if (isAccessTokenExpired) {
      logoutUser();
      return setToken("expired");
    }

    setToken(access_token);
  };

  useEffect(() => {
    handleAuthorization();
  }, []);

  return token;
};
