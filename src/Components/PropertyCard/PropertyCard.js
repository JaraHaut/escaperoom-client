import "./PropertyCard.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function PropertyCard({ properties }) {
  //need to add average rating here (algorithm and stars)
  //get request to the db to fetch the average rating of each review
  const [reviews, setReviews] = useState([]);
  const { propertyId } = useParams();
  const getAllReviews = async () => {
    try {
      const reviews = await axios.get(
        `${process.env.REACT_APP_API_URL}/reviews/${propertyId}/reviews`
      );
      console.log(reviews.data);
      setReviews(reviews.data);
    } catch (error) {
      console.log(error);
      console.error(
        `Error fetching reviews for property with id ${propertyId}`
      );
    }
  };
  useEffect(() => {
    getAllReviews();
  }, []);
  console.log(reviews);
  // console.log(reviews[0].rating);
  // console.log(reviews[1].rating);

  if (!properties) {
    return <div className="">No properties available.</div>;
  }
  return (
    <>
      <main className="property-list">
        {properties.map((property) => {
          return (
            <>
              {" "}
              <Link
                to={`/properties/${property.id}`}
                key={property.id}
                style={{ textDecoration: "none" }}
              >
                <section
                  className="property-card"
                  style={{ backgroundImage: `url(${property.picture})` }}
                >
                  <div className="property-card__wrapper">
                    <h2 className="property-card__title">{property.title} </h2>
                    <p className="property-card__data">
                      Postcode: {property.postcode}
                    </p>
                    <p className="property-card__data">
                      Letting Agent: {property.agency}
                    </p>
                    <p className="property-card__data">
                      No. bedrooms: {property.bedrooms}
                    </p>
                  </div>
                </section>
              </Link>
            </>
          );
        })}
      </main>
    </>
  );
}
export default PropertyCard;
