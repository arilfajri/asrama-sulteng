import { useSelector } from "react-redux";

export const keuangandataSelector = () =>
  useSelector((state) => state?.keuangandata?.data);

export const keuanganSelector = () =>
  useSelector((state) => state?.keuangan?.data);
