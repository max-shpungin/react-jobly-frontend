import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * SearchForm - Get user search query and make api request
 *
 * Props:
 *  None
 *
 * State:
 *  formData (searchQuery)
 *
 * RoutesList -> CompaniesList, JobsList -> SearchForm
*/

function SearchForm({ searchFunction }) {

  const [formData, setFormData] = useState("");

  console.log("SearchForm", formData);

  /** changes formData upon input box changes*/
  function handleChange(evt) {
    const input = evt.target;
    setFormData(() => ({
      [input.name]: input.value
    }));
  }

  /**invokes searchFunction upon form submission */
  function handleSubmit(evt) {
    evt.preventDefault();
    searchFunction(formData.searchQuery);
    setFormData("");
  }

  // return (
  //   <div>
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         name="searchQuery"
  //         value={formData ? formData.searchQuery : ""}
  //         onChange={handleChange}
  //         required>
  //       </input>
  //       <button>Submit</button>
  //     </form>
  //   </div>
  // );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Search bar</Form.Label>
        <Form.Control
          type="input"
          placeholder="Enter email"
          name="searchQuery"
          value={formData ? formData.searchQuery : ""}
          onChange={handleChange}
          required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SearchForm;