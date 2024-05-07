import { useSelector } from "react-redux";

export const mahasiswaSelector = () =>
  useSelector((state) => state?.mahasiswa?.data[0]);

export const mahasiswaSelectorId = () =>
  useSelector((state) => state?.mahasiswa?.data[0]?.id);
