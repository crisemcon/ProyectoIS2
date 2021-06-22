import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../config/axios";

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ RUT }, thunkAPI) => {
    try {
      const response = await axiosClient.post("/login", { RUT: RUT });
      let data = await response.data;
      if (response.status === 200) {
        localStorage.setItem("RUT", data.RUT);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchEstadoColegio = createAsyncThunk(
  "users/estadoColegio",
  async (thunkAPI) => {
    try {
      const response = await axiosClient.get("/US4");
      let data = await response.data;
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const establecerCuarentena = createAsyncThunk(
  "users/establecerCuarentena",
  async ({ RUT }, thunkAPI) => {
    try {
      const response = await axiosClient.post("/US4", { RUT: RUT, Estado: "1" });
      let data = await response.data;
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const levantarCuarentena = createAsyncThunk(
  "users/levantarCuarentena",
  async ({ RUT }, thunkAPI) => {
    try {
      const response = await axiosClient.post("/US4", { RUT: RUT, Estado: "0" });
      let data = await response.data;
      if (response.status === 200) {
        return data;
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
    EstadoColegio: 0,
    isFetching: false,
    isSuccess: false,
    isError: false,
    openAlert: false,
    severityAlert: "",
    alertMessage: "",
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
    clearAlertState: (state) => {
      state.openAlert = false;
      state.alertMessage = "";
      state.severityAlert = "";

      return state;
    }
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
      payload === undefined
        ? (state.errorMessage = "Error al conectar con el servidor")
        : (state.errorMessage = payload.error);
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [establecerCuarentena.fulfilled]: (state) => {
      state.EstadoColegio = 1
      state.openAlert = true;
      state.severityAlert = "success";
      state.alertMessage = "La cuarentena ha sido establecida correctamente";
      return state;
    },
    [establecerCuarentena.rejected]: (state, { payload }) => {
      state.openAlert = true;
      state.severityAlert = "error";
      payload === undefined
        ? (state.alertMessage = "Error al conectar con el servidor")
        : (state.alertMessage = payload.error);
    },
    [establecerCuarentena.pending]: (state) => {
      state.openAlert = false;
    },
    [levantarCuarentena.fulfilled]: (state) => {
      state.EstadoColegio = 0
      state.openAlert = true;
      state.severityAlert = "success";
      state.alertMessage = "La cuarentena ha sido levantada correctamente";
      return state;
    },
    [levantarCuarentena.rejected]: (state, { payload }) => {
      state.openAlert = true;
      state.severityAlert = "error";
      payload === undefined
        ? (state.alertMessage = "Error al conectar con el servidor")
        : (state.alertMessage = payload.error);
    },
    [levantarCuarentena.pending]: (state) => {
      state.openAlert = false;
    },
    [fetchEstadoColegio.fulfilled]: (state, {payload}) => {
      state.EstadoColegio = payload.Estado_Colegio
    },
  },
});

export const { clearState, clearAlertState } = userSlice.actions;

export const userSelector = (state) => state.user;
