import "./Property.scss";

function Property() {
  return (
    <>
      <section className="property-details">
        <h2>Property Details</h2>
        <p>Description</p>
        <p>Address</p>
        <p>Post Code</p>
        <p>Letting Agent</p>
        <p>No. of bedrooms</p>
        <p>Reception</p>
        <p>Pets allowed</p>
        <p>Outdoor spaces (balcony, terrace, garden)</p>
        <div>
          {/* <img src="https://picsum.photos/200" alt="appartment picture" /> */}
        </div>
      </section>
    </>
  );
}
export default Property;
