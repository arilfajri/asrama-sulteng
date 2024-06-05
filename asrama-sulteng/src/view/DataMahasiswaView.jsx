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
import ExcelJS from "exceljs";

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

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Mahasiswa");

    // Add title row
    const titleRow = worksheet.addRow(["ASRAMA PELAJAR MAHASISWA TORA-TORA"]);
    titleRow.font = { name: "TimesNewRoman", size: 16, bold: true };
    titleRow.alignment = { vertical: "middle", horizontal: "center" };
    worksheet.mergeCells("A1:L1"); // Merge cells for title
    titleRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" }, // Putih
    };

    // Add description rows
    const descriptionRows = [
      "SULAWESI TENGAH - BANDUNG",
      "Alamat : Jl. Wiranta No. 60, Cicadas, Cibeunying Kidul, Kota Bandung, Jawa Barat Kantor Pos. 40121, Telp 0822-1761-1246",
      "Email : asramatoratora.bdg@gmail.com, Instagram : asramasulteng.bandung",
    ];
    descriptionRows.forEach((description) => {
      const row = worksheet.addRow([description]);
      row.font = { name: "TimesNewRoman" };
      row.alignment = { vertical: "middle", horizontal: "center" };
      worksheet.mergeCells(
        `A${worksheet.lastRow.number}:L${worksheet.lastRow.number}`
      );
      row.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFFFF" }, // Putih
      };
    });

    // Add some space after description
    worksheet.addRow([]);
    // Define header
    const headerRow = worksheet.addRow([
      "No",
      "Nama",
      "Jenis Kelamin",
      "Tempat Lahir",
      "Tanggal Lahir",
      "Email",
      "No. HP",
      "Alamat Asal",
      "Universitas",
      "Jurusan",
      "Angkatan",
      "Nomor Kamar",
    ]);

    // Set column widths
    const columnWidths = [10, 20, 20, 20, 20, 30, 30, 30, 30, 50, 20, 20];
    columnWidths.forEach((width, index) => {
      worksheet.getColumn(index + 1).width = width;
    });

    // Set header row height
    headerRow.height = 40;

    headerRow.eachCell((cell) => {
      cell.font = {
        bold: true,
        color: { argb: "FFFFFFFF" },
        name: "TimesNewRoman",
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF1A50B0" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Add data rows
    filteredMahasiswa.forEach((mahasiswa, index) => {
      const rowData = [
        index + 1,
        mahasiswa.nama,
        mahasiswa.jenis_kelamin,
        mahasiswa.tempat_lahir,
        formatDate(mahasiswa.tanggal_lahir),
        mahasiswa.email,
        mahasiswa.no_hp,
        mahasiswa.alamat_asal,
        mahasiswa.universitas,
        mahasiswa.jurusan,
        mahasiswa.angkatan,
        mahasiswa.kamar?.nomor_kamar || "",
      ];
      const dataRow = worksheet.addRow(rowData);
      dataRow.eachCell((cell) => {
        cell.font = { name: "TimesNewRoman", size: 11 };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // Generate Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Mahasiswa.xlsx";
      a.click();
    });
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
      <div className="hidden md:flex">
        <Sidebar />
      </div>
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
                    <td colSpan="7" className="p-4 text-center text-red-200">
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
                              onClick={() =>
                                handleDeleteMahasiswa(mahasiswa.id)
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
