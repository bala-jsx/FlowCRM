import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import LeadsPage from "./pages/LeadsPage";
import LeadDetailsPage from "./pages/LeadDetailsPage";
import PipelinePage from "./pages/PipelinePage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>

          {/* DEFAULT PAGE */}
          <Route index element={<DashboardPage />} />

          <Route path="leads" element={<LeadsPage />} />
          <Route path="lead/:id" element={<LeadDetailsPage />} />
          <Route path="pipeline" element={<PipelinePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;



