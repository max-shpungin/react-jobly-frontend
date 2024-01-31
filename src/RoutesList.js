import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import CompaniesList from "./CompaniesList";
import CompanyDetails from "./CompanyDetails";
import JobsList from "./JobsList";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";
import SignupForm from "./SignupForm";

import { useContext } from "react";
import userContext from "./userContext";

/**Handles routing for application
 * Uses context for user and token to choose which routes are available to user
 *
 * Prop:
 * -login: function to pass down to LoginForm
 * -signup: function to pass down to SignupForm
 *
 * State:
 * -None
 *
 * App -> RoutesList -> Homepage, CompaniesList, CompanyDetails, JobsList...
 */

function RoutesList({ login, signup }) {
  //don't need token comparisons
  const { user, token } = useContext(userContext);

  console.log("RoutesList user:", user);

  //change to check isLoggedIn
  if (user && token) {
    console.log("Router - user routes reached:", user);
    return (

      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/companies" element={<CompaniesList />}></Route>
        <Route path="/companies/:handle" element={<CompanyDetails />}></Route>
        <Route path="/jobs" element={<JobsList />}></Route>
        <Route path="/profile" element={<ProfileForm />}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    );
  }
  else {
    console.log("Router - no user routes:", user);
    return (
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<LoginForm login={login} />}></Route>
        <Route path="/signup" element={<SignupForm signup={signup} />}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    );
  }
}

export default RoutesList;