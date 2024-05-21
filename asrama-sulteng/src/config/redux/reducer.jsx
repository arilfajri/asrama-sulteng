import { combineReducers } from "redux";
import { authReducer } from "./auth/authSlice";
import { kamarReducer } from "./kamar/kamarSlice";
import { mahasiswaReducer } from "./mahasiswa/mahasiswaSlice";
import { kamardataReducer } from "./kamar/kamardataSlice";
import { mahasiswadataReducer } from "./mahasiswa/mahasiswaDataSlice";
import { keuangandataReducer } from "./keuangan/keuangandataSlice";
import { keuanganReducer } from "./keuangan/keuanganSlice";
import { logoutReducer } from "./auth/logoutSlice";
import { informasiDataReducer } from "./informasi/informasidataSlice";
import { informasiReducer } from "./informasi/informasiSlice";
import { mahasiswaallReducer } from "./mahasiswa/mahasiswaAllSlice";

const reducer = combineReducers({
  auth: authReducer,
  kamar: kamarReducer,
  kamardata: kamardataReducer,
  mahasiswa: mahasiswaReducer,
  mahasiswadata: mahasiswadataReducer,
  mahasiswaall: mahasiswaallReducer,
  keuangan: keuanganReducer,
  keuangandata: keuangandataReducer,
  logout: logoutReducer,
  informasiData: informasiDataReducer,
  informasi: informasiReducer,
});

export default reducer;
