import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "./view/HomeView";
import VisimisiView from "./view/VisimisiView";
import StrukturOrganisasiView from "./view/StrukturOrganisasiView";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/visimisi" element={<VisimisiView />} />
          <Route
            path="/strukturorganisasi"
            element={<StrukturOrganisasiView />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
