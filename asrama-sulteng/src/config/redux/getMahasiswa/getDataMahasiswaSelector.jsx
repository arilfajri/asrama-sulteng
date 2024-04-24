import { useSelector } from "react-redux";

export const useMahasiswaSelector = () =>
  useSelector((state) => state?.getDataMahasiswa?.mahasiswas);
