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

const TambahKeuanganView = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <NavigationBarAdmin />
        <div className="p-5">
          <Typography className="text-xl">Tambah Transaksi</Typography>
        </div>
        <div className="p-5">
          <div className="flex flex-col gap-5">
            <div className="flex items-center">
              <Typography className="w-96">Tanggal</Typography>
              <Input className="w-full" label="Nama" type="date" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Keterangan</Typography>
              <Textarea label="Keterangan" className="w-full" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Jenis</Typography>
              <div className=" w-full">
                <Radio name="type" label="Pemasukkan" />
                <Radio name="type" label="Pengeluaran" />
              </div>
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Nominal</Typography>
              <Input className="w-full" label="Nominal" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Bukti Transaksi</Typography>
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

export default TambahKeuanganView;
