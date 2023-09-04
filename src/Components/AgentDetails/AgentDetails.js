import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import "./AgentDetails.scss";

function AgentDetails() {
  const { agency } = useParams();
  const [propertiesFiltered, setPropertiesFiltered] = useState([]);
  const [propertiesError, setPropertiesError] = useState(false);
  console.log(agency);

  const getPropertiesByAgency = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/agencies/${agency}`
      );
      setPropertiesFiltered(response.data);
      console.log("properties filtered by agency", response.data);
      setPropertiesError(false);
    } catch (error) {
      console.error(`Error fetching properties for agency ${agency}`);
    }
  };

  useEffect(() => {
    getPropertiesByAgency();
  }, [agency]);

  if (!agency) {
    return (
      <p className="agency-details__error">Please select a Letting Agent</p>
    );
  }
  return (
    <>
      <section className="agency-details">
        <div className="agency-details__wrapper">
          <div className="agency-details__title-wrapper">
            <h2 className="agency-details__title">
              Letting Agents' Properties
            </h2>
          </div>
          <div className="agency-details__subtitle-wrapper">
            <h3 className="agency-details__subtitle">
              Letting Agent: {`${agency}`}
            </h3>
          </div>
          <div className="agency-details__list-container">
            <ul className="agency-details__list">
              {propertiesFiltered.map((property) => (
                <li key={property.id} className="agency-details__list-item">
                  <Link
                    to={`/properties/${property.id}`}
                    key={property.id}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={property.picture}
                      alt=""
                      className="agency-details__img"
                    />
                  </Link>
                  <h3>{property.title}</h3>
                  <h3>{property.rating}</h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default AgentDetails;
