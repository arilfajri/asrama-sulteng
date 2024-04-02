import React from "react";
import Sidebar from "../component/Sidebar";
import NavigationBarAdmin from "../component/NavigationBarAdmin";
import {
  Button,
  Card,
  CardFooter,
  IconButton,
  Input,
  Option,
  Select,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  EyeIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const KeuanganView = () => {
  const TABLE_HEAD = [
    "No",
    "Tanggal",
    "Keterangan",
    "Pemasukkan",
    "Pengeluaran",
    "Aksi",
  ];

  const TABLE_ROWS = [
    {
      no: "1",
      tanggal: "21/07/2023",
      keterangan: "beli listrik",
      pemasukkan: "20.000",
      pengeluaran: "20.000",
    },
    {
      no: "2",
      tanggal: "21/07/2023",
      keterangan: "beli listrik",
      pemasukkan: "20.000",
      pengeluaran: "20.000",
    },
    {
      no: "3",
      tanggal: "21/07/2023",
      keterangan: "beli listrik",
      pemasukkan: "20.000",
      pengeluaran: "20.000",
    },
    {
      no: "4",
      tanggal: "21/07/2023",
      keterangan: "beli listrik",
      pemasukkan: "20.000",
      pengeluaran: "20.000",
    },
    {
      no: "5",
      tanggal: "21/07/2023",
      keterangan: "beli listrik",
      pemasukkan: "20.000",
      pengeluaran: "20.000",
    },
  ];
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <NavigationBarAdmin />
          <div className="p-5">
            <Typography className=" text-xl">Uang Kas Asrama</Typography>
          </div>
          <div className="px-5 flex gap-5">
            <Link to={"/keuangan/tambah"}>
              <Button color="green">Tambah Data</Button>
            </Link>
            <Link to={"/keuangan/unduh"}>
              <Button color="green">Unduh Data</Button>
            </Link>
          </div>
          <div className="p-5">
            <div className="flex gap-3 justify-between">
              <div className="w-3 flex gap-3 items-center">
                <Typography>Show</Typography>
                <Select label="Select Version">
                  <Option>10</Option>
                  <Option>30</Option>
                  <Option>50</Option>
                </Select>
                <Typography>Entries</Typography>
              </div>
              <div>
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </div>
          <div className="p-5">
            <Card className="h-full w-full overflow-scroll">
              <table className="w-full min-w-max table-auto text-left">
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
                  {TABLE_ROWS.map(
                    (
                      { no, tanggal, keterangan, pemasukkan, pengeluaran },
                      index
                    ) => {
                      const isLast = index === TABLE_ROWS.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={no}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {no}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {tanggal}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {keterangan}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="green"
                              className="font-normal"
                            >
                              {pemasukkan}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="red"
                              className="font-normal"
                            >
                              {pengeluaran}
                            </Typography>
                          </td>

                          <td className={classes}>
                            <div className="flex gap-2">
                              <Link to={"/keuangan/ubah"}>
                                <Tooltip content="Ubah">
                                  <PencilSquareIcon
                                    color="green"
                                    className="h-5 w-5 cursor-pointer"
                                  />
                                </Tooltip>
                              </Link>
                              <Tooltip content="Hapus">
                                <TrashIcon
                                  color="red"
                                  className="h-5 w-5 cursor-pointer"
                                />
                              </Tooltip>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
              <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                  <Button variant="outlined" size="sm">
                    Previous
                  </Button>
                  <div className="flex items-center gap-2">
                    <IconButton variant="outlined" size="sm">
                      1
                    </IconButton>
                    <IconButton variant="text" size="sm">
                      2
                    </IconButton>
                    <IconButton variant="text" size="sm">
                      3
                    </IconButton>
                    <IconButton variant="text" size="sm">
                      ...
                    </IconButton>
                    <IconButton variant="text" size="sm">
                      8
                    </IconButton>
                    <IconButton variant="text" size="sm">
                      9
                    </IconButton>
                    <IconButton variant="text" size="sm">
                      10
                    </IconButton>
                  </div>
                  <Button variant="outlined" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeuanganView;
