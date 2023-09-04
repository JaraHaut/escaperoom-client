import "./AgentPage.scss";
import Header from "../../Components/Header/Header";
import AgentList from "../../Components/AgentList/AgentList";
import AgentDetails from "../../Components/AgentDetails/AgentDetails";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function AgentPage() {
  const [agency, setAgency] = useState([]);
  const [allAgencies, setAllAgencies] = useState([]);
  const { agencyId } = useParams();

  const getOneAgency = async () => {
    try {
      const agency = await axios.get(
        `${process.env.REACT_APP_API_URL}/agencies/${agencyId}`
      );

      setAgency(agency.data);
    } catch (error) {
      console.error(
        `Error fetching the details for letting agent with id ${agencyId}`
      );
    }
  };
  const getAllAgencies = async () => {
    try {
      const agencies = await axios.get(
        `${process.env.REACT_APP_API_URL}/agencies`
      );
      setAllAgencies(agencies.data);
    } catch (error) {
      console.error(`Error fetching the agencies`);
    }
  };

  useEffect(() => {
    getOneAgency();
    getAllAgencies();
  }, []);

  return (
    <>
      <Header />
      <AgentList agencies={allAgencies} />
      <AgentDetails agency={agency} />
    </>
  );
}
export default AgentPage;
