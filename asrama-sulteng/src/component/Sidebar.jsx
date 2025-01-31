import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  IconButton,
  Drawer,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ClipboardDocumentCheckIcon,
  CircleStackIcon,
  BanknotesIcon,
  NewspaperIcon,
  HomeModernIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import logo from "../assets/logo-asrama.png";
import { Link, useLocation, useParams } from "react-router-dom";

const Sidebar = () => {
  const params = useParams();
  const [activeItems, setActiveItems] = useState({
    "/dashboard": false,
    "/verifikasi": false,
    "/datamahasiswa": false,
    "/keuangan": false,
    "/informasi": false,
  });
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    setActiveItems((prevState) => ({
      ...prevState,
      [path]: true,
    }));
  }, [location.pathname]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const SidebarContent = (
    <>
      <div className="mb-2 p-4 flex flex-col justify-center items-center">
        <img src={logo} alt="" className="w-16" />
        <Typography variant="h6" className="text-blue-800 mt-6">
          ASRAMA
        </Typography>
        <Typography variant="h6" className="text-black">
          TORA-TORA
        </Typography>
      </div>
      <List className="text-black">
        <Link to={"/dashboard"}>
          <ListItem
            className={`${
              activeItems["/dashboard"]
                ? "bg-blue-900 text-white"
                : "hover:bg-blue-900 hover:text-white"
            }`}
          >
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link to={"/verifikasi"}>
          <ListItem
            className={`${
              activeItems["/verifikasi"] ||
              activeItems[`/verifikasi/detail/${params.id}`]
                ? "bg-blue-900 text-white"
                : "hover:bg-blue-900 hover:text-white"
            }`}
          >
            <ListItemPrefix>
              <ClipboardDocumentCheckIcon className="h-5 w-5" />
            </ListItemPrefix>
            Verifikasi
          </ListItem>
        </Link>
        <Link to={"/datamahasiswa"}>
          <ListItem
            className={`${
              activeItems["/datamahasiswa"] ||
              activeItems["/datamahasiswa/tambah"] ||
              activeItems[`/datamahasiswa/detail/${params.id}`] ||
              activeItems[`/datamahasiswa/ubah/${params.id}`]
                ? "bg-blue-900 text-white"
                : "hover:bg-blue-900 hover:text-white"
            }`}
          >
            <ListItemPrefix>
              <CircleStackIcon className="h-5 w-5" />
            </ListItemPrefix>
            Data Mahasiswa
          </ListItem>
        </Link>
        <Link to={"/keuangan"}>
          <ListItem
            className={`${
              activeItems["/keuangan"] ||
              activeItems["/keuangan/tambah"] ||
              activeItems[`/keuangan/ubah/${params.id}`] ||
              activeItems["/keuangan/unduh"]
                ? "bg-blue-900 text-white"
                : "hover:bg-blue-900 hover:text-white"
            }`}
          >
            <ListItemPrefix>
              <BanknotesIcon className="h-5 w-5" />
            </ListItemPrefix>
            Uang Kas
          </ListItem>
        </Link>
        <Link to={"/informasi"}>
          <ListItem
            className={`${
              activeItems["/informasi"]
                ? "bg-blue-900 text-white"
                : "hover:bg-blue-900 hover:text-white"
            }`}
          >
            <ListItemPrefix>
              <NewspaperIcon className="h-5 w-5" />
            </ListItemPrefix>
            Informasi
          </ListItem>
        </Link>
        <Link to={"/kelolakamar"}>
          <ListItem
            className={`${
              activeItems["/kelolakamar"] ||
              activeItems[`/kelolakamar/detail/${params.id}`] ||
              activeItems[`/kelolakamar/ubah/${params.id}`] ||
              activeItems["/kelolakamar/tambah"]
                ? "bg-blue-900 text-white"
                : "hover:bg-blue-900 hover:text-white"
            }`}
          >
            <ListItemPrefix>
              <HomeModernIcon className="h-5 w-5" />
            </ListItemPrefix>
            Kamar
          </ListItem>
        </Link>
      </List>
    </>
  );

  return (
    <>
      <div className="hidden md:block min-h-screen">
        <Card className="w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 h-full">
          {SidebarContent}
        </Card>
      </div>
      <div className="md:hidden">
        <IconButton variant="text" size="lg" onClick={openDrawer}>
          {isDrawerOpen ? (
            <XMarkIcon className="h-8 w-8 stroke-2" />
          ) : (
            <Bars3Icon className="h-8 w-8 stroke-2" />
          )}
        </IconButton>
        <Drawer open={isDrawerOpen} onClose={closeDrawer}>
          <Card
            color="transparent"
            shadow={false}
            className="h-[calc(100vh-2rem)] w-full p-4"
          >
            {SidebarContent}
          </Card>
        </Drawer>
      </div>
    </>
  );
};

export default Sidebar;
