import { useSelector } from "react-redux";

export const authSelector = () => useSelector((state) => state?.auth?.data);
export const authRole = () => useSelector((state) => state?.auth?.data.role);
