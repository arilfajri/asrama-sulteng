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
import { logout } from "../config/redux/auth/authThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../config/redux/auth/authSlice";
import { resetDataMahasiswa } from "../config/redux/mahasiswa/mahasiswaSlice";

const TopBar = () => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetDataMahasiswa());
    navigate("/");
  };
  return (
    <div>
      <div className="bg-abuAbu shadow flex justify-end">
        <Menu allowHover>
          <MenuHandler>
            <div
              className="cursor-pointer hover:text-blue-800 gap-1 py-5 px-12 flex items-center"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <UserCircleIcon className="h-6 w-6" />
              <Typography>Aril Fajri Tolani</Typography>
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
              <Button onClick={logOut} className=" hover:text-red-900">
                Logout
              </Button>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default TopBar;
