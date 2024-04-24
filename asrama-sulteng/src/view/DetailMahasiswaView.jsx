import React from "react";
import Sidebar from "../component/Sidebar";
import { Button, Input, Typography } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import TopBar from "../component/TopBar";

const DetailMahasiswaView = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
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
              <Input className="w-full" value={data?.nama} label="Nama" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Jenis Kelamin</Typography>
              <Input
                className="w-full"
                value={data?.jenis_kelamin}
                label="Jenis Kelamin"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Tempat Lahir</Typography>
              <Input
                className="w-full"
                value={data?.tempat_lahir}
                label="Tempat Lahir"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Tanggal Lahir</Typography>
              <Input
                className="w-full"
                value={data?.tanggal_lahir}
                label="Tanggal Lahir"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Email</Typography>
              <Input className="w-full" value={data?.email} label="Email" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">No. Hp</Typography>
              <Input className="w-full" value={data?.no_hp} label="No.Hp" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Alamat Asal</Typography>
              <Input
                className="w-full"
                value={data?.alamat_asal}
                label="Alamat"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Universitas</Typography>
              <Input
                className="w-full"
                value={data?.universitas}
                label="Kampus"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Jurusan</Typography>
              <Input className="w-full" value={data?.jurusan} label="Jurusan" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Angkatan</Typography>
              <Input
                className="w-full"
                value={data?.angkatan}
                label="Angkatan"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Kamar Yang Di Booking</Typography>
              <Input
                className="w-full"
                value={data?.kamar?.nomor_kamar}
                label="Kamar"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">KTP</Typography>
              <Input className="w-full" value={data?.ktp} label="KTP" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Kartu Keluarga</Typography>
              <Input
                className="w-full"
                value={data?.kartu_keluarga}
                label="KK"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Surat Ket.Aktif Kuliah</Typography>
              <Input
                className="w-full"
                value={data?.surat_ket_aktif_kuliah}
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
