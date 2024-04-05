import React from "react";
import SidebarCalonPenghuni from "../component/SidebarCalonPenghuni";
import TopBar from "../component/TopBar";
import {
  Dialog,
  DialogBody,
  Typography,
  Card,
  Button,
} from "@material-tailwind/react";
import meja from "../assets/meja.png";
import kursi from "../assets/kursi.png";
import lemari from "../assets/lemari.png";
import kasur from "../assets/kasur.png";
import { Link } from "react-router-dom";

const DetailKamarView = () => {
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);
  return (
    <div className="flex">
      <SidebarCalonPenghuni />
      <div className="w-full">
        <TopBar />
        <div className="p-5">
          <Typography className="text-xl">Informasi Kamar</Typography>
        </div>
        <div className="p-5">
          <Card
            className="h-96 w-full cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
            onClick={handleOpen}
          >
            <img
              alt="nature"
              className="h-full w-full object-cover object-center"
              src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
            />
          </Card>
          <Dialog size="lg" open={open} handler={handleOpen}>
            <DialogBody>
              <img
                alt="nature"
                className=" w-full rounded-lg object-cover object-center"
                src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
              />
            </DialogBody>
          </Dialog>
        </div>
        <div className="p-5">
          <Typography className="text-lg">Kamar A-1</Typography>
          <Typography>Fasilitas:</Typography>
          <Typography>Tempat Tidur, Meja, Lemari, Kursi</Typography>
          <div className="flex gap-16 h-14 w-14 mt-3">
            <img src={kasur} alt="" />
            <img src={meja} alt="" />
            <img src={lemari} alt="" />
            <img src={kursi} alt="" />
          </div>
        </div>
        <div className="p-5">
          <Link to="/kamar/detail/daftar">
            <Button className=" bg-blue-900">Lanjut</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailKamarView;
