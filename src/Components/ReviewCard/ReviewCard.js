import "./ReviewCard.scss";
import ReactStars from "react-rating-stars-component";

function Review({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <div className="">No reviews yet.</div>;
  }

  const rating = reviews[0].rating;
  const readOnlyStars = {
    size: 30,
    value: rating,
    edit: false,
    color: "#f7c1bb",
    activeColor: "#885151",
  };

  return (
    <>
      <div className="review-card__wrapper">
        {reviews.map((review) => {
          return (
            <section className="review-card" key={review.id}>
              <div className="review-card__container">
                <div className="review-card__data-container">
                  <div className="review-card__data">
                    <p className="review-card__key">Overall condition:</p>
                    <p className="review-card__value">{review.condition}</p>
                  </div>
                  <div className="review-card__data">
                    <p className="review-card__key">Confort:</p>
                    <p className="review-card__value"> {review.confort}</p>
                  </div>
                  <div className="review-card__data">
                    <p className="review-card__key">Area safety: </p>
                    <p className="review-card__value">{review.safety}</p>
                  </div>
                  <div className="review-card__data">
                    <p className="review-card__key">Property management:</p>
                    <p className="review-card__value">{review.management}</p>
                  </div>

                  <div className="review-card__data">
                    <p className="review-card__key">
                      Monthly rent (exc. bills):
                    </p>
                    <p className="review-card__value">£{review.price}</p>
                  </div>
                  <div className="review-card__data">
                    <p className="review-card__key">
                      Last year living in property:
                    </p>
                    <p className="review-card__value">{review.date}</p>
                  </div>
                  <div className="review-card__image-container">
                    <img
                      className="review-card__image"
                      src={review.picture}
                      alt="flat interiors"
                    />
                    <div className="review-card__rating">
                      User Rating: {review.rating}
                      <ReactStars {...readOnlyStars} />
                    </div>
                  </div>
                </div>
                <div className="review-card__experience">
                  <p className="review-card__key">Experience:</p>
                  <p className="review-card__value">{review.comments}</p>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
export default Review;
