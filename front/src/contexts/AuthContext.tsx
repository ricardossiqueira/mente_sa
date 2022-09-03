import { AxiosResponse } from "axios";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";

import { api } from "../services/api";

type ResponsePayloadType = {
  token: string;
  refreshToken: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  crp: string | null;
  approach: string | null;
  contact: string | null;
  createdAt: string;
  updatedAt: string;
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
  const [user, setUser] = useState<User>({
    approach: null,
    contact: null,
    crp: null,
    createdAt: "",
    email: "",
    id: "",
    name: "",
    updatedAt: "",
  });
  const isAuthenticated = !!user;
  const router = useRouter();

  // fetch updated info on sign in
  useEffect(() => {
    const { "mente_sa.token": token } = parseCookies();

    if (token) {
      api.get("/auth/me").then((res: AxiosResponse<User>) => {
        setUser(res.data);
      });
    } else {
      // unauthorized, logout
      destroyCookie(undefined, "mente_sa.token");
      destroyCookie(undefined, "mente_sa.refreshToken");

      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signIn(
    { email, password }: SignInCredentialsType,
    rememberMe = true
  ) {
    const response = await api.post<ResponsePayloadType>("auth/sessions", {
      email,
      password,
    });

    const {
      data: { token, refreshToken },
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
    // setUser({ email });

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
