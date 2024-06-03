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
import Sidebar from "../component/Sidebar";

const DetailKelolaKamarView = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const location = useLocation();
  const data = location.state;
  console.log(data);

  return (
    <div className="flex">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
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
          <Typography className=" text-xl font-bold">
            Kamar {data?.nomor_kamar}
          </Typography>
          <Typography className=" font-semibold">
            Penghuni:{" "}
            {data?.mahasiswa?.nama
              ? data?.mahasiswa?.nama
              : "Tidak ada penghuni"}
          </Typography>
          <Typography>Fasilitas:</Typography>
          <Typography>
            {data?.fasilitas ? data?.fasilitas : "Tidak Ada Fasilitas"}
          </Typography>
          <div className="flex gap-16 flex-wrap mt-3">
            {data?.fasilitas && data.fasilitas.length > 0 ? (
              <>
                {data.fasilitas.includes("Kasur") && (
                  <img src={kasur} alt="Kasur" className="w-14 h-14" />
                )}
                {data.fasilitas.includes("Meja") && (
                  <img src={meja} alt="Meja" className="w-14 h-14" />
                )}
                {data.fasilitas.includes("Lemari") && (
                  <img src={lemari} alt="Lemari" className="w-14 h-14" />
                )}
                {data.fasilitas.includes("lemari") && (
                  <img src={lemari} alt="Lemari" className="w-14 h-14" />
                )}
                {data.fasilitas.includes("Kursi") && (
                  <img src={kursi} alt="Kursi" className="w-14 h-14" />
                )}
              </>
            ) : (
              <Typography></Typography>
            )}
          </div>
        </div>
        <div className="p-5">
          <Link to={"/kelolakamar"} state={data}>
            <Button className=" bg-blue-900">Kembali</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailKelolaKamarView;
