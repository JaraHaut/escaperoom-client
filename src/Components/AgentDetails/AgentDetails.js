import { useParams } from "react-router-dom";

function AgentDetails({ agency }) {
  const { agencyId } = useParams();
  console.log(agency);

  return (
    <>
      <div>
        <h2> Estate Agents' Details</h2>
      </div>
    </>
  );
}

export default AgentDetails;
