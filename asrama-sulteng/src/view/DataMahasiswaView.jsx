import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
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
import TopBar from "../component/TopBar";
import { useDispatch } from "react-redux";
import { allmahasiswaSelector } from "../config/redux/mahasiswa/mahasiswaSelector";
import {
  deleteMahasiswa,
  getAllMahasiswa,
} from "../config/redux/mahasiswa/mahasiswaThunk";
import { getAllKamar } from "../config/redux/kamar/kamarThunk";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const DataMahasiswaView = () => {
  const dispatch = useDispatch();
  const mahasiswaAll = allmahasiswaSelector();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllMahasiswa());
    dispatch(getAllKamar());
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
    "Email",
    "Universitas",
    "Kamar",
    "No.Hp",
    "Aksi",
  ];

  const exportToExcel = () => {
    const data = filteredMahasiswa.map((mahasiswa, index) => ({
      No: index + 1,
      Nama: mahasiswa.nama,
      "Jenis Kelamin": mahasiswa.jenis_kelamin,
      "Tempat Lahir": mahasiswa.tempat_lahir,
      "Tanggal Lahir": mahasiswa.tanggal_lahir,
      Email: mahasiswa.email,
      "No Hp": mahasiswa.no_hp,
      "Alamat Asal": mahasiswa.alamat_asal,
      Universitas: mahasiswa.universitas,
      Jurusan: mahasiswa.jurusan,
      Angkatan: mahasiswa.jurusan,
      "Nomor Kamar": mahasiswa.kamar?.nomor_kamar || "",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Mahasiswa");

    XLSX.writeFile(wb, "mahasiswa.xlsx");
  };

  const handleDeleteMahasiswa = (id) => {
    Swal.fire({
      title: "Apakah anda yakin ingin menhapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Tidak, batalkan!",
      confirmButtonText: "Iya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Terhapus!",
          text: "Data Kamu Telah Terhapus",
          icon: "success",
        });
        dispatch(deleteMahasiswa(id))
          .then(() => {
            dispatch(getAllKamar());
            dispatch(getAllMahasiswa());
          })
          .catch((error) => {
            console.error("Error deleting kamar:", error);
          });
      }
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <TopBar />
        <div className="p-5">
          <Typography className=" text-xl">
            Mahasiswa Penghuni Asrama
          </Typography>
        </div>
        <div className="px-5 flex gap-5">
          <Link to={"/datamahasiswa/tambah"}>
            <Button color="green">Tambah Data</Button>
          </Link>
          <Button color="green" onClick={exportToExcel}>
            Unduh Data
          </Button>
        </div>
        <div className="p-5">
          <div className="flex gap-3 justify-between">
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
            <div>
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
                {currentItems.map((mahasiswa, index) => (
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
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {mahasiswa.no_hp}
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
                        <Link
                          to={`/datamahasiswa/detail/${mahasiswa.id}`}
                          state={mahasiswa}
                        >
                          <Tooltip content="Detail">
                            <EyeIcon
                              color="blue"
                              className="h-5 w-5 cursor-pointer"
                            />
                          </Tooltip>
                        </Link>
                        <Link
                          to={`/datamahasiswa/ubah/${mahasiswa.id}`}
                          state={mahasiswa}
                        >
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
                            onClick={() => handleDeleteMahasiswa(mahasiswa.id)}
                          />
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
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

export default DataMahasiswaView;
