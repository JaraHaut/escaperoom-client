import React from "react";
import { Link } from "react-router-dom";
import "./AgentList.scss";

function AgentList({ agencies }) {
  console.log(agencies);
  return (
    <section className="agency-list">
      <div className="agency-list__title-wrapper">
        <h2 className="agency-list__title">List of Agencies</h2>
      </div>
      <div className="agency-list__list-container">
        <ul className="agency-list__list">
          {agencies.map((agency) => (
            <li key={agency.id} className="agency-list__list-item">
              <Link to={`/agencies/${agency}`} className="agency-list__link">
                {agency}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AgentList;
