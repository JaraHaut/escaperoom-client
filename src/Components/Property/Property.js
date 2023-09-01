import "./Property.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { average } from "../../Lib/average";

function Property({ property, reviews }) {
  const { propertyId } = useParams();

  console.log(reviews);
  // console.log(reviews[0].rating);
  // console.log(reviews[1].rating);
  let ratingArray = reviews.map(({ rating }) => rating);
  console.log(ratingArray);
  const averageRating = average(ratingArray);
  console.log(averageRating);

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
  //console.log(property);
  console.log(picture);

  return (
    <>
      <section className="property-details">
        <h2>Property Details</h2>
        <div className="property-details__data">
          <div className="property-details__image-container">
            <img src={picture} alt="apartment" />
          </div>

          <div className="property-details__data-container">
            <h3>{title} </h3>
            <p>Address: {address}</p>
            <p>Post Code: {postcode}</p>
            <p>Letting Agent: {agency}</p>
            <p>No. bedrooms: {bedrooms}</p>
            <p>Reception: {reception ? "Yes" : "No"}</p>
            <p>Pets allowed: {pets ? "Yes" : "No"}</p>
            <p>
              Outdoor spaces (balcony, terrace, garden):{" "}
              {outdoor ? "Yes" : "No"}
            </p>
          </div>
          <div>overall rating: {averageRating}</div>
        </div>
        <div>
          <Link to={`/properties/${propertyId}/review`}>Add Review</Link>
        </div>
      </section>
    </>
  );
}
export default Property;
