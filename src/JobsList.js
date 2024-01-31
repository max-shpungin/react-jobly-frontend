import { useEffect, useState } from "react";
import JoblyApi from "./api";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";

/**Fetches all jobs and renders it
 *
 * Props:
 * -None
 *
 * State:
 * -jobsData: array of job objects
 *
 * RoutesList -> JobsList -> SearchForm, JobsCardList
*/

function JobsList() {
  const [jobsData, setJobsData] =
    useState({ data: null, isLoading: true });

  console.log("jobsData", jobsData);

  useEffect(function fetchAndSetJobsData() {
    async function getJobs() {
      const jobResults = await JoblyApi.getAllJobs();

      setJobsData(() => {
        return {
          data: jobResults,
          isLoading: false
        };
      });
    }
    getJobs();
  }, []);

  async function filterJobs(searchQuery) {
    const jobsResults = await JoblyApi.getAllJobs(searchQuery);
    setJobsData(() => {
      return {
        data: jobsResults,
        isLoading: false
      };
    });
  }

  if (jobsData.isLoading) return <i>...R2D2 noises ...</i>;

  return (
    <div className="JobsList">
        <SearchForm searchFunction={filterJobs} />

      { jobsData.data.length !== 0 &&
        <JobCardList jobsData={jobsData.data} />
      }
      { jobsData.data.length === 0 &&
        "No Results"
      }
    </div>
  );
}

export default JobsList;