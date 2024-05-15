import { useSelector } from "react-redux";

export const informasiDataSelector = () =>
  useSelector((state) => state?.informasiData?.data);

export const informasiSelector = () =>
  useSelector((state) => state?.informasi?.data);
