import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../private/PrivateRoute";
import CreateEvent from "./CreateEvent";
import EventDetails from "./EventDetails";
import Home from "./Home";
import Login from "./Login";
import MyList from "./MyList";
import Requests from "./Requests";
import Signup from "./Signup";

function AllRoutes() {
   return (
      <Routes>
         <Route
            path="/"
            element={
               <PrivateRoute>
                  <Home />
               </PrivateRoute>
            }
         />
         <Route
            path="/event/:id"
            element={
               <PrivateRoute>
                  <EventDetails />
               </PrivateRoute>
            }
         />
         <Route
            path="/create"
            element={
               <PrivateRoute>
                  <CreateEvent />
               </PrivateRoute>
            }
         />
         <Route
            path="/requests"
            element={
               <PrivateRoute>
                  <Requests />
               </PrivateRoute>
            }
         />
         <Route
            path="/mylist"
            element={
               <PrivateRoute>
                  <MyList />
               </PrivateRoute>
            }
         />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
      </Routes>
   );
}

export default AllRoutes;
