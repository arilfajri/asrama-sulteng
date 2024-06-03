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
  CheckBadgeIcon,
  HomeModernIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import logo from "../assets/logo-asrama.png";
import { Link, useLocation, useParams } from "react-router-dom";

const SidebarCalonPenghuni = () => {
  const params = useParams();
  const [activeItems, setActiveItems] = useState({
    "/kamar": false,
    "/status": false,
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
        <Link to={"/kamar"}>
          <ListItem
            className={`${
              activeItems["/kamar"] ||
              activeItems[`/kamar/detail/${params.id}`] ||
              activeItems[`/kamar/detail/${params.id}/daftar`]
                ? "bg-blue-900 text-white"
                : "hover:bg-blue-900 hover:text-white"
            }`}
          >
            <ListItemPrefix>
              <HomeModernIcon className="h-5 w-5" />
            </ListItemPrefix>
            Kamar Tersedia
          </ListItem>
        </Link>
        <Link to={"/status"}>
          <ListItem
            className={`${
              activeItems["/status"]
                ? "bg-blue-900 text-white"
                : "hover:bg-blue-900 hover:text-white"
            }`}
          >
            <ListItemPrefix>
              <CheckBadgeIcon className="h-5 w-5" />
            </ListItemPrefix>
            Status Booking
          </ListItem>
        </Link>
      </List>
    </>
  );

  return (
    <>
      <div className="hidden md:block">
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

export default SidebarCalonPenghuni;
