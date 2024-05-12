import { combineReducers } from "redux";
import { authReducer } from "./auth/authSlice";
import { kamarReducer } from "./kamar/kamarSlice";
import { mahasiswaReducer } from "./mahasiswa/mahasiswaSlice";
import { kamardataReducer } from "./kamar/kamardataSlice";
import { mahasiswadataReducer } from "./mahasiswa/mahasiswaDataSlice";

const reducer = combineReducers({
  auth: authReducer,
  kamar: kamarReducer,
  kamardata: kamardataReducer,
  mahasiswa: mahasiswaReducer,
  mahasiswadata: mahasiswadataReducer,
});

export default reducer;
