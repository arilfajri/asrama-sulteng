import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  ClipboardDocumentCheckIcon,
  CircleStackIcon,
  BanknotesIcon,
  NewspaperIcon,
} from "@heroicons/react/24/solid";
import logo from "../assets/logo-asrama.png";

const Sidebar = () => {
  return (
    <div>
      <Card className="w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 h-full">
        <div className="mb-2 p-4 flex flex-col justify-center items-center">
          <img src={logo} alt="" className="w-16" />
          <Typography variant="h6" className=" text-blue-800 mt-6">
            ASRAMA
          </Typography>
          <Typography variant="h6" className=" text-black">
            TORA-TORA
          </Typography>
        </div>
        <List className="text-black">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ClipboardDocumentCheckIcon className="h-5 w-5" />
            </ListItemPrefix>
            Verifikasi
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <CircleStackIcon className="h-5 w-5" />
            </ListItemPrefix>
            Data Mahasiswa
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <BanknotesIcon className="h-5 w-5" />
            </ListItemPrefix>
            Uang Kas
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <NewspaperIcon className="h-5 w-5" />
            </ListItemPrefix>
            Informasi
          </ListItem>
        </List>
      </Card>
    </div>
  );
};

export default Sidebar;
