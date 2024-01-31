import JobCard from "./JobCard";

/** Renders separate cards for each job this needs to display
 *
 * Props:
 * -jobsData - List of jobs to create cards for
 *
 * State:
 *  None
 *
 * RoutesList -> CompanyDetails -> JobCardList -> JobCard
*/


function JobCardList({ jobsData }) {

  console.log("JobCardList", jobsData);

  return (
    <div className="JobCardList">
      {jobsData.map(job => <JobCard key={job.id} job={job} />)}
    </div>
  );
}

export default JobCardList;

