import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "./view/HomeView";
import VisimisiView from "./view/VisimisiView";
import StrukturOrganisasiView from "./view/StrukturOrganisasiView";
import InformasiBiayaView from "./view/InformasiBiayaView";
import KontakView from "./view/KontakView";
import RegisterView from "./view/RegisterView";
import LoginView from "./view/LoginView";
import DashboardView from "./view/DashboardView";
import VerifikasiView from "./view/VerifikasiView";
import VerifikasiDetailView from "./view/VerifikasiDetailView";
import DataMahasiswaView from "./view/DataMahasiswaView";
import DetailMahasiswaView from "./view/DetailMahasiswaView";
import UbahDataMahasiswaView from "./view/UbahDataMahasiswaView";
import TambahDataMahasiswaView from "./view/TambahDataMahasiswaView";

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
          <Route path="/register" element={<RegisterView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/verifikasi" element={<VerifikasiView />} />
          <Route path="/verifikasi/detail" element={<VerifikasiDetailView />} />
          <Route path="/datamahasiswa" element={<DataMahasiswaView />} />
          <Route
            path="/datamahasiswa/detail"
            element={<DetailMahasiswaView />}
          />
          <Route
            path="/datamahasiswa/ubah"
            element={<UbahDataMahasiswaView />}
          />
          <Route
            path="/datamahasiswa/tambah"
            element={<TambahDataMahasiswaView />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
