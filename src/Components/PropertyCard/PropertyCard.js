import "./PropertyCard.scss";
import { Link } from "react-router-dom";

function PropertyCard({ properties }) {
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
              {property && (
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
                      <h2 className="property-card__title">
                        {property.title}{" "}
                      </h2>
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
              )}
            </>
          );
        })}
      </main>
    </>
  );
}
export default PropertyCard;
