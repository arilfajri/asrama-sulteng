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

const DataMahasiswaView = () => {
  const TABLE_HEAD = [
    "No",
    "Nama",
    "Email",
    "Universitas",
    "Kamar",
    "No.Hp",
    "Aksi",
  ];

  const TABLE_ROWS = [
    {
      no: "1",
      nama: "John Michael",
      email: "example@gmail.com",
      universitas: "Universitas Pasundan",
      kamar: "A",
      hp: "082188216081",
    },
    {
      no: "1",
      nama: "Alexa Liras",
      email: "example@gmail.com",
      universitas: "Unikom",
      kamar: "A1",
      hp: "082188216081",
    },
    {
      no: "2",
      nama: "Laurent Perrier",
      email: "example@gmail.com",
      universitas: "Universitas Telkom",
      kamar: "A2",
      hp: "082188216081",
    },
    {
      no: "3",
      nama: "Michael Levi",
      email: "example@gmail.com",
      universitas: "Universitas Pendidikan Indonesia",
      kamar: "A3",
      hp: "082188216081",
    },
    {
      no: "4",
      nama: "Areel",
      email: "example@gmail.com",
      universitas: "Universitas Padjajaran",
      kamar: "A3",
      hp: "082188216081",
    },
  ];
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <NavigationBarAdmin />
        <div className="p-5">
          <Typography className=" text-xl">
            Mahasiswa Penghuni Asrama
          </Typography>
        </div>
        <div className="px-5 flex gap-5">
          <Button color="green">Tambah Data</Button>
          <Button color="green">Unduh Data</Button>
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
                  ({ no, nama, email, universitas, kamar, hp }, index) => {
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
                            {nama}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {email}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {universitas}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-center"
                          >
                            {kamar}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {hp}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="flex gap-2 justify-center">
                            <Link to={"/verifikasi/detail"}>
                              <Tooltip content="Detail">
                                <EyeIcon
                                  color="blue"
                                  className="h-5 w-5 cursor-pointer"
                                />
                              </Tooltip>
                            </Link>
                            <Tooltip content="Ubah">
                              <PencilSquareIcon
                                color="green"
                                className="h-5 w-5 cursor-pointer"
                              />
                            </Tooltip>
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
  );
};

export default DataMahasiswaView;
