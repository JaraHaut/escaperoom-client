import React from "react";
import { Link } from "react-router-dom";

function AgentList({ agencies }) {
  console.log(agencies);
  return (
    <div>
      <h2>List of Agencies</h2>
      <ul>
        {agencies.map((agency) => (
          <li key={agency.id}>
            {/* Use Link to navigate to AgentDetails with the agency's ID as a URL parameter */}
            <Link to={`/agencies/${agency}`}>{agency}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgentList;
