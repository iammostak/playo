import {
   AUTH_ERROR,
   AUTH_LOADING,
   AUTH_LOGOUT,
   AUTH_LOGIN_SUCCESS,
   AUTH_SIGNUP_SUCCESS,
} from "./auth.types";

const initState = {
   loading: false,
   error: false,
   isAuth: false,
   token: "",
   user: {},
};

export const authReducer = (state = initState, { type, payload }) => {
   switch (type) {
      case AUTH_LOADING: {
         return {
            ...state,
            loading: true,
            error: false,
         };
      }
      case AUTH_ERROR: {
         return {
            ...state,
            loading: false,
            error: true,
         };
      }
      case AUTH_LOGIN_SUCCESS: {
         return {
            ...state,
            loading: false,
            error: false,
            isAuth: true,
            token: payload.token,
            user: payload.user,
         };
      }
      case AUTH_SIGNUP_SUCCESS: {
         return {
            ...state,
            loading: false,
            error: false,
         };
      }
      case AUTH_LOGOUT: {
         return {
            ...state,
            ...initState,
         };
      }
      default: {
         return state;
      }
   }
};
