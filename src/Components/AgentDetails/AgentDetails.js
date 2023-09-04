import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AgentDetails.scss";

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
    <>
      <section className="agency-details">
        <div className="agency-details__title-wrapper">
          <h2 className="agency-details__title">Letting Agents' Properties</h2>
        </div>
        <div className="agency-details__subtitle-wrapper">
          <h3 className="agency-details__subtitle">
            Properties for this Agency: {`${agency}`}
          </h3>
        </div>
        <div className="agency-details__list-container">
          <ul className="agency-details__list">
            {propertiesFiltered.map((property) => (
              <li key={property.id} className="agency-details__list-item">
                {property.title} {property.rating}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default AgentDetails;
