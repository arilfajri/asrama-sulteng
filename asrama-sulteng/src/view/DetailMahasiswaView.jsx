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
import { Link, useLocation } from "react-router-dom";
import TopBar from "../component/TopBar";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { EyeIcon } from "@heroicons/react/24/solid";

const DetailMahasiswaView = () => {
  const location = useLocation();
  const data = location.state;
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

  return (
    <div className="flex">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="w-full">
        <TopBar />
        <div className="p-5">
          <Typography className="text-xl">Data Penghuni Asrama</Typography>
        </div>
        <div className="p-5">
          <div className="flex flex-col gap-5">
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Nama</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input
                  className="w-full"
                  value={data?.nama}
                  label="Nama"
                  disabled
                />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Jenis Kelamin</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input
                  className="w-full"
                  value={data?.jenis_kelamin}
                  label="Jenis Kelamin"
                  disabled
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
                  disabled
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
                  disabled
                />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Email</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input
                  className="w-full"
                  value={data?.email}
                  label="Email"
                  disabled
                />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">No. Hp</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input
                  className="w-full"
                  value={data?.no_hp}
                  label="No.Hp"
                  disabled
                />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Alamat Asal</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input
                  className="w-full"
                  value={data?.alamat_asal}
                  label="Alamat"
                  disabled
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
                  disabled
                />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Jurusan</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input
                  className="w-full"
                  value={data?.jurusan}
                  label="Jurusan"
                  disabled
                />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Angkatan</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input
                  className="w-full"
                  value={data?.angkatan}
                  label="Angkatan"
                  disabled
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
                  disabled
                />
              </div>
            </div>
            <div className="flex md:items-center flex-col md:flex-row items-start">
              <Typography className="w-96">Nomor Kamar</Typography>
              <div className="w-full pt-3 md:pt-0">
                <Input
                  className="w-full"
                  value={data?.kamar?.nomor_kamar}
                  label="Kamar"
                  disabled
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
              <Typography className="w-96">Surat Ket.Aktif Kuliah</Typography>
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
          <Link to={"/datamahasiswa"}>
            <Button className="bg-blue-900">Kembali</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailMahasiswaView;
