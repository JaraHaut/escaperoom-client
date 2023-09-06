import "./Property.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { average } from "../../Lib/average";
import ReactStars from "react-rating-stars-component";

function Property({ property, reviews }) {
  const { propertyId } = useParams();

  //Calculate the average of all the reviews for one property
  let ratingArray = reviews.map(({ rating }) => rating);
  // console.log(ratingArray);

  const averageRating = Number(average(ratingArray));
  console.log(averageRating);
  // console.log(typeof averageRating);

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
    color: "#b2ddff",
    activeColor: "#76c2ff",
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
          {averageRating && (
            <div className="property-details__rating">
              Overall Rating: {averageRating} <ReactStars {...readOnlyStars} />
            </div>
          )}
          <div className="property-details__button-wrapper">
            <div className="property-details__link">
              <Link
                to={`/reviews/${propertyId}/review`}
                className="property-details__link-button"
              >
                Add a New Review
              </Link>
            </div>
            <div className="property-details__link">Edit</div>
            <div className="property-details__link">Delete</div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Property;
