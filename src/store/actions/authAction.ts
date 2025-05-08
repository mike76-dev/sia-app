/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signupSchema, loginSchema } from "@/lib/schemas/AuthSchema";

const API_URL = import.meta.env.VITE_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION;

const BASE_URL = `${API_URL}/${API_VERSION}`;

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (
    { email, password, confirmPassword }: { email: string; password: string; confirmPassword: string },
    thunkAPI,
  ) => {
    try {
      signupSchema.parse({ email, password, confirmPassword });
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "X-Satellite-Password": password,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Signup failed");
      const resData = await res.json();
      console.log(resData);
      return resData;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI,
  ) => {
    try {
      loginSchema.parse({ email, password });
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "X-Satellite-Password": password,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Login failed");
      return await res.json();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);
