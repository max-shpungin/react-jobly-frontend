import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesList from './RoutesList';
import Navigation from './Navigation';

import userContext from './userContext';
import JoblyApi from './api';
// import { jwtDecode } from "jwt-decode";


/**Renders RoutesList and Navigation components
 * Sets values for user and token in context and sessionStorage
 * Passes functions for login, logout, and signup to RoutesList
 *
 * Props:
 * -None
 *
 * State:
 * -user: TODO add more details
 * -token
 *
 * App -> Navigation, RoutesList
 */

function App() {
  //localStorage stillmight be better here
  //session cookies are browser lifetime, sessionStorage tab specific
  //if look up item in sessionstorage and not there it's null

  //should not be storing user in storage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const isLoggedIn = user !== null;
  //line indicates to others state is supposed to be null
  //if have token load user data
  //have effect that on mount fetches user data and sets state
  //remove state of token, just set token to localstorage
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  console.log("App user status", user);

  // useEffect(function fetchUserFromAPI(){
  //   setUser(getAndSetUser(jwtDecode(localStorage.getItem('token'))));
  // }, [localStorage.getItem('token')]);

  /** AUTH  ******************************************************************/

  /** Calls api for login and sets state of user*/
  async function login({ username, password }) {
    console.log("App login >> username, password", username, password);
    const tokenFromAPI = await JoblyApi.login(username, password);
    console.log("App login >> token", tokenFromAPI);

    setToken(tokenFromAPI);
    localStorage.setItem('token', tokenFromAPI);
    getAndSetUser(username);
  }

  /** Calls api for registering a user and sets state of user*/
  async function signup({ username, password, firstName, lastName, email }) {
    const tokenFromAPI =
      await JoblyApi.register(username, password, firstName, lastName, email);

    setToken(tokenFromAPI);
    getAndSetUser(username);
  }

  /** Sets user state to null and removes token from sessionStorage */
  function logout() {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   *  Make API request for authed user, set user details in sessionStorage,
   *  and set user state to contain user details
   */
  async function getAndSetUser(username) {
    console.log("App >> getAndSetUser, username", username);
    const { firstName, lastName, email, isAdmin, jobs } =
      await JoblyApi.getUserData(username);

    console.log("App >> getUserData, email", email);
    //make object an explicit variable before either setting to session or state
    localStorage.setItem('user', JSON.stringify(
      {
        username,
        firstName,
        lastName,
        email,
        isAdmin,
        jobs
      }));
    setUser(() => {
      return {
        username,
        firstName,
        lastName,
        email,
        isAdmin,
        jobs
      };
    });
  }

  //remove token from context
  return (
    <div className="App">
      <userContext.Provider value={{ isLoggedIn, user, token }}>
        <BrowserRouter>
          <Navigation logout={logout} />
          <RoutesList login={login} signup={signup} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
