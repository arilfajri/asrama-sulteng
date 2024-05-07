import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { Button, Card, Typography } from "@material-tailwind/react";
import TopBar from "../component/TopBar";
import { getMe } from "../config/redux/auth/authThunk";
import { useDispatch } from "react-redux";

const DashboardView = () => {
  const TABLE_HEAD = ["Name", "Job", "Employed", ""];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const TABLE_ROWS = [
    {
      name: "John Michael",
      job: "Manager",
      date: "23/04/18",
    },
    {
      name: "Alexa Liras",
      job: "Developer",
      date: "23/04/18",
    },
    {
      name: "Laurent Perrier",
      job: "Executive",
      date: "19/09/17",
    },
    {
      name: "Michael Levi",
      job: "Developer",
      date: "24/12/08",
    },
    {
      name: "Richard Gran",
      job: "Manager",
      date: "04/10/21",
    },
  ];
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <TopBar />
        <div className="flex items-center justify-between p-5">
          <Typography className=" text-xl">Dashboard</Typography>
          <Button
            className="bg-abuAbu text-black capitalize"
            variant="outlined"
          >
            Lihat Detail
          </Button>
        </div>
        <div className=" grid grid-cols-3 gap-4 p-5">
          <div className="bg-red-500 text-white flex px-12 py-10 gap-5 justify-center items-center rounded-lg">
            <BanknotesIcon className="h-16 w-16" />
            <div>
              <Typography>Pengeluaran</Typography>
              <Typography>Rp 999.999.999</Typography>
            </div>
          </div>
          <div className=" bg-green-500 text-white flex px-12 py-10 gap-5 justify-center items-center rounded-lg">
            <CurrencyDollarIcon className="h-16 w-16" />
            <div>
              <Typography>Pengeluaran</Typography>
              <Typography>Rp 999.999.999</Typography>
            </div>
          </div>
          <div className="bg-blue-500 text-white flex px-12 py-10 gap-5 justify-center items-center rounded-lg">
            <BanknotesIcon className="h-16 w-16" />
            <div>
              <Typography>Pengeluaran</Typography>
              <Typography>Rp 999.999.999</Typography>
            </div>
          </div>
        </div>
        <div className="p-5 flex gap-5">
          <Card className="h-full w-2/3 shadow-none">
            <Typography className=" py-2">
              Daftar Calon Penghuni Yang Belum Di Verifikasi
            </Typography>
            <table className="table-auto text-left w-full">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(({ name, job, date }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {job}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
          <div className="w-1/3 bg-orangeAsrama2 rounded-lg flex flex-col justify-center items-center text-white">
            <Typography className=" text-2xl font-bold">
              Jumlah Mahasiswa{" "}
            </Typography>
            <Typography className=" text-2xl font-bold">
              Penguni Asrama
            </Typography>
            <Typography className=" text-5xl font-bold mt-5">100</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
