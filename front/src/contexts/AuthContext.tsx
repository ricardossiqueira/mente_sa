import { AxiosResponse } from "axios";
import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { setCookie, parseCookies } from "nookies";

type ResponsePayloadType = {
  name: string;
  email: string;
  token: string;
  refreshToken: string;
};

type User = {
  email: string;
  name: string;
};

type SignInCredentialsType = {
  email: string;
  password: string;
};

type AuthContextDataType = {
  signIn(
    credentials: SignInCredentialsType,
    rememberMe?: boolean
  ): Promise<AxiosResponse>;
  isAuthenticated: boolean;
  user: User | null;
};

type AuthProviderPropsType = {
  children: React.ReactNode;
};

const AuthContext = createContext({} as AuthContextDataType);

export function AuthProvider({ children }: AuthProviderPropsType) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  // fetch updated info on sign in
  // useEffect(() => {
  //   const { "mente_sa.token": token } = parseCookies();

  //   if (token) {
  //     fetch updated info
  //   }
  // }, []);

  async function signIn(
    { email, password }: SignInCredentialsType,
    rememberMe = true
  ) {
    const response = await api.post<ResponsePayloadType>("auth/sessions", {
      email,
      password,
    });

    const {
      data: { name, email: _, token, refreshToken },
    } = response;

    // save refresh token to cookies
    setCookie(undefined, "mente_sa.token", token, {
      // can be any value > than the set by the server
      maxAge: 60 * 60 * 24 * 30, // 30 days
      // make it available in all pages
      path: "/",
    });

    // if remember me is true save refresh token to cookies
    rememberMe &&
      setCookie(undefined, "mente_sa.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

    // set user info to state proveider
    setUser({ email, name });

    // re-set axios token, so it can be used in other requests
    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    // return response, so mutations can handle it
    return response;
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
