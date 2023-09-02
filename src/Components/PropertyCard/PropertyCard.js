import "./PropertyCard.scss";
import { Link } from "react-router-dom";

function PropertyCard({ properties }) {
  //need to add average rating here (algorithm and stars)
  //get request to the db to fetch the average rating of each review

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
                      Post Code: {property.postcode}
                    </p>
                    <p className="property-card__data">
                      Letting Agent: {property.agency}
                    </p>
                    <p className="property-card__data">
                      No. bedrooms: {property.bedrooms}
                    </p>

                    <p className="property-card__data">Property Rating </p>
                  </div>
                  {/* <div className="property-card__img">
                    <img src={property.picture} alt="apartment" />
                  </div> */}
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
