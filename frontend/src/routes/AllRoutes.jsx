import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../private/PrivateRoute";
import Home from "./Home";
import Login from "./Login";
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
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
      </Routes>
   );
}

export default AllRoutes;
