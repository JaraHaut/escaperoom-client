import "./PropertyDetailsPage.scss";
import Header from "../../Components/Header/Header";
import Property from "../../Components/Property/Property";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function PropertyDetailsPage() {
  const [property, setProperty] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { propertyId } = useParams();

  const getProperty = async () => {
    try {
      const property = await axios.get(
        `${process.env.REACT_APP_API_URL}/properties/${propertyId}`
      );
      setProperty(property.data);
    } catch (error) {
      console.error(`Error fetching property with id ${propertyId}`);
    }
  };

  const getAllReviews = async () => {
    try {
      const reviews = await axios.get(
        `${process.env.REACT_APP_API_URL}/reviews/${propertyId}/reviews`
      );
      setReviews(reviews.data);
    } catch (error) {
      console.error(
        `Error fetching reviews for property with id ${propertyId}`
      );
    }
  };

  useEffect(() => {
    getProperty();
    getAllReviews();
  }, []);

  return (
    <>
      <Header />

      <Property property={property[0]} reviews={reviews} />
      <ReviewCard reviews={reviews} />
    </>
  );
}
export default PropertyDetailsPage;
