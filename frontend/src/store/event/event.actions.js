import axios from "axios";
import {
   EVENT_ERROR,
   EVENT_GET,
   EVENT_GET_BY_ID,
   EVENT_LOADING,
   EVENT_POST,
} from "./event.types";

const api = "https://playo-omega.vercel.app";

export const getEventsAction = () => async (dispatch) => {
   dispatch({ type: EVENT_LOADING });
   try {
      let res = await axios.get(`${api}/event`);
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
