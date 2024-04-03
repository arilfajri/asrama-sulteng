import React from "react";
import Sidebar from "../component/Sidebar";
import NavigationBarAdmin from "../component/NavigationBarAdmin";
import {
  Button,
  Input,
  Radio,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const InformasiView = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <NavigationBarAdmin />
        <div className="p-5">
          <Typography className="text-xl">
            Ubah Isi Informasi Yang Di Tampilkan
          </Typography>
        </div>
        <div className="p-5">
          <div className="flex flex-col gap-5">
            <div className="flex items-center">
              <Typography className="w-96">Banner</Typography>
              <Input className="w-full" type="file" label="Banner" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Deskripsi Singkat</Typography>
              <Textarea label="Deskripsi Singkat" className="w-full" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Foto Deskripsi</Typography>
              <Input className="w-full" type="file" label="Foto Deskripsi" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Visi</Typography>
              <Textarea label="Visi" className="w-full" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Misi</Typography>
              <Textarea label="Misi" className="w-full" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Alamat</Typography>
              <Input className="w-full" label="Alamat" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Kontak</Typography>
              <div className=" flex flex-col w-full gap-2">
                <Input label="Email asrama" />
                <Input label="No.hp asrama" />
              </div>
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Struktur Organisasi</Typography>
              <Input
                className="w-full"
                type="file"
                label="Struktur Organisasi"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Biaya</Typography>
              <Input label="Biaya" className="w-full" />
            </div>
          </div>
        </div>
        <div className="p-5 flex gap-3">
          <Link to={"/datamahasiswa"}>
            <Button className="bg-blue-900">Ubah Informasi</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InformasiView;
