import { useSelector } from "react-redux";

export const mahasiswaSelector = () =>
  useSelector((state) => state?.mahasiswadata?.data[0]);

export const allmahasiswaSelector = () =>
  useSelector((state) => state?.mahasiswadata?.data);

export const mahasiswaallSelector = () =>
  useSelector((state) => state?.mahasiswaall?.data);

export const mahasiswaSelectorId = () =>
  useSelector((state) => state?.mahasiswa?.data[0]?.id);
