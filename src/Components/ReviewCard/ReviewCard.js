import "./ReviewCard.scss";
import ReactStars from "react-rating-stars-component";
import { formatDistanceToNowStrict } from "date-fns";
function Review({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <div className="review-card__error">No reviews yet.</div>;
  }

  const rating = reviews[0].rating;
  const readOnlyStars = {
    size: 30,
    value: rating,
    edit: false,
    color: "#b2ddff",
    activeColor: "#76c2ff",
  };

  // let timeStampDate = new Date(review.updated_at);
  // let date = formatDistanceToNowStrict(timeStampDate, {
  //   addSuffix: true,
  // });

  return (
    <>
      <div className="review-card__wrapper">
        {reviews.map((review) => {
          let timeStampDate = new Date(review.updated_at);
          let date = formatDistanceToNowStrict(timeStampDate, {
            addSuffix: true,
          });
          return (
            <section className="review-card" key={review.id}>
              <h2 className="review-card__title">User Review</h2>
              <p>Posted {date}</p>
              <div className="review-card__container">
                <div className="review-card__data-container">
                  <div className="review-card__rating-container">
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
                  </div>
                  <div className="review-card__rating">
                    User Rating: {review.rating}
                    <ReactStars {...readOnlyStars} />
                  </div>
                </div>
                {/* <div className="review-card__img-rating-wrapper"> */}
                <div className="review-card__image-container">
                  <img
                    className="review-card__image"
                    src={review.picture}
                    alt="flat interiors"
                  />
                </div>
                {/* </div> */}
                <div className="review-card__experience">
                  <p className="review-card__experience-key">Experience:</p>
                  <p className="review-card__experience-value">
                    {review.comments}
                  </p>
                </div>
              </div>
              {/* <div className="property-details__button-wrapper">
                <div className="property-details__link">Add a New Review</div>
                <div className="property-details__link-middle">Edit</div>
                <div className="property-details__link">Delete</div>
              </div> */}
            </section>
          );
        })}
      </div>
    </>
  );
}
export default Review;
