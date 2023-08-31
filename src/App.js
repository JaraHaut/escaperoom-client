import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import AgentPage from "./Pages/AgentPage/AgentPage";
import NewPropertyPage from "./Pages/NewPropertyPage/NewPropertyPage";
import NewReviewPage from "./Pages/NewReviewPage/NewReviewPage";
import PropertyDetailsPage from "./Pages/PropertyDetailsPage/PropertyDetailsPage";
import { initializeApp } from "firebase/app";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/properties" element={<MainPage />} />
          <Route
            path="/properties/:propertyId"
            element={<PropertyDetailsPage />}
          />
          <Route
            path="/properties/:propertyId/reviews"
            element={<PropertyDetailsPage />}
          />
          <Route path="/properties/add" element={<NewPropertyPage />} />
          <Route
            path="/properties/:propertyId/review"
            element={<NewReviewPage />}
          />
          <Route path="/properties/agents" element={<AgentPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
