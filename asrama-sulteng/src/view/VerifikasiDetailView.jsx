import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import {
  Button,
  Dialog,
  DialogBody,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import TopBar from "../component/TopBar";
import { useLocation, useNavigate } from "react-router-dom";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { EyeIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  getAllMahasiswa,
  updateMahasiswa,
} from "../config/redux/mahasiswa/mahasiswaThunk";

const VerifikasiDetailView = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ktp
  const [openKtp, setOpenKtp] = useState(false);
  const handleOpenKtp = () => setOpenKtp(!openKtp);
  // kk
  const [openKK, setOpenKK] = useState(false);
  const handleOpenKK = () => setOpenKK(!openKK);
  // surat
  const [openSurat, setOpenSurat] = useState(false);
  const handleOpenSurat = () => setOpenSurat(!openSurat);

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
  const newplugin = defaultLayoutPlugin();

  // ktp
  const ktpUrl = data?.ktp;
  const ktp = ktpUrl?.substring(ktpUrl.lastIndexOf("/") + 1);

  // kk
  const kartuKeluargaUrl = data?.kartu_keluarga;
  const kartuKeluarga = kartuKeluargaUrl?.substring(
    kartuKeluargaUrl.lastIndexOf("/") + 1
  );
  const suratKetAktifKuliahUrl = data?.surat_ket_aktif_kuliah;
  const suratKetAktifKuliah = suratKetAktifKuliahUrl?.substring(
    suratKetAktifKuliahUrl.lastIndexOf("/") + 1
  );

  const terima = () => {
    Swal.fire({
      title: "Apakah anda yakin ingin menerima mahasiswa ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Diterima!",
          text: "Mahasiswa telah diterima",
          icon: "success",
        });
        try {
          dispatch(
            updateMahasiswa({
              id: data.id,
              nama: data.nama,
              jenis_kelamin: data.jenis_kelamin,
              tempat_lahir: data.tempat_lahir,
              tanggal_lahir: data.tanggal_lahir,
              email: data.email,
              no_hp: data.no_hp,
              alamat_asal: data.alamat_asal,
              universitas: data.universitas,
              jurusan: data.jurusan,
              angkatan: data.angkatan,
              jenjang: data.jenjang,
              status: "Diterima",
              ktp: data.ktp,
              kartu_keluarga: data.kartu_keluarga,
              surat_ket_aktif_kuliah: data.surat_ket_aktif_kuliah,
            })
          );
          navigate(-1);
          dispatch(getAllMahasiswa());
        } catch (error) {
          console.error("Failed to update mahasiswa:", error);
        }
      }
    });
  };

  const tolak = () => {
    Swal.fire({
      title: "Apakah anda yakin ingin menolak mahasiswa ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Ditolak!",
          text: "Mahasiswa di tolak",
          icon: "error",
        });
        try {
          dispatch(
            updateMahasiswa({
              id: data.id,
              nama: data.nama,
              jenis_kelamin: data.jenis_kelamin,
              tempat_lahir: data.tempat_lahir,
              tanggal_lahir: data.tanggal_lahir,
              email: data.email,
              no_hp: data.no_hp,
              alamat_asal: data.alamat_asal,
              universitas: data.universitas,
              jurusan: data.jurusan,
              angkatan: data.angkatan,
              jenjang: data.jenjang,
              status: "Ditolak",
              ktp: data.ktp,
              kartu_keluarga: data.kartu_keluarga,
              surat_ket_aktif_kuliah: data.surat_ket_aktif_kuliah,
            })
          );
          navigate(-1);
        } catch (error) {
          console.error("Failed to create mahasiswa:", error);
        }
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
          <Typography className="text-xl">Verifikasi Calon Penghuni</Typography>
        </div>
        <div className="p-5">
          <div className="flex flex-col gap-5">
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Nama</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input className="w-full" value={data?.nama} label="Nama" />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Jenis Kelamin</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input
                  className="w-full"
                  value={data?.jenis_kelamin}
                  label="Jenis Kelamin"
                />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Tempat Lahir</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input
                  className="w-full"
                  value={data?.tempat_lahir}
                  label="Tempat Lahir"
                />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Tanggal Lahir</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input
                  className="w-full"
                  value={formatDate(data.tanggal_lahir)}
                  label="Tanggal Lahir"
                />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Email</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input className="w-full" value={data?.email} label="Email" />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">No. Hp</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input className="w-full" value={data?.no_hp} label="No.Hp" />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Alamat Asal</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input
                  className="w-full"
                  value={data?.alamat_asal}
                  label="Alamat"
                />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Universitas</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input
                  className="w-full"
                  value={data?.universitas}
                  label="Kampus"
                />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Jurusan</Typography>
              <Input className="w-full" value={data?.jurusan} label="Jurusan" />
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Angkatan</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input
                  className="w-full"
                  value={data?.angkatan}
                  label="Angkatan"
                />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Jenjang</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input
                  className="w-full"
                  value={data?.jenjang}
                  label="Jenjang"
                />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Kamar Yang Di Booking</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input
                  className="w-full"
                  value={data?.kamar?.nomor_kamar}
                  label="Kamar"
                />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">KTP</Typography>
              <div className="w-full pt-3 md:pt-0">
                <button
                  onClick={handleOpenKtp}
                  className="flex bg-blue-gray-50 rounded items-center p-2 italic gap-2"
                >
                  <Typography className=" text-sm">{ktp}</Typography>
                  <Tooltip content="Lihat KTP">
                    <EyeIcon className="h-5 w-5 cursor-pointer" />
                  </Tooltip>
                </button>
                <Dialog open={openKtp} handler={handleOpenKtp}>
                  <DialogBody className=" overflow-scroll">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                      <Viewer fileUrl={data.ktp} plugins={[newplugin]} />
                    </Worker>
                  </DialogBody>
                </Dialog>
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Kartu Keluarga</Typography>
              <div className="w-full pt-3 md:pt-0">
                <button
                  onClick={handleOpenKK}
                  className="flex bg-blue-gray-50 rounded items-center p-2 italic gap-2"
                >
                  <Typography className=" text-sm">{kartuKeluarga}</Typography>
                  <Tooltip content="Lihat KK">
                    <EyeIcon className="h-5 w-5 cursor-pointer" />
                  </Tooltip>
                </button>
                <Dialog open={openKK} handler={handleOpenKK}>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer
                      fileUrl={data.kartu_keluarga}
                      plugins={[newplugin]}
                    />
                  </Worker>
                </Dialog>
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">
                Surat Ket.Aktif Kuliah / Bukti Diterima Kuliah
              </Typography>
              <div className="w-full pt-3 md:pt-0">
                <button
                  onClick={handleOpenSurat}
                  className="flex bg-blue-gray-50 rounded items-center p-2 italic gap-2"
                >
                  <Typography className=" text-sm">
                    {suratKetAktifKuliah}
                  </Typography>
                  <Tooltip content="Lihat KK">
                    <EyeIcon className="h-5 w-5 cursor-pointer" />
                  </Tooltip>
                </button>
                <Dialog open={openSurat} handler={handleOpenSurat}>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer
                      fileUrl={data.surat_ket_aktif_kuliah}
                      plugins={[newplugin]}
                    />
                  </Worker>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 flex gap-3">
          <Button color="red" onClick={tolak}>
            Tolak
          </Button>
          <Button color="green" onClick={terima}>
            terima
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifikasiDetailView;
