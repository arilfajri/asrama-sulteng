import { combineReducers } from "redux";
import { authReducer } from "./auth/authSlice";
import { kamarReducer } from "./kamar/kamarSlice";
import { mahasiswaReducer } from "./mahasiswa/mahasiswaSlice";

const reducer = combineReducers({
  auth: authReducer,
  kamar: kamarReducer,
  mahasiswa: mahasiswaReducer,
});

export default reducer;
