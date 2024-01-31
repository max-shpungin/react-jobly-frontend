
import { Link } from "react-router-dom";

/**Renders information about a specific company
 *
 * Props:
 * -name
 * -description
 * -logoUrl
 *
 * State:
 * -None
 *
 * CompaniesList -> CompanyCard
 */

function CompanyCard({ name, description, logoUrl, handle }) {
  return (
    <Link to={`/companies/${handle}`} className="CompanyCard">
      <h3>{name}</h3>
      <img src={logoUrl} alt={name} />
      <p>{description}</p>
    </Link>
  );
}

export default CompanyCard;