import { useSelector } from "react-redux";

export const kamarSelector = () => useSelector((state) => state?.kamar?.data);
