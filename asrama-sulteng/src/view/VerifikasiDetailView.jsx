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
import { updateMahasiswa } from "../config/redux/mahasiswa/mahasiswaThunk";

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

  console.log(data);
  const tanggalLahir = data?.tanggal_lahir;

  const tanggalLahirFormatted = tanggalLahir.slice(0, 10);
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
        status: "Diterima",
        ktp: data.ktp,
        kartu_keluarga: data.kartu_keluarga,
        surat_ket_aktif_kuliah: data.surat_ket_aktif_kuliah,
      })
    );
    Swal.fire({
      title: "Data Mahasiswa Diterima!",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        navigate(-1);
      }
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <TopBar />
        <div className="p-5">
          <Typography className="text-xl">Verifikasi Calon Penghuni</Typography>
        </div>
        <div className="p-5">
          <div className="flex flex-col gap-5">
            <div className="flex items-center">
              <Typography className="w-96">Nama</Typography>
              <Input className="w-full" value={data?.nama} label="Nama" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Jenis Kelamin</Typography>
              <Input
                className="w-full"
                value={data?.jenis_kelamin}
                label="Jenis Kelamin"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Tempat Lahir</Typography>
              <Input
                className="w-full"
                value={data?.tempat_lahir}
                label="Tempat Lahir"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Tanggal Lahir</Typography>
              <Input
                className="w-full"
                value={tanggalLahirFormatted}
                label="Tanggal Lahir"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Email</Typography>
              <Input className="w-full" value={data?.email} label="Email" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">No. Hp</Typography>
              <Input className="w-full" value={data?.no_hp} label="No.Hp" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Alamat Asal</Typography>
              <Input
                className="w-full"
                value={data?.alamat_asal}
                label="Alamat"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Universitas</Typography>
              <Input
                className="w-full"
                value={data?.universitas}
                label="Kampus"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Jurusan</Typography>
              <Input className="w-full" value={data?.jurusan} label="Jurusan" />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Angkatan</Typography>
              <Input
                className="w-full"
                value={data?.angkatan}
                label="Angkatan"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Kamar Yang Di Booking</Typography>
              <Input
                className="w-full"
                value={data?.kamar?.nomor_kamar}
                label="Kamar"
              />
            </div>
            <div className="flex items-center">
              <Typography className="w-96">KTP</Typography>
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
            <div className="flex items-center">
              <Typography className="w-96">Kartu Keluarga</Typography>
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
                  <Viewer fileUrl={data.kartu_keluarga} plugins={[newplugin]} />
                </Worker>
              </Dialog>
            </div>
            <div className="flex items-center">
              <Typography className="w-96">Surat Ket.Aktif Kuliah</Typography>
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
        <div className="p-5 flex gap-3">
          <Button color="red">Tolak</Button>
          <Button color="green" onClick={terima}>
            terima
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifikasiDetailView;
