import "./MainPage.scss";
import Header from "../../Components/Header/Header";
import PropertyCard from "../../Components/PropertyCard/PropertyCard";
import Hero from "../../Components/Hero/Hero";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function MainPage() {
  const [properties, setProperties] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { propertyId } = useParams();
  const getAllProperties = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/properties`
      );
      console.log(response.data);
      setProperties(response.data);
    } catch (error) {
      console.error(`Error fecthing properties from database`);
    }
  };
  const getAllReviews = async () => {
    try {
      const reviews = await axios.get(
        `${process.env.REACT_APP_API_URL}/reviews/${propertyId}/reviews`
      );
      console.log(reviews.data);
      setReviews(reviews.data);
    } catch (error) {
      console.log(error);
      console.error(
        `Error fetching reviews for property with id ${propertyId}`
      );
    }
  };
  useEffect(() => {
    getAllProperties();
    getAllReviews();
  }, []);
  console.log(getAllProperties);

  return (
    <>
      <Header />
      <Hero />
      <PropertyCard properties={properties} />
    </>
  );
}
export default MainPage;
