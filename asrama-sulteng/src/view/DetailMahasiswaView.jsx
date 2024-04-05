import React from "react";
import Sidebar from "../component/Sidebar";
import { Button, Input, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import TopBar from "../component/TopBar";

const DetailMahasiswaView = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <TopBar />
        <div className="p-5">
          <Typography className="text-xl">Data Penghuni Asrama</Typography>
        </div>
        <div className="p-5">
          <div className="flex flex-col gap-5">
            <div className="flex items-center">
              <Typography className="w-96">Nama</Typography>
              <Input
                className="w-full"
                value={"Aril Fajri Tolani"}
                label="Nama"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Jenis Kelamin</Typography>
              <Input
                className="w-full"
                value={"Laki - Laki"}
                label="Jenis Kelamin"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Tempat Lahir</Typography>
              <Input
                className="w-full"
                value={"Banggai"}
                label="Tempat Lahir"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Tanggal Lahir</Typography>
              <Input
                className="w-full"
                value={"21/07/2002"}
                label="Tanggal Lahir"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Email</Typography>
              <Input
                className="w-full"
                value={"arielmunchen60@gmail.com"}
                label="Email"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">No. Hp</Typography>
              <Input className="w-full" value={"082188216081"} label="No.Hp" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Alamat Asal</Typography>
              <Input className="w-full" value={"Banggai Laut"} label="Alamat" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Universitas</Typography>
              <Input
                className="w-full"
                value={"Universitas Pasundan"}
                label="Kampus"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Jurusan</Typography>
              <Input
                className="w-full"
                value={"Teknik Informatika"}
                label="Jurusan"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Angkatan</Typography>
              <Input className="w-full" value={"2020"} label="Angkatan" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Kamar Yang Di Booking</Typography>
              <Input className="w-full" value={"A1"} label="Kamar" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">KTP</Typography>
              <Input className="w-full" value={"File KTP"} label="KTP" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Kartu Keluarga</Typography>
              <Input
                className="w-full"
                value={"File Kartu Keluarga"}
                label="KK"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Surat Ket.Aktif Kuliah</Typography>
              <Input
                className="w-full"
                value={"File Suat Ket.Aktif Kuliah"}
                label="Ket.Aktif Kuliah"
              />
            </div>
          </div>
        </div>
        <div className="p-5 flex gap-3">
          <Link to={"/datamahasiswa"}>
            <Button className="bg-blue-900">Kembali</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailMahasiswaView;
