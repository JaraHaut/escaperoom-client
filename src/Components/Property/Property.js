import "./Property.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { average } from "../../Lib/average";
import ReactStars from "react-rating-stars-component";

function Property({ property, reviews }) {
  const { propertyId } = useParams();

  //Calculate the average of all the reviews for one property
  let ratingArray = reviews.map(({ rating }) => rating);
  const averageRating = Number(average(ratingArray));

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

  //Show the average rating with read-only stars
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
        <div className="property-details__wrapper">
          <h2 className="property-details__title">Property Details</h2>
          <div className="property-details__card">
            <div className="property-details__image-container">
              <img
                src={picture}
                alt="apartment"
                className="property-details__image"
              />
              <div className="property-details__rating">
                Overall Rating: {averageRating}{" "}
                <ReactStars {...readOnlyStars} />
              </div>
            </div>

            <div className="property-details__card-container">
              <h3 className="property-details__card-title">{title} </h3>
              <div className="property-details__card-data">
                <div className="property-details__card-key">
                  <p className="property-details__key">Address: </p>
                  <p className="property-details__key">Postcode: </p>
                  <p className="property-details__key">Letting Agent:</p>
                  <p className="property-details__key">Bedrooms:</p>
                  <p className="property-details__key">Reception:</p>
                  <p className="property-details__key">Pets allowed:</p>
                  <p className="property-details__key">Outdoor spaces:</p>
                </div>
                <div className="property-details__card-value">
                  <p className="property-details__value">{address}</p>
                  <p className="property-details__value">{postcode}</p>
                  <p className="property-details__value">{agency}</p>
                  <p className="property-details__value">{bedrooms}</p>
                  <p className="property-details__value">
                    {reception ? "Yes" : "No"}
                  </p>
                  <p className="property-details__value">
                    {pets ? "Yes" : "No"}
                  </p>
                  <p className="property-details__value">
                    {" "}
                    {outdoor ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="property-details__addreview">
            <Link
              to={`/reviews/${propertyId}/review`}
              className="property-details__addreview-button"
            >
              Add Review
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
export default Property;
