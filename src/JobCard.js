/** Renders information for a single job in a card element
 *
 * Props:
 * -job - job data to display
 *
 * State:
 *  None
 *
 * RoutesList -> CompanyDetails -> JobCardList -> JobCard
*/


function JobCard({ job }) {

  //check for salary exist otherwise dont show job
  return (
    <div className="JobCard">
      <h3>{job.title}</h3>
      <p>Salary: {job.salary ? job.salary : "Salary not available."}</p>
      <p>Equity: {job.equity ? job.equity : "Equity not available."}</p>
    </div>
  );
}

export default JobCard;
