/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signupSchema, loginSchema } from "@/lib/schemas/AuthSchema";
import { mapErrorCode } from "@/lib/mapErrorCode";

const API_URL = import.meta.env.VITE_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION;

const BASE_URL =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? `/api`
    : `${API_URL}/${API_VERSION}`;

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (
    {
      email,
      password,
      confirmPassword,
    }: {
      email: string;
      password: string;
      confirmPassword: string;
    },
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

      if (res.status === 204) {
        return { success: true };
      }
      const resData = await res.json();
      if (!res.ok) {
        const errorMessage = mapErrorCode(resData.code);
        return thunkAPI.rejectWithValue(errorMessage);
      }
      return resData;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async ({ email }: { email: string }, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/signup/resend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (res.status === 204) {
        return { success: true };
      }
      const resData = await res.json();
      if (!res.ok) {
        const errorMessage = mapErrorCode(resData.code);
        return thunkAPI.rejectWithValue(errorMessage);
      }
      return resData;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ code, email }: { code: string; email: string }, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, email }),
      });

      if (res.status === 204) {
        return { success: true };
      }
      const resData = await res.json();
      if (!res.ok) {
        const errorMessage = mapErrorCode(resData.code);
        return thunkAPI.rejectWithValue(errorMessage);
      }
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
      if (res.status === 204) {
        return { success: true };
      }
      const resData = await res.json();
      if (!res.ok) {
        const errorMessage = mapErrorCode(resData.code);
        return thunkAPI.rejectWithValue(errorMessage);
      }
      return resData;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }: { email: string }, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (res.status === 204) {
        return { success: true };
      }
      const resData = await res.json();
      if (!res.ok) {
        const errorMessage = mapErrorCode(resData.code);
        return thunkAPI.rejectWithValue(errorMessage);
      }
      return resData;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const resendResetLink = createAsyncThunk(
  "auth/resendResetLink",
  async ({ email }: { email: string }, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/reset/resend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (res.status === 204) {
        return { success: true };
      }
      const resData = await res.json();
      if (!res.ok) {
        const errorMessage = mapErrorCode(resData.code);
        return thunkAPI.rejectWithValue(errorMessage);
      }
      return resData;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const verifyResetToken = createAsyncThunk(
  'auth/verifyResetToken',
  async ({ token }: { token: string }, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/auth`, {
        method: 'GET',
        headers: {
          'X-Satellite-Token': token,
        },
        credentials: 'include',
      });
      if (res.status === 204) {
        return { success: true };
      }
      const resData = await res.json();
      if (!res.ok) {
        const errorMessage = mapErrorCode(resData.code);
        return thunkAPI.rejectWithValue(errorMessage);
      }
      return resData;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ password }: { password: string }, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/change`, {
        method: 'GET',
        headers: {
          'X-Satellite-Password': password,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (res.status === 204) {
        return { success: true };
      }
      const resData = await res.json();
      console.log(resData);
      if (!res.ok) {
        const errorMessage = mapErrorCode(resData.code);
        return thunkAPI.rejectWithValue(errorMessage);
      }
      return resData;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const googleRegister = createAsyncThunk(
  'auth/googleRegister',
  async (
    {
      clientId,
      credential,
    }: { clientId: string; credential: string },
    thunkAPI,
  ) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/login/google?action=signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, credential }),
        credentials: 'include',
      });

      if (res.status === 204) {
        return { success: true };
      }

      const resData = await res.json();
      if (!res.ok) {
        const errorMessage = mapErrorCode(resData.code);
        return thunkAPI.rejectWithValue(errorMessage);
      }
      return resData;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (
    {
      clientId,
      credential,
    }: { clientId: string; credential: string },
    thunkAPI,
  ) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/login/google?action=login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, credential }),
        credentials: 'include',
      });

      if (res.status === 204) {
        return { success: true };
      }

      const resData = await res.json();
      if (!res.ok) {
        const errorMessage = mapErrorCode(resData.code);
        return thunkAPI.rejectWithValue(errorMessage);
      }
      return resData;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);