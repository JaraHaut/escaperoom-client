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
              <Link to={`/properties/${property.id}`} key={property.id}>
                <section
                  className="property-card"
                  style={{ backgroundImage: `url(${property.picture})` }}
                >
                  <div className="property-card__data-wrapper">
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
                    <p className="property-card__data">{property.id}</p>
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
