
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JoblyApi from "./api";
import JobCardList from "./JobCardList";

/**Fetches data and jobs for one company and renders it
 *
 * Props:
 * -none
 *
 * State:
 * -companyData: company data object
 *
 * RoutesList -> CompanyDetails -> JobCardList
*/

function CompanyDetails() {

  const navigate = useNavigate();
  const { handle } = useParams();

  const [companyData, setCompanyData]
    = useState({ data: null, isLoading: true });

  console.log("CompanyDetails", companyData);

  /**Calls api for getting array of information about a specific company
   * and sets state of companiesData
   */

  useEffect(function fetchAndSetCompanyData() {
    console.log("test use effect ran");
    async function getCompany() {
      try {
        let companyResults = await JoblyApi.getCompany(handle);

        setCompanyData(() => {
          return {
            data: companyResults,
            isLoading: false
          };
        });
      } catch (err) {
        navigate("/companies");
      }
    }
    getCompany();
  }, [handle]); //need to add handle here so that useEffect will run and
  //companyData will re render with new data if go to different company url from
  //previous company url

  if (companyData.isLoading) return <i>...R2D2 noises ...</i>;


  return (
    <div className="CompanyDetails">
      <h1> {companyData.data.name}</h1>
      <p> {companyData.data.description} </p>
      <JobCardList jobsData={companyData.data.jobs} />
    </div>
  );

}

export default CompanyDetails;