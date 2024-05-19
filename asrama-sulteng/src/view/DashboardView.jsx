import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import { CurrencyDollarIcon, EyeIcon } from "@heroicons/react/24/solid";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardFooter,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import TopBar from "../component/TopBar";
import { getMe } from "../config/redux/auth/authThunk";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllKeuangan } from "../config/redux/keuangan/keuanganThunk";
import { getAllMahasiswa } from "../config/redux/mahasiswa/mahasiswaThunk";
import { allmahasiswaSelector } from "../config/redux/mahasiswa/mahasiswaSelector";
import { keuangandataSelector } from "../config/redux/keuangan/keuanganSelector";

const DashboardView = () => {
  const TABLE_HEAD = ["Nama", "Universitas", "Kamar Yang Di Booking", ""];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
    dispatch(getAllKeuangan());
    dispatch(getAllMahasiswa());
  }, [dispatch]);

  const mahasiswaAll = allmahasiswaSelector();
  const keuangan = keuangandataSelector();

  // Filter data keuangan berdasarkan jenisnya
  const pemasukkan = keuangan.filter((item) => item.jenis === "Pemasukkan");
  const pengeluaran = keuangan.filter((item) => item.jenis === "Pengeluaran");

  // Hitung total nominal pemasukkan dan pengeluaran
  const totalPemasukkan = pemasukkan.reduce(
    (total, item) => total + item.nominal,
    0
  );
  const totalPengeluaran = pengeluaran.reduce(
    (total, item) => total + item.nominal,
    0
  );

  const saldo = totalPemasukkan - totalPengeluaran;
  console.log("Pemasukkan", totalPemasukkan);
  console.log("Pengeluaran", totalPengeluaran);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter mahasiswa yang statusnya menunggu
  const mahasiswa = mahasiswaAll.filter(
    (mahasiswa) => mahasiswa.status === "Menunggu"
  );
  // Filter mahasiswa yang statusnya menunggu
  const mahasiswaPenghuni = mahasiswaAll.filter(
    (mahasiswa) => mahasiswa.status === "Diterima"
  );

  // Hitung indeks item pertama dan terakhir untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mahasiswa.slice(indexOfFirstItem, indexOfLastItem);

  // Mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const isLast = (index) => index === mahasiswa.length - 1;
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <TopBar />
        <div className="flex items-center justify-between p-5">
          <Typography className=" text-xl">Dashboard</Typography>
          <Link to="/keuangan">
            <Button
              className="bg-abuAbu text-black capitalize"
              variant="outlined"
            >
              Lihat Detail
            </Button>
          </Link>
        </div>
        <div className=" grid grid-cols-3 gap-4 p-5">
          <div className="bg-red-500 text-white flex px-12 py-10 gap-5 justify-center items-center rounded-lg">
            <BanknotesIcon className="h-16 w-16" />
            <div>
              <Typography>Pengeluaran</Typography>
              <Typography>Rp {totalPengeluaran.toLocaleString()}</Typography>
            </div>
          </div>
          <div className=" bg-green-500 text-white flex px-12 py-10 gap-5 justify-center items-center rounded-lg">
            <CurrencyDollarIcon className="h-16 w-16" />
            <div>
              <Typography>Pemasukkan</Typography>
              <Typography>Rp {totalPemasukkan.toLocaleString()}</Typography>
            </div>
          </div>
          <div className="bg-blue-500 text-white flex px-12 py-10 gap-5 justify-center items-center rounded-lg">
            <BanknotesIcon className="h-16 w-16" />
            <div>
              <Typography>Saldo</Typography>
              <Typography>Rp {saldo.toLocaleString()}</Typography>
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
                {mahasiswa.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-red-200">
                      Tidak Ada Calon Penghuni Yang Belum Di Verifikasi
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
                          {mahasiswa.kamar.nomor_kamar}
                        </Typography>
                      </td>

                      <td
                        className={
                          isLast(index)
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50"
                        }
                      >
                        <div className="flex gap-2 ">
                          <Link to={`/verifikasi`}>
                            <Tooltip content="Detail">
                              <EyeIcon
                                color="blue"
                                className="h-5 w-5 cursor-pointer"
                              />
                            </Tooltip>
                          </Link>
                        </div>
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
          <div className="w-1/3 bg-orangeAsrama2 rounded-lg flex flex-col justify-center items-center text-white">
            <Typography className=" text-2xl font-bold">
              Jumlah Mahasiswa{" "}
            </Typography>
            <Typography className=" text-2xl font-bold">
              Penguni Asrama
            </Typography>
            <Typography className=" text-5xl font-bold mt-5">
              {mahasiswaPenghuni.length}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
