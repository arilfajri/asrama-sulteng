import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import NavigationBarAdmin from "../component/NavigationBarAdmin";
import { Button, Input, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FunnelIcon } from "@heroicons/react/24/solid";

const UnduhDataKeuanganView = () => {
  const [showTable, setShowTable] = useState(false);

  const handleShowTable = () => {
    setShowTable(true);
    // Di sini Anda bisa menambahkan logika untuk menampilkan tabel berdasarkan data dari server atau sesuai kebutuhan aplikasi Anda
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <NavigationBarAdmin />
        <div className="p-5">
          <Typography className="text-xl">Laporan Keuangan Asrama</Typography>
        </div>
        <div className="grid grid-cols-3 gap-3 p-5">
          <div className="col-span-1">
            <Typography className="mb-3">Mulai</Typography>
            <Input label="Mulai" type="date" />
          </div>
          <div className="col-span-1">
            <Typography className="mb-3">Sampai</Typography>
            <Input label="Sampai" type="date" />
          </div>
          <div className="col-span-1 flex items-end">
            <Button
              className="bg-blue-900 w-full flex justify-center items-center text-sm gap-3"
              onClick={handleShowTable}
            >
              <FunnelIcon className="h-5 w-5" />
              Tampilkan
            </Button>
          </div>
        </div>

        {showTable && (
          <div className="p-5">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300">Kolom 1</th>
                  <th className="border border-gray-300">Kolom 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300">Data 1</td>
                  <td className="border border-gray-300">Data 2</td>
                </tr>
              </tbody>
            </table>
            <div className=" mt-5">
              <Link to={"/datamahasiswa"}>
                <Button className="bg-blue-900">Unduh Data</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnduhDataKeuanganView;
