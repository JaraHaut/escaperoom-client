import "./NewReviewPage.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function NewReviewPage() {
  const [condition, setCondition] = useState();
  const [confort, setConfort] = useState();
  const [safety, setSafety] = useState();
  const [management, setManagement] = useState();
  const [comments, setComments] = useState();
  const [price, setPrice] = useState();
  const [date, setDate] = useState();
  const [picture, setPicture] = useState();
  const { propertyId } = useParams();

  const handleNewReviewFormSubmit = (event) => {
    event.preventDefault();

    const postReview = async () => {
      try {
        const property = await axios.post(
          `${process.env.REACT_APP_API_URL}/properties/${propertyId}`,
          {
            condition: condition,
            confort: confort,
            safety: safety,
            management: management,
            comments: comments,
            price: price,
            date: date,
            picture: picture,
          }
        );
        console.log(property.data);
      } catch (error) {
        console.error(`Error reviewing property with id ${propertyId}`);
      }
    };
  };

  return (
    <>
      <form className="review-data" onSubmit={handleNewReviewFormSubmit}>
        <label htmlFor="condition">Condition</label>
        <input
          type="integer"
          name="condition"
          placeholder=""
          value={condition}
        />
        <label htmlFor="confort">Confort</label>
        <input type="integer" name="confort" placeholder="" value={confort} />
        <label htmlFor="safety">Safety</label>
        <input type="integer" name="safety" placeholder="" value={safety} />
        <label htmlFor="management">Management</label>
        <input
          type="integer"
          name="management"
          placeholder=""
          value={management}
        />
        <label htmlFor="comments">Tell us your experience</label>
        <input type="text" name="comments" placeholder="" value={comments} />
        <label htmlFor="price">Monthly rent (excluding bills)</label>
        <input type="integer" name="price" placeholder="" value={price} />
        <label htmlFor="date">Last year living in this property</label>
        <input type="integer" name="date" placeholder="" value={date} />
        <label htmlFor="picture">Upload your pictures</label>
        <input type="text" name="picture" placeholder="" value={picture} />
      </form>
    </>
  );
}
export default NewReviewPage;
