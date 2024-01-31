import { useState } from "react";

/**Renders a form for logging into application
 *
 * Props:
 * -login: function to set state of user to logged in
 *
 * State:
 * -formData
 * -errorMessage
 */

function LoginForm({ login }) {
  const [formData, setFormData] = useState({username:"", password:""});
  console.log("formData", formData);
  const [errorMessage, setErrorMessage] = useState("");

  /** changes formData upon input box changes*/
  function handleChange(evt) {
    const input = evt.target;
    setFormData(() => {
      return {
        ...formData,
        [input.name]: input.value
      };
    });
  }

  /** invokes login function with formData upon submitting form*/
  async function handleSubmit(evt) {
    evt.preventDefault();
    try{
      await login(formData);
    }
    catch(err){
      const test = new Error();
      console.dir("hello");
      //map over err to display individual errors
      console.log("err", err);
      console.log("hello %o there %o", 42, "42");
      setErrorMessage("Invalid username/password");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          onChange={handleChange}
          value={formData?.username}
          placeholder="username">
        </input>

        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData?.password}
          placeholder="password">
        </input>
        <button>Login</button>
      </form>
      {/* //map over err to display individual errors */}
      { errorMessage &&
      <p>{errorMessage}</p>}
    </div>
  );
}

export default LoginForm;