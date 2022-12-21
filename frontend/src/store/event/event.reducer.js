import {
   EVENT_ERROR,
   EVENT_GET,
   EVENT_GET_BY_ID,
   EVENT_LOADING,
   EVENT_POST,
} from "./event.types";

const initState = {
   loading: false,
   error: false,
   event: {},
   events: [],
};

export const eventReducer = (state = initState, { type, payload }) => {
   switch (type) {
      case EVENT_LOADING: {
         return {
            ...state,
            loading: true,
            error: false,
         };
      }
      case EVENT_ERROR: {
         return {
            ...state,
            error: true,
            loading: false,
         };
      }
      case EVENT_GET: {
         return {
            ...state,
            loading: false,
            error: false,
            event: {},
            events: payload.reverse(),
         };
      }
      case EVENT_GET_BY_ID: {
         return {
            ...state,
            loading: false,
            error: false,
            event: payload,
         };
      }
      case EVENT_POST: {
         return {
            ...state,
            loading: false,
            error: false,
            events: [payload, ...state.events],
         };
      }
      default:
         return state;
   }
};
