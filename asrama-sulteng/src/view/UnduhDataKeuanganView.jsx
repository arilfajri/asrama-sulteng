import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FunnelIcon } from "@heroicons/react/24/solid";
import TopBar from "../component/TopBar";
import { useDispatch } from "react-redux";
import { getAllKeuangan } from "../config/redux/keuangan/keuanganThunk";
import { keuangandataSelector } from "../config/redux/keuangan/keuanganSelector";

const UnduhDataKeuanganView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllKeuangan());
  }, [dispatch]);
  const keuangan = keuangandataSelector();

  const [showTable, setShowTable] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleShowTable = () => {
    setShowTable(true);
  };

  // Filter laporan keuangan berdasarkan tanggal yang dipilih
  const filteredKeuangan = keuangan.filter((item) => {
    const transactionDate = new Date(item.tanggal);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return transactionDate >= start && transactionDate <= end;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <TopBar />
        <div className="p-5">
          <Typography className="text-xl">Laporan Keuangan Asrama</Typography>
        </div>
        <div className="grid grid-cols-3 gap-3 p-5">
          <div className="col-span-1">
            <Typography className="mb-3">Mulai</Typography>
            <Input
              label="Mulai"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <Typography className="mb-3">Sampai</Typography>
            <Input
              label="Sampai"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
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
            {/* <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300">Tanggal</th>
                  <th className="border border-gray-300">Keterangan</th>
                  <th className="border border-gray-300">Jenis</th>
                  <th className="border border-gray-300">Nominal</th>
                </tr>
              </thead>
              <tbody>
                {filteredKeuangan.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300">{item.tanggal}</td>
                    <td className="border border-gray-300">
                      {item.keterangan}
                    </td>
                    <td className="border border-gray-300">{item.jenis}</td>
                    <td className="border border-gray-300">{item.nominal}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            <Card className="h-full w-full overflow-scroll">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Tanggal
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Keterangan
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Jenis
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Nominal
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKeuangan.map((item, index) => (
                    <tr key={index}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(item.tanggal).toISOString().split("T")[0]}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.keterangan}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.jenis}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.nominal}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
            <div className=" mt-5">
              <Button className="bg-blue-900">Unduh Data</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnduhDataKeuanganView;
