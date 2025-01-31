import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import {
  Button,
  Card,
  CardFooter,
  Chip,
  IconButton,
  Input,
  Option,
  Select,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { EyeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import TopBar from "../component/TopBar";
import { useDispatch } from "react-redux";
import { allmahasiswaSelector } from "../config/redux/mahasiswa/mahasiswaSelector";
import { getAllMahasiswa } from "../config/redux/mahasiswa/mahasiswaThunk";
import { getAllKamar } from "../config/redux/kamar/kamarThunk";

const TABLE_HEAD = [
  "No",
  "Nama",
  "Email",
  "Universitas",
  "Kamar Yang Di Booking",
  "Status",
  "Aksi",
];

const VerifikasiView = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const dispatch = useDispatch();
  const mahasiswa = allmahasiswaSelector();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllMahasiswa());
    dispatch(getAllKamar());
  }, [dispatch]);

  const filteredMahasiswa = mahasiswa.filter((mahasiswa) =>
    mahasiswa.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Hitung indeks item pertama dan terakhir untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMahasiswa.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const isLast = (index) => index === filteredMahasiswa.length - 1;
  return (
    <div className="flex">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="w-full">
        <TopBar />
        <div className="p-5">
          <Typography className=" text-xl">
            Verifikasi Calon Penghuni
          </Typography>
        </div>
        <div className="p-5">
          <div className="md:flex gap-3 justify-between">
            <div className="w-3 flex gap-3 items-center">
              <Typography>Show</Typography>
              <Select
                label="Select Version"
                value="5"
                onChange={(val) => setItemsPerPage(val)}
              >
                <Option value="5">5</Option>
                <Option value="10">10</Option>
                <Option value="30">30</Option>
                <Option value="50">50</Option>
              </Select>
              <Typography>Entries</Typography>
            </div>
            <div className="pt-3 md:pt-0">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                {mahasiswa.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-red-200">
                      Tidak Ada Data Mahasiswa
                    </td>
                  </tr>
                ) : (
                  currentItems.map((mahasiswa, index) => (
                    <tr key={index}>
                      <td
                        className={
                          isLast(index)
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50"
                        }
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      <td
                        className={
                          isLast(index)
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50"
                        }
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {mahasiswa.nama}
                        </Typography>
                      </td>
                      <td
                        className={
                          isLast(index)
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50"
                        }
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {mahasiswa.email}
                        </Typography>
                      </td>
                      <td
                        className={
                          isLast(index)
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50"
                        }
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {mahasiswa.universitas}
                        </Typography>
                      </td>
                      <td
                        className={
                          isLast(index)
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50"
                        }
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {mahasiswa.kamar?.nomor_kamar}
                        </Typography>
                      </td>
                      <td
                        className={
                          isLast(index)
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50"
                        }
                      >
                        <Chip
                          size="sm"
                          variant="ghost"
                          className=" w-max"
                          value={mahasiswa.status}
                          color={
                            mahasiswa.status === "Diterima"
                              ? "green"
                              : mahasiswa.status === "Menunggu"
                              ? "amber"
                              : "red"
                          }
                        />
                      </td>
                      <td
                        className={
                          isLast(index)
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50"
                        }
                      >
                        {mahasiswa.status === "Diterima" ||
                        mahasiswa.status === "Ditolak" ? (
                          <EyeIcon
                            color="blue"
                            className="h-5 w-5 opacity-50"
                          />
                        ) : (
                          <Link
                            to={`/verifikasi/detail/${mahasiswa.id}`}
                            state={mahasiswa}
                          >
                            <Tooltip content="Detail">
                              <EyeIcon
                                color="blue"
                                className="h-5 w-5 cursor-pointer"
                              />
                            </Tooltip>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                Page {currentPage} of{" "}
                {Math.ceil(mahasiswa.length / itemsPerPage)}
              </Typography>
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from(
                    { length: Math.ceil(mahasiswa.length / itemsPerPage) },
                    (_, index) => (
                      <IconButton
                        variant="outlined"
                        size="sm"
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </IconButton>
                    )
                  )}
                </div>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage === Math.ceil(mahasiswa.length / itemsPerPage)
                  }
                >
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

export default VerifikasiView;
