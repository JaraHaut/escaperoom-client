import "./MainPage.scss";
import Header from "../../Components/Header/Header";
import PropertyCard from "../../Components/PropertyCard/PropertyCard";
import Hero from "../../Components/Hero/Hero";
import { useState, useEffect } from "react";
import axios from "axios";

function MainPage() {
  const [properties, setProperties] = useState([]);

  const getAllProperties = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/properties`
      );
      setProperties(response.data);
    } catch (error) {
      console.error(`Error fecthing properties from database`);
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <PropertyCard properties={properties} />
    </>
  );
}
export default MainPage;
