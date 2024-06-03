import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import {
  Button,
  Card,
  CardFooter,
  Chip,
  Dialog,
  DialogBody,
  IconButton,
  Input,
  Option,
  Select,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import TopBar from "../component/TopBar";
import {
  deleteKeuangan,
  getAllKeuangan,
} from "../config/redux/keuangan/keuanganThunk";
import { keuangandataSelector } from "../config/redux/keuangan/keuanganSelector";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const KeuanganView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllKeuangan());
  }, [dispatch]);
  const keuangan = keuangandataSelector();
  console.log(keuangan);

  // State untuk mengontrol apakah dialog terbuka untuk setiap item dalam daftar
  const [openDialogs, setOpenDialogs] = useState(
    Array(keuangan.length).fill(false)
  );

  const [searchTerm, setSearchTerm] = useState("");

  // Fungsi untuk menangani pembukaan dialog untuk item tertentu
  const handleOpenDialog = (index) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = true;
    setOpenDialogs(newOpenDialogs);
  };
  const handleCloseDialog = (index) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = false;
    setOpenDialogs(newOpenDialogs);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Hitung indeks item pertama dan terakhir untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredTransaksi = keuangan
    .filter((keuangan) => {
      const keuanganDate = new Date(keuangan.tanggal);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      const matchesDateRange =
        (!start || keuanganDate >= start) && (!end || keuanganDate <= end);
      const matchesSearchTerm = keuangan.keterangan
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesDateRange && matchesSearchTerm;
    })
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  const currentItems = filteredTransaksi.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const isLast = (index) => index === keuangan.length - 1;

  const exportToExcel = () => {
    // Hitung total pemasukkan dan pengeluaran
    let totalPemasukkan = 0;
    let totalPengeluaran = 0;
    filteredTransaksi.forEach((transaksi) => {
      if (transaksi.jenis.toLowerCase() === "pemasukkan") {
        totalPemasukkan += transaksi.nominal;
      } else {
        totalPengeluaran += transaksi.nominal;
      }
    });

    // Data transaksi
    const data = filteredTransaksi.map((transaksi, index) => ({
      No: index + 1,
      Tanggal: transaksi.tanggal,
      Keterangan: transaksi.keterangan,
      Pemasukkan:
        transaksi.jenis.toLowerCase() === "pemasukkan"
          ? transaksi.nominal
          : "-",
      Pengeluaran:
        transaksi.jenis.toLowerCase() === "pengeluaran"
          ? transaksi.nominal
          : "-",
    }));

    // Tambahkan baris untuk total pemasukkan dan pengeluaran
    data.push(
      {
        No: "",
        Tanggal: "",
        Keterangan: "Total Pemasukkan:",
        Pemasukkan: totalPemasukkan,
        Pengeluaran: "",
      },
      {
        No: "",
        Tanggal: "",
        Keterangan: "Total Pengeluaran:",
        Pemasukkan: "",
        Pengeluaran: totalPengeluaran,
      }
    );

    // Buat file Excel
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Laporan Keuangan");

    XLSX.writeFile(wb, "laporan_keuangan.xlsx");
  };

  const TABLE_HEAD = [
    "No",
    "Tanggal",
    "Keterangan",
    "Pemasukkan",
    "Pengeluaran",
    "Bukti Transaksi",
    "Aksi",
  ];

  const handleDeleteKeuangan = (id) => {
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
        dispatch(deleteKeuangan(id))
          .then(() => {
            dispatch(getAllKeuangan());
          })
          .catch((error) => {
            console.error("Error deleting kamar:", error);
          });
      }
    });
  };

  const formatDate = (dateString) => {
    // Create a new Date object from the dateString
    const date = new Date(dateString);
    // Format the date using toLocaleDateString with the appropriate options
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div>
      <div className="flex">
        <div className="hidden md:flex">
          <Sidebar />
        </div>
        <div className="w-full">
          <TopBar />
          <div className="p-5">
            <Typography className=" text-xl">Uang Kas Asrama</Typography>
          </div>
          <div className="px-5 flex gap-5">
            <Link to={"/keuangan/tambah"}>
              <Button color="green">Tambah Data</Button>
            </Link>
            <Button color="green" onClick={exportToExcel}>
              Unduh Data
            </Button>
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
              <div className=" pt-3 md:pt-0">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 px-5">
            <div className="col-span-1">
              <Input
                label="Tanggal Mulai"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <Input
                label="Tanggal Akhir"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
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
                  {keuangan.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-4 text-center text-red-200">
                        Tidak Ada Data Keuangan
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((keuangan, index) => (
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
                            {formatDate(keuangan.tanggal)}
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
                            {keuangan.keterangan}
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
                            color="green"
                            value={
                              keuangan.jenis === "Pemasukkan"
                                ? keuangan.nominal.toLocaleString()
                                : "-"
                            }
                          />
                        </td>
                        {/* Kolom Pengeluaran */}
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
                            color="red"
                            value={
                              keuangan.jenis === "Pengeluaran"
                                ? keuangan.nominal.toLocaleString()
                                : "-"
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
                          <img
                            alt="nature"
                            className=" h-20 w-20 rounded cursor-pointer"
                            src={keuangan.bukti_transaksi}
                            onClick={() => handleOpenDialog(index)}
                          />
                          <Dialog
                            size="lg"
                            open={openDialogs[index]}
                            handler={() => handleCloseDialog(index)}
                          >
                            <DialogBody>
                              <img
                                alt="nature"
                                className=" w-full rounded-lg object-cover object-center"
                                src={keuangan.bukti_transaksi}
                              />
                            </DialogBody>
                          </Dialog>
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
                              to={`/keuangan/ubah/${keuangan.id}`}
                              state={keuangan}
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
                                onClick={() =>
                                  handleDeleteKeuangan(keuangan.id)
                                }
                              />
                            </Tooltip>
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
                  {Math.ceil(keuangan.length / itemsPerPage)}
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
                      { length: Math.ceil(keuangan.length / itemsPerPage) },
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
                      currentPage === Math.ceil(keuangan.length / itemsPerPage)
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
    </div>
  );
};

export default KeuanganView;
