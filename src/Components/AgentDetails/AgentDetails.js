import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AgentDetails() {
  const { agency } = useParams();
  const [propertiesFiltered, setPropertiesFiltered] = useState([]);
  console.log(agency);
  const getPropertiesByAgency = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/agencies/${agency}`
      );
      setPropertiesFiltered(response.data);
      console.log("properties filtered by agency", response.data);
    } catch (error) {
      console.error(`Error fetching properties for agency ${agency}`);
    }
  };

  useEffect(() => {
    getPropertiesByAgency();
  }, [agency]);

  return (
    <div>
      <h2>Agency Details</h2>
      <h3>Properties for this Agency:</h3>
      <ul>
        {propertiesFiltered.map((property) => (
          <li key={property.id}>{property.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default AgentDetails;
