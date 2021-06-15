import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../config/axios";

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ RUT }, thunkAPI) => {
    try {
      const response = await axiosClient.post("/login", { RUT: RUT });
      let data = await response.data;
      console.log("RESPONSEEEEE", response);
      if (response.status === 200) {
          console.log("dafukk")
        localStorage.setItem("RUT", data.RUT);
        return data;
      } else {
          console.log("reject po culiao")
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error ctmare", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchUserByRUT = createAsyncThunk(
  "users/fetchUserByRUT",
  async ({ RUT }, thunkAPI) => {
    try {
      const response = await axiosClient.post("/login", { RUT: RUT });
      let data = response.data;
      console.log("data", data, response.status);

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    RUT: "",
    Apellidos: "",
    Correo: "",
    Direccion: "",
    Nombres: "",
    Rol: "",
    Telefono: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      state.RUT = payload.RUT;
      state.Nombres = payload.Nombres;
      state.Apellidos = payload.Apellidos;
      state.Correo = payload.Correo;
      state.Rol = payload.Rol;
      state.Telefono = payload.Telefono;
      state.Direccion = payload.Direccion;
      state.isFetching = false;
      state.isSuccess = true;
      state.errorMessage = "";
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserByRUT.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserByRUT.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.RUT = payload.RUT;
      state.Nombres = payload.Nombres;
      state.Apellidos = payload.Apellidos;
      state.Correo = payload.Correo;
      state.Rol = payload.Rol;
      state.Telefono = payload.Telefono;
    },
    [fetchUserByRUT.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
