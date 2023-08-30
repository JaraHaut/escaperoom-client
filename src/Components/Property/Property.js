import "./Property.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Property({ property }) {
  const { propertyId } = useParams();

  if (!property) {
    return null;
  }
  const {
    title,
    address,
    postcode,
    agency,
    bedrooms,
    reception,
    pets,
    outdoor,
    picture,
  } = property;
  console.log(property);

  return (
    <>
      <section className="property-details">
        <h2>Property Details</h2>
        <p>{title} </p>
        <p>Address: {address}</p>
        <p>Post Code: {postcode}</p>
        <p>Letting Agent: {agency}</p>
        <p>No. bedrooms: {bedrooms}</p>
        <p>Reception: {reception ? "Yes" : "No"}</p>
        <p>Pets allowed: {pets ? "Yes" : "No"}</p>
        <p>
          Outdoor spaces (balcony, terrace, garden): {outdoor ? "Yes" : "No"}
        </p>
        <div>
          <img src={picture} alt="apartment" />
        </div>
        <div>
          <Link to={`/properties/${propertyId}/review`}>Add Review</Link>
        </div>
      </section>
    </>
  );
}
export default Property;
