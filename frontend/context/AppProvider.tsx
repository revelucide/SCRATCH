"use client";

import App from "next/app";
import { createContext, use, useContext, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface appProviderType {
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => Promise<void>;
}

const AppContext = createContext<appProviderType | undefined>(undefined);
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      if (response.data.status) {
        Cookies.set("authToken", response.data.token, { expires: 7 });
        toast.success("Login successful!");
        setAuthToken(response.data.token);
        router.push("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }

      console.log(response);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const register = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        password_confirmation,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AppContext.Provider value={{ login, register, isLoading }}>
      {isLoading ? <Loader /> : children}
    </AppContext.Provider>
  );
};

export const myAppHook = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Context must be used within a AppProvider");
  }
  return context;
};
