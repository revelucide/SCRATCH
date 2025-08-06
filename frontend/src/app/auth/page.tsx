"use client";

import React, { useState } from "react";
import { myAppHook } from "../../../context/AppProvider";

interface formData {
  name?: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formdata, setFormData] = useState<formData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { login, register } = myAppHook();

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formdata,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin) {
      try {
        await login(formdata.email, formdata.password);
      } catch (error) {
        console.log(`Authentication Error ${error}`);
      }
    } else {
      try {
        await register(
          formdata.name!,
          formdata.email,
          formdata.password,
          formdata.password_confirmation!
        );
      } catch (error) {
        console.log(`Authentication Error ${error}`);
      }
    }
  };
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4" style={{ width: "400px" }}>
          <h3 className="text-center"> {isLogin ? "Login" : "Register"} </h3>
          <form onSubmit={handleFormSubmit}>
            {!isLogin && (
              <input
                className="form-control mb-2"
                name="name"
                type="text"
                value={formdata.name}
                onChange={handleOnChangeInput}
                placeholder="Name"
                required
              />
            )}

            <input
              className="form-control mb-2"
              name="email"
              type="email"
              value={formdata.email}
              onChange={handleOnChangeInput}
              placeholder="Email"
              required
            />
            <input
              className="form-control mb-2"
              name="password"
              type="password"
              value={formdata.password}
              onChange={handleOnChangeInput}
              placeholder="Password"
              required
            />
            {!isLogin && (
              <input
                className="form-control mb-2"
                name="password_confirmation"
                type="password"
                value={formdata.password_confirmation}
                onChange={handleOnChangeInput}
                placeholder="Confirm Password"
                required
              />
            )}
            <button className="btn btn-primary w-100" type="submit">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <p className="mt-3 text-center">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span
              onClick={() => setIsLogin(!isLogin)}
              style={{ cursor: "pointer", color: "blue" }}
            >
              {isLogin ? "Register" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
export default Auth;
