import "./Property.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { average } from "../../Lib/average";
import ReactStars from "react-rating-stars-component";

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

  const readOnlyStars = {
    size: 30,
    value: averageRating,
    edit: false,
    color: "#f7c1bb",
    activeColor: "#885151",
  };

  return (
    <>
      <section className="property-details">
        <h2 className="property-details__title">Property Details</h2>
        <div className="property-details__card">
          <div className="property-details__image-container">
            <img
              src={picture}
              alt="apartment"
              className="property-details__image"
            />
            <div className="property-details__rating">
              Overall Rating: {averageRating} <ReactStars {...readOnlyStars} />
            </div>
          </div>

          <div className="property-details__card-container">
            <h3 className="property-details__card-title">{title} </h3>
            <div className="property-details__card-data">
              <div className="property-details__card-key">
                <p className="property-details__data">Address: </p>
                <p className="property-details__data">Postcode: </p>
                <p className="property-details__data">Letting Agent:</p>
                <p className="property-details__data">Bedrooms:</p>
                <p className="property-details__data">Reception:</p>
                <p className="property-details__data">Pets allowed:</p>
                <p className="property-details__data">Outdoor spaces:</p>
              </div>
              <div className="property-details__card-value">
                <p className="property-details__data">{address}</p>
                <p className="property-details__data">{postcode}</p>
                <p className="property-details__data">{agency}</p>
                <p className="property-details__data">{bedrooms}</p>
                <p className="property-details__data">
                  {reception ? "Yes" : "No"}
                </p>
                <p className="property-details__data">{pets ? "Yes" : "No"}</p>
                <p className="property-details__data">
                  {" "}
                  {outdoor ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="property-details__addreview">
          <Link
            to={`/properties/${propertyId}/review`}
            className="property-details__addreview-button"
          >
            Add Review
          </Link>
        </div>
      </section>
    </>
  );
}
export default Property;
