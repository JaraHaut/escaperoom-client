import "./PropertyCard.scss";
//import {Link} from react-router-dom;

function PropertyCard({ properties }) {
  if (!properties) {
    return <div className="">No properties available.</div>;
  }
  return (
    <>
      <div>
        {properties.map((property) => {
          return (
            <>
              <section key={property.id}>
                <p>{property.title} </p>
                <p>Post Code: {property.postcode}</p>
                <p>Letting Agent: {property.agency}</p>
                <p>No. of bedrooms: {property.bedrooms}</p>
                <p>{property.id}</p>
                <div>
                  <img src={property.picture} alt="apartment" />
                </div>
              </section>
            </>
          );
        })}
      </div>
    </>
  );
}
export default PropertyCard;
