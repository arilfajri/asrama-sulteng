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
import KeuanganView from "./view/KeuanganView";
import TambahKeuanganView from "./view/TambahKeuanganView";
import UbahKeuanganView from "./view/UbahKeuanganView";
import UnduhDataKeuanganView from "./view/UnduhDataKeuanganView";
import InformasiView from "./view/InformasiView";
import KamarTersediaView from "./view/KamarTersediaView";
import DetailKamarView from "./view/DetailKamarView";
import BookingKamarView from "./view/BookingKamarView";
import StatusView from "./view/StatusView";

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
            path="/datamahasiswa/detail/:id"
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
          <Route path="/keuangan" element={<KeuanganView />} />
          <Route path="/keuangan/tambah" element={<TambahKeuanganView />} />
          <Route path="/keuangan/ubah" element={<UbahKeuanganView />} />
          <Route path="/keuangan/unduh" element={<UnduhDataKeuanganView />} />
          <Route path="/informasi" element={<InformasiView />} />
          <Route path="/kamar" element={<KamarTersediaView />} />
          <Route path="/kamar/detail/:id" element={<DetailKamarView />} />
          <Route
            path="/kamar/detail/:id/daftar"
            element={<BookingKamarView />}
          />
          <Route path="/status" element={<StatusView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
