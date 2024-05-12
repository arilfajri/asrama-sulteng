import { useSelector } from "react-redux";

export const kamarSelector = () => useSelector((state) => state?.kamar?.data);
export const kamardataSelector = () =>
  useSelector((state) => state?.kamardata?.data);
