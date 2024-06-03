import React, { useEffect, useState } from "react";
import NavigationBar from "../component/NavigationBar";
import Banner from "../component/Banner";
import {
  Button,
  Card,
  CardFooter,
  IconButton,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { mahasiswaallSelector } from "../config/redux/mahasiswa/mahasiswaSelector";
import { getMahasiswa } from "../config/redux/mahasiswa/mahasiswaThunk";
import { getAllKamar } from "../config/redux/kamar/kamarThunk";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Footer from "../component/Footer";

const MahasiswaView = () => {
  const dispatch = useDispatch();
  const mahasiswaAll = mahasiswaallSelector();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getMahasiswa());
  }, [dispatch]);

  // Filter mahasiswa yang statusnya Diterima
  const mahasiswa = mahasiswaAll.filter(
    (mahasiswa) => mahasiswa.status === "Diterima"
  );

  const filteredMahasiswa = mahasiswa.filter((mahasiswa) =>
    mahasiswa.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hitung indeks item pertama dan terakhir untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = mahasiswa.slice(indexOfFirstItem, indexOfLastItem);

  const currentItems = filteredMahasiswa.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const isLast = (index) => index === filteredMahasiswa.length - 1;
  const TABLE_HEAD = [
    "No",
    "Nama",
    "Jenis Kelamin",
    "Perguruan Tinggi",
    "Program Studi",
    "Angkatan",
  ];

  return (
    <div>
      <NavigationBar />
      <Banner text={"Data Mahasiswa"} />
      <div className="p-5">
        <Typography className="text-xl font-semibold">
          Data Mahasiswa Penghuni Asrama Tora-Tora
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
          <div className=" md:pt-0 pt-3">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="p-5 mb-5">
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
                        {mahasiswa.jenis_kelamin}
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
                        {mahasiswa.jurusan}
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
                        {mahasiswa.angkatan}
                      </Typography>
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
              Page {currentPage} of {Math.ceil(mahasiswa.length / itemsPerPage)}
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
      <Footer />
    </div>
  );
};

export default MahasiswaView;
