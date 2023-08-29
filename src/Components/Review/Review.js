import "./Review.scss";
function Review({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <div className="">No reviews yet.</div>;
  }
  return (
    <>
      <div>
        {reviews.map((review) => {
          return (
            <section key={review.id} className="review-card">
              <p>Overall condition: {review.condition}</p>
              <p>Confort: {review.confort}</p>
              <p>Area safety: {review.safety}</p>
              <p>Property management: {review.management}</p>
              <p>Experience: {review.comments}</p>
              <p>Monthly rent (excluding bills): £{review.price}</p>
              <p>Last year living in this property: {review.date}</p>
              <p>
                Pictures: <img src={review.picture} alt="flat interiors" />
              </p>
            </section>
          );
        })}
      </div>
    </>
  );
}
export default Review;
