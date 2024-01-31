const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token;

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${JoblyApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies */

  static async getAllCompanies(searchName = "") {

    if (searchName) {
      const filteredCompaniesData =
        await this.request(`companies/`, { "nameLike": searchName });
      return filteredCompaniesData.companies;
    }

    const companiesData = await this.request(`companies/`);
    return companiesData.companies;
  }

  /** Get all jobs */

  static async getAllJobs(searchName = "") {
    console.log("getAllJobs, q:", searchName);

    if (searchName) {
      const filteredJobsData =
        await this.request(`jobs/`, { "title": searchName });

      return filteredJobsData.jobs;
    }

    const jobsData = await this.request(`jobs/`);
    return jobsData.jobs;
  }

  /**Login */
  static async login(username, password) {
    let loginData;

      loginData = await this.request("auth/token/",
        { username, password },
        "POST");

    //catch specific error or pass on error by removing try catch block altogether
    this.token = loginData.token;
    console.log("API > Login >> this.token", this.token);
    return loginData.token;
  }

  /**Register a user
   * user must include { username, password, firstName, lastName, email }
  */
  static async register(username, password, firstName, lastName, email) {
    let responseData;
    try {
      responseData = await this.request("auth/register/",
        {
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
          email: email
        },
        "POST");
    }
    catch (err) {
      throw new Error("Username has already been taken");
    }

    this.token = responseData.token;
    return responseData.token;
  }

  /** Get data for authenticated user
   *
   *  Takes a username and returns user data for validated user:
   *
   * { firstName, lastName, email, isAdmin, jobs}
  */

  static async getUserData(username) {
    console.log("API > getUserData >> this.token", this.token);
    const responseData = await this.request(`users/${username}`);

    return responseData.user;
  }
}

export default JoblyApi;
