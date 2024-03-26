import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "./view/HomeView";
import VisimisiView from "./view/VisimisiView";
import StrukturOrganisasiView from "./view/StrukturOrganisasiView";
import InformasiBiayaView from "./view/InformasiBiayaView";
import KontakView from "./view/KontakView";

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
          <Route path="/informasibiaya" element={<InformasiBiayaView />} />
          <Route path="/kontak" element={<KontakView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
