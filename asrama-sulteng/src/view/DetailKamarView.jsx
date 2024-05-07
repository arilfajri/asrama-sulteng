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
import { Link, useLocation } from "react-router-dom";

const DetailKamarView = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const location = useLocation();
  const data = location.state;
  console.log(data);

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
              src={data?.gambar}
            />
          </Card>
          <Dialog size="lg" open={open} handler={handleOpen}>
            <DialogBody>
              <img
                alt="nature"
                className=" w-full rounded-lg object-cover object-center"
                src={data?.gambar}
              />
            </DialogBody>
          </Dialog>
        </div>
        <div className="p-5">
          <Typography className="text-lg">Kamar {data?.nomor_kamar}</Typography>
          <Typography>Fasilitas:</Typography>
          <Typography>{data?.fasilitas}</Typography>
          <div className="flex gap-16 h-14 w-14 mt-3">
            {data?.fasilitas.includes("Kasur") && (
              <img src={kasur} alt="Kasur" />
            )}
            {data?.fasilitas.includes("Meja") && <img src={meja} alt="Meja" />}
            {data?.fasilitas.includes("Lemari") && (
              <img src={lemari} alt="Lemari" />
            )}
            {data?.fasilitas.includes("Kursi") && (
              <img src={kursi} alt="Kursi" />
            )}
          </div>
        </div>
        <div className="p-5">
          <Link to={`/kamar/detail/${data.id}/daftar`} state={data}>
            <Button className=" bg-blue-900">Lanjut</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailKamarView;
