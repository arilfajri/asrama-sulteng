import {
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { getMe, logout } from "../config/redux/auth/authThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../config/redux/auth/authSlice";
import { resetDataMahasiswa } from "../config/redux/mahasiswa/mahasiswaSlice";
import { resetDataKeuangan } from "../config/redux/keuangan/keuanganSlice";
import { resetDataInformasi } from "../config/redux/informasi/informasiSlice";
import { resetDataKamar } from "../config/redux/kamar/kamarSlice";
import { authSelector } from "../config/redux/auth/authSelector";
import Sidebar from "./Sidebar";
import SidebarCalonPenghuni from "./SidebarCalonPenghuni";
const TopBar = () => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetDataMahasiswa());
    dispatch(resetDataKeuangan());
    dispatch(resetDataInformasi());
    dispatch(resetDataKamar());
    navigate("/login");
  };
  const admin = authSelector();
  return (
    <div>
      <div className="bg-abuAbu shadow flex justify-between md:justify-end items-center">
        {admin.role === "admin" ? (
          <div className="block md:hidden">
            <Sidebar />
          </div>
        ) : (
          <div className="block md:hidden">
            <SidebarCalonPenghuni />
          </div>
        )}
        <Menu allowHover>
          <MenuHandler>
            <div
              className="cursor-pointer hover:text-blue-800 gap-1 p-5 flex items-center"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <UserCircleIcon className="h-6 w-6" />
              <Typography>{admin.name}</Typography>
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3.5 w-3.5 transition-transform transform ${
                  isHover ? "rotate-180" : ""
                }`}
              />
            </div>
          </MenuHandler>
          <MenuList>
            <MenuItem className="flex items-center gap-2">
              <ArrowLeftStartOnRectangleIcon color="red" className="h-5 w-5" />
              <button onClick={logOut} className=" hover:text-red-900">
                Logout
              </button>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};
export default TopBar;
