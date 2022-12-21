import axios from "axios";
import {
   EVENT_ERROR,
   EVENT_GET,
   EVENT_GET_BY_ID,
   EVENT_LOADING,
   EVENT_POST,
} from "./event.types";

const api = "https://playo-omega.vercel.app";

export const getEventsAction =
   (query = "") =>
   async (dispatch) => {
      dispatch({ type: EVENT_LOADING });
      try {
         let res = await axios.get(`${api}/event?filter=${query}`);
         dispatch({ type: EVENT_GET, payload: res.data.events });
      } catch (err) {
         dispatch({ type: EVENT_ERROR });
      }
   };

export const postEventAction = (data) => async (dispatch) => {
   dispatch({ type: EVENT_LOADING });
   try {
      let res = await axios.post(`${api}/event/post`, data);
      dispatch({ type: EVENT_POST, payload: res.data.event });
      return res.data.message;
   } catch (err) {
      dispatch({ type: EVENT_ERROR });
   }
};

export const getByIdEventAction = (id) => async (dispatch) => {
   dispatch({ type: EVENT_LOADING });
   try {
      let res = await axios.get(`${api}/event/${id}`);
      dispatch({ type: EVENT_GET_BY_ID, payload: res.data.event });
   } catch (err) {
      dispatch({ type: EVENT_ERROR });
   }
};

export const joinEventAction = (data) => async (dispatch) => {
   dispatch({ type: EVENT_LOADING });
   try {
      let res = await axios.post(`${api}/event/join`, data);
      dispatch({ type: EVENT_GET, payload: res.data.events });
      return true;
   } catch (err) {
      dispatch({ type: EVENT_ERROR });
      return false;
   }
};

export const acceptEventAction = (data) => async (dispatch) => {
   dispatch({ type: EVENT_LOADING });
   try {
      let res = await axios.post(`${api}/event/accept`, data);
      dispatch({ type: EVENT_GET, payload: res.data.events });
      return true;
   } catch (err) {
      dispatch({ type: EVENT_ERROR });
      return false;
   }
};

export const rejectEventAction = (data) => async (dispatch) => {
   dispatch({ type: EVENT_LOADING });
   try {
      let res = await axios.post(`${api}/event/reject`, data);
      dispatch({ type: EVENT_GET, payload: res.data.events });
      return true;
   } catch (err) {
      dispatch({ type: EVENT_ERROR });
      return false;
   }
};
