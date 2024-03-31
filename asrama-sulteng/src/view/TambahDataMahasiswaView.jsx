import React from "react";
import Sidebar from "../component/Sidebar";
import NavigationBarAdmin from "../component/NavigationBarAdmin";
import { Button, Input, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const TambahDataMahasiswaView = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <NavigationBarAdmin />
        <div className="p-5">
          <Typography className="text-xl">Data Penghuni Asrama</Typography>
        </div>
        <div className="p-5">
          <div className="flex flex-col gap-5">
            <div className="flex items-center">
              <Typography className="w-96">Nama</Typography>
              <Input className="w-full" label="Nama" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Jenis Kelamin</Typography>
              <Input className="w-full" label="Jenis Kelamin" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Tempat Lahir</Typography>
              <Input className="w-full" label="Tempat Lahir" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Tanggal Lahir</Typography>
              <Input className="w-full" label="Tanggal Lahir" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Email</Typography>
              <Input className="w-full" label="Email" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">No. Hp</Typography>
              <Input className="w-full" label="No.Hp" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Alamat Asal</Typography>
              <Input className="w-full" label="Alamat" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Universitas</Typography>
              <Input className="w-full" label="Kampus" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Jurusan</Typography>
              <Input className="w-full" label="Jurusan" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Angkatan</Typography>
              <Input className="w-full" label="Angkatan" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Kamar Yang Di Booking</Typography>
              <Input className="w-full" label="Kamar" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">KTP</Typography>
              <Input className="w-full" type="file" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Kartu Keluarga</Typography>
              <Input className="w-full" type="file" label="KK" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Surat Ket.Aktif Kuliah</Typography>
              <Input className="w-full" type="file" label="Ket.Aktif Kuliah" />
            </div>
          </div>
        </div>
        <div className="p-5 flex gap-3">
          <Link to={"/datamahasiswa"}>
            <Button className="bg-blue-900">Tambah Data</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TambahDataMahasiswaView;
