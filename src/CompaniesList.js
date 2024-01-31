import { useEffect, useState } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

import { useContext } from "react";
import userContext from "./userContext";


/**
 * CompaniesList - get all companies from API and show company data
 *
 *
 * Props:
 *  None
 *
 * State:
 *  companiesData - fetched data in the form {...}
 *
 * RoutesList -> CompaniesList -> SearchForm, CompanyCard
*/

function CompaniesList() {
  const { user } = useContext(userContext);
  console.log("CompaniesList user:", user);

  const [companiesData, setCompaniesData] =
    useState({ data: null, isLoading: true });

  console.log("CompaniesList, state:", companiesData);

  /**Calls api for getting array of all companies
   * and sets state of companiesData
   */

  useEffect(function fetchAndSetCompaniesData() {
    async function getCompanies() {
      const companiesResults = await JoblyApi.getAllCompanies();

      setCompaniesData(() => {
        return {
          data: companiesResults,
          isLoading: false
        };
      });
    }
    console.log("jobly token", JoblyApi.token);
    getCompanies();
  }, []);

  /**Calls api for getting array of filtered companies based on some search
   * parameters and sets state of companiesData
   */

  async function filterCompanies(searchQuery) {
    const companiesResults = await JoblyApi.getAllCompanies(searchQuery);
    setCompaniesData(() => {
      return {
        data: companiesResults,
        isLoading: false
      };
    });

  }

  if (companiesData.isLoading) return <i>...R2D2 noises ...</i>;

  //when searching should have some message prompt show up; could show num results returned
  return (
    <div className="CompaniesList">
      <SearchForm searchFunction={filterCompanies} />

      {companiesData.data.length !== 0 &&

        companiesData.data.map((company) => {
          return (
            <CompanyCard
              key={company.handle}
              name={company.name}
              description={company.description}
              logoUrl={company.logoUrl}
              handle={company.handle}
            />
          );
        })
      }

      {companiesData.data.length === 0 &&
        "No Results"
      }
    </div>
  );
}

export default CompaniesList;