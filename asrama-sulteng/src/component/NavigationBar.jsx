import React, { useState } from "react";
import logo from "../assets/logo-asrama.png";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const [isHover, setIsHover] = useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="black"
        className="flex items-center gap-x-2 p-2 font-medium hover:bg-orange-50 hover:text-orangeAsrama rounded-full"
      >
        <Link to={"/"} className="flex items-center">
          Beranda
        </Link>
      </Typography>
      <Menu allowHover>
        <MenuHandler>
          <Typography
            as="li"
            variant="small"
            color="black"
            className="flex items-center gap-x-2 p-2 font-medium hover:bg-orange-50 hover:text-orangeAsrama rounded-full"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <a href="#" className="flex items-center">
              Profil Asrama
            </a>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3.5 w-3.5 transition-transform transform ${
                isHover ? "rotate-180" : ""
              }`}
            />
          </Typography>
        </MenuHandler>
        <MenuList>
          <MenuItem>
            <Link to={"/visimisi"} className="flex items-center">
              Visi Misi
            </Link>
          </MenuItem>
          <MenuItem>
            <a href="">Struktur Organiasi</a>
          </MenuItem>
        </MenuList>
      </Menu>
      <Typography
        as="li"
        variant="small"
        color="black"
        className="flex items-center gap-x-2 p-2 font-medium hover:bg-orange-50 hover:text-orangeAsrama rounded-full"
      >
        <a href="#" className="flex items-center">
          Informasi Biaya
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="black"
        className="flex items-center gap-x-2 p-2 font-medium hover:bg-orange-50 hover:text-orangeAsrama rounded-full"
      >
        <a href="#" className="flex items-center">
          Kontak
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="black"
        className="flex items-center gap-x-2 p-2 font-medium hover:bg-orange-50 hover:text-orangeAsrama rounded-full"
      >
        <a href="#" className="flex items-center">
          Data Mahasiswa Penghuni
        </a>
      </Typography>
    </ul>
  );

  return (
    <div>
      <Navbar
        className="mx-auto px-4 py-2 lg:px-8 lg:py-4 rounded-none bg-white fixed z-10 top-0"
        fullWidth
      >
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center gap-4">
            <img src={logo} alt="" className="w-16" />
            <div className="flex flex-col items-center">
              <Typography
                as="a"
                href="#"
                className="cursor-pointer font-bold uppercase text-orangeAsrama"
              >
                ASRAMA
              </Typography>
              <Typography
                as="a"
                href="#"
                className="cursor-pointer font-bold uppercase"
              >
                tora-tora
              </Typography>
            </div>
          </div>

          <div className="hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1">
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
              color="deep-orange"
            >
              <span>Login</span>
            </Button>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <MobileNav open={openNav}>
          <div className="container mx-auto">
            {navList}
            <div className="flex items-center gap-x-1">
              <Button
                fullWidth
                variant="gradient"
                size="sm"
                color="deep-orange"
              >
                <span>Login</span>
              </Button>
            </div>
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
