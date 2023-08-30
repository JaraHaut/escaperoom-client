import "./Review.scss";
import ReactStars from "react-rating-stars-component";

function Review({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <div className="">No reviews yet.</div>;
  }
  console.log(reviews);
  console.log(reviews[0].rating);
  const rating = reviews[0].rating;
  const readOnlyStars = {
    size: 50,
    value: rating,
    edit: false,
  };
  return (
    <>
      <div>
        {reviews.map((review) => {
          return (
            <section className="review-form" key={review.id}>
              <div>
                Overall rating:
                <ReactStars {...readOnlyStars} /> {review.rating}
              </div>
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
