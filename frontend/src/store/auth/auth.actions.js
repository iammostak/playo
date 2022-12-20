import {
   AUTH_ERROR,
   AUTH_LOADING,
   AUTH_LOGOUT,
   AUTH_LOGIN_SUCCESS,
   AUTH_SIGNUP_SUCCESS,
} from "./auth.types";
import axios from "axios";

const api = "https://playo-omega.vercel.app/";

export const loginAction = (data) => async (dispatch) => {
   dispatch({ type: AUTH_LOADING });
   try {
      let res = await axios.post(`${api}/user/login`, data);
      dispatch({
         type: AUTH_LOGIN_SUCCESS,
         token: res.data.token,
         user: res.data.user,
      });
      return true;
   } catch (err) {
      dispatch({ type: AUTH_ERROR });
      return false;
   }
};

export const signupAction = (data) => async (dispatch) => {
   dispatch({ type: AUTH_LOADING });
   try {
      let res = await axios.post(`${api}/user/register`, data);
      dispatch({
         type: AUTH_SIGNUP_SUCCESS,
         token: res.data.token,
         user: res.data.user,
      });
      return true;
   } catch (err) {
      dispatch({ type: AUTH_ERROR });
      return false;
   }
};

export const logoutAction = () => {
   return { type: AUTH_LOGOUT };
};
