import React from "react";
import { Link } from "react-router-dom";
import "./AgentList.scss";
import ReactStars from "react-rating-stars-component";

function AgentList({ agencies }) {
  const readOnlyStars = {
    size: 20,
    value: 2.73,
    edit: false,
    color: "#b2ddff",
    activeColor: "#76c2ff",
  };

  if (!agencies) {
    return;
  }
  return (
    <section className="agency-list">
      <div className="agency-list__wrapper">
        <div className="agency-list__title-wrapper">
          <h2 className="agency-list__title">List of Letting Agents'</h2>
        </div>
        <div className="agency-list__list-container">
          <ul className="agency-list__list">
            {agencies.map((agency) => (
              <li key={agency.id} className="agency-list__list-item">
                <Link to={`/agencies/${agency}`} className="agency-list__link">
                  {agency}
                </Link>
                <div className="agency-list__rating">
                  Rating: 2.73
                  <ReactStars {...readOnlyStars} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AgentList;
