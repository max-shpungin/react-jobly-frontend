import { useState } from "react";

/**Renders a form for Registering a new user
 *
 * Props:
 * -signup: function to register a new user in backend and set state of user
 *
 * State:
 * -formData
 * -errorMessage
 */

function SignupForm({ signup }) {
  const [formData, setFormData] = useState({});
  console.log("SignupFormData", formData);
  const [errorMessage, setErrorMessage] = useState("");
  console.log("errorMessage", errorMessage);

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

  /**invokes signup function upon form submission */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signup(formData);
    }
    catch (err) {
      console.log("err", err);
      setErrorMessage("Username has already been taken");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          onChange={handleChange}
          value={formData.username}
          placeholder="username">
        </input>

        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="password">
        </input>

        <input
          name="firstName"
          onChange={handleChange}
          value={formData.firstName}
          placeholder="firstname">
        </input>

        <input
          name="lastName"
          onChange={handleChange}
          value={formData.lastName}
          placeholder="lastname">
        </input>

        <input
          name="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="email">
        </input>
        <button>Signup!</button>
      </form>
      {errorMessage &&
        <p>{errorMessage}</p>}
    </div>
  );
}

export default SignupForm;