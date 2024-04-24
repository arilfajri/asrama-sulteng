import { combineReducers } from "redux";
import { get_mahasiswaReducer } from "./getMahasiswa/getDataMahasiswaSlice";

const reducer = combineReducers({
  getDataMahasiswa: get_mahasiswaReducer,
});

export default reducer;
