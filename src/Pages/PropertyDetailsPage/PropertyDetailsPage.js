import "./PropertyDetailsPage.scss";
import Header from "../../Components/Header/Header";
import Property from "../../Components/Property/Property";
import Review from "../../Components/Review/Review";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function PropertyDetailsPage() {
  const [property, setProperty] = useState([]);
  const { propertyId } = useParams();

  const getProperty = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/properties/${propertyId}`
      );
      console.log(response.data);
      setProperty(response.data);
    } catch (error) {
      console.error(`Error fecthing property with id ${propertyId}`);
    }
  };

  useEffect(() => {
    getProperty();
  }, []);
  console.log(getProperty);

  return (
    <>
      <Header />
      <Property property={property[0]} />
      <Review />
    </>
  );
}
export default PropertyDetailsPage;
