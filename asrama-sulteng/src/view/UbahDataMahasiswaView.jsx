import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import {
  Button,
  Dialog,
  DialogBody,
  Input,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../component/TopBar";
import { useFormik } from "formik";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { EyeIcon } from "@heroicons/react/24/solid";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { updateMahasiswa } from "../config/redux/mahasiswa/mahasiswaThunk";
import { useDispatch } from "react-redux";

const UbahDataMahasiswaView = () => {
  const location = useLocation();
  const data = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ktp
  const [openKtp, setOpenKtp] = useState(false);
  const handleOpenKtp = (e) => {
    e.preventDefault();
    setOpenKtp(!openKtp);
  };
  const handleCloseKtp = () => {
    setOpenKtp(false);
  };
  // kk
  const [openKK, setOpenKK] = useState(false);
  const handleOpenKK = (e) => {
    e.preventDefault();
    setOpenKK(!openKK);
  };
  const handleCloseKK = () => {
    setOpenKK(false);
  };
  // surat
  const [openSurat, setOpenSurat] = useState(false);
  const handleOpenSurat = (e) => {
    e.preventDefault();
    setOpenSurat(!openSurat);
  };
  const handleCloseSurat = () => {
    setOpenSurat(false);
  };

  console.log(data);

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

  const formik = useFormik({
    initialValues: data,
    validationSchema: Yup.object().shape({
      nama: Yup.string().required("Nama diperlukan"),
      // jenis_kelamin: Yup.string().required("Jenis kelamin diperlukan"),
      tempat_lahir: Yup.string().required("Tempat lahir diperlukan"),
      tanggal_lahir: Yup.date().required("Tanggal lahir diperlukan"),
      email: Yup.string()
        .email("Email tidak valid")
        .required("Email diperlukan"),
      no_hp: Yup.string()
        .required("Nomor HP diperlukan")
        .matches(/^\d+$/, "No hp harus berupa angka")
        .max(12, "Nomor HP tidak boleh lebih dari 12 karakter"),
      alamat_asal: Yup.string().required("Alamat asal diperlukan"),
      universitas: Yup.string().required("Universitas diperlukan"),
      jurusan: Yup.string().required("Jurusan diperlukan"),
      angkatan: Yup.string()
        .required("Angkatan diperlukan")
        .matches(/^\d+$/, "Angkatan harus berupa angka")
        .max(4, "Angkatan tidak boleh lebih dari 4 karakter"),
      ktp: Yup.string().required("KTP diperlukan"),
      kartu_keluarga: Yup.string().required("Kartu Keluarga diperlukan"),
      surat_ket_aktif_kuliah: Yup.string().required(
        "Surat keterangan aktif kuliah diperlukan"
      ),
    }),
    onSubmit: (values) => {
      console.log("Form values:", { ...values, jenis_kelamin: jenis_kelamin });
      console.log(values.ktp[0]);
      const formData = new FormData();
      formData.append("id", values.id);
      formData.append("nama", values.nama);
      formData.append("jenis_kelamin", jenis_kelamin);
      formData.append("tempat_lahir", values.tempat_lahir);
      formData.append("tanggal_lahir", values.tanggal_lahir);
      formData.append("email", values.email);
      formData.append("no_hp", values.no_hp);
      formData.append("alamat_asal", values.alamat_asal);
      formData.append("universitas", values.universitas);
      formData.append("jurusan", values.jurusan);
      formData.append("angkatan", values.angkatan);
      formData.append("ktp", values.ktp[0]);
      formData.append("kartu_keluarga", values.kartu_keluarga[0]);
      formData.append(
        "surat_ket_aktif_kuliah",
        values.surat_ket_aktif_kuliah[0]
      );

      try {
        dispatch(
          updateMahasiswa({
            ...values,
            ktp: values.ktp[0],
            kartuKeluarga: values.kartu_keluarga[0],
            surat_ket_aktif_kuliah: values.surat_ket_aktif_kuliah[0],
          })
        );
        Swal.fire({
          title: "Data Berhasil Diupdate!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            navigate(-1);
          }
        });
      } catch (error) {
        console.error("Failed to create mahasiswa:", error);
      }
    },
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <TopBar />
        <div className="p-5">
          <Typography className="text-xl">Data Penghuni Asrama</Typography>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-5">
            <div className="flex flex-col gap-5">
              <div className="flex items-center">
                <Typography className="w-96">Nama</Typography>
                <div className="w-full">
                  <Input
                    id="nama"
                    label="Nama"
                    value={formik.values?.nama}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.nama && formik.errors.nama && (
                    <div className="text-red-700 m-0">{formik.errors.nama}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Jenis Kelamin</Typography>
                <div className="w-full">
                  <Select
                    id="jenis_kelamin"
                    label="Jenis Kelamin"
                    onChange={(val) => setJenisKelamin(val)}
                    // onChange={formik.handleChange}
                    value={formik.values.jenis_kelamin}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="Laki-Laki">Laki-Laki</MenuItem>
                    <MenuItem value="Perempuan">Perempuan</MenuItem>
                  </Select>
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Tempat Lahir</Typography>
                <div className="w-full">
                  <Input
                    id="tempat_lahir"
                    label="Tempat Lahir"
                    value={formik.values?.tempat_lahir}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.tempat_lahir &&
                    formik.errors.tempat_lahir && (
                      <div className="text-red-700 m-0">
                        {formik.errors.tempat_lahir}
                      </div>
                    )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Tanggal Lahir</Typography>
                <div className="w-full">
                  <Input
                    id="tanggal_lahir"
                    className="w-full"
                    label="Tanggal Lahir"
                    type="date"
                    value={
                      formik.values?.tanggal_lahir
                        ? new Date(formik.values?.tanggal_lahir)
                            .toISOString()
                            .slice(0, 10)
                        : ""
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.tanggal_lahir &&
                    formik.errors.tanggal_lahir && (
                      <div className="text-red-700 m-0">
                        {formik.errors.tanggal_lahir}
                      </div>
                    )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Email</Typography>
                <div className="w-full">
                  <Input
                    id="email"
                    className="w-full"
                    label="Email"
                    value={formik.values?.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-700 m-0">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">No. Hp</Typography>
                <div className="w-full">
                  <Input
                    id="no_hp"
                    className="w-full"
                    label="No.Hp"
                    value={formik.values?.no_hp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.no_hp && formik.errors.no_hp && (
                    <div className="text-red-700 m-0">
                      {formik.errors.no_hp}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Alamat Asal</Typography>
                <div className="w-full">
                  <Input
                    id="alamat_asal"
                    className="w-full"
                    label="Alamat"
                    value={formik.values?.alamat_asal}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.alamat_asal && formik.errors.alamat_asal && (
                    <div className="text-red-700 m-0">
                      {formik.errors.alamat_asal}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Universitas</Typography>
                <div className="w-full">
                  <Input
                    id="universitas"
                    className="w-full"
                    label="Kampus"
                    value={formik.values?.universitas}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.universitas && formik.errors.universitas && (
                    <div className="text-red-700 m-0">
                      {formik.errors.universitas}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Jurusan</Typography>
                <div className="w-full">
                  <Input
                    id="jurusan"
                    className="w-full"
                    label="Jurusan"
                    value={formik.values?.jurusan}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.jurusan && formik.errors.jurusan && (
                    <div className="text-red-700 m-0">
                      {formik.errors.jurusan}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Angkatan</Typography>
                <div className="w-full">
                  <Input
                    id="angkatan"
                    className="w-full"
                    label="Angkatan"
                    value={formik.values?.angkatan}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.angkatan && formik.errors.angkatan && (
                    <div className="text-red-700 m-0">
                      {formik.errors.angkatan}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Kamar Yang Di Booking</Typography>
                <Input
                  className="w-full"
                  label="Kamar"
                  value={data?.kamar?.nomor_kamar}
                  disabled
                />
              </div>
              <div className="flex items-center">
                <Typography className="w-96">KTP</Typography>
                <div className="w-full flex items-center gap-3">
                  <button
                    onClick={handleOpenKtp}
                    className="flex bg-blue-gray-50 rounded items-center p-2 italic gap-2"
                  >
                    <Typography className=" text-sm">{ktp}</Typography>
                    <Tooltip content="Lihat KTP">
                      <EyeIcon className="h-5 w-5 cursor-pointer" />
                    </Tooltip>
                  </button>
                  <Dialog open={openKtp} handler={handleCloseKtp}>
                    <DialogBody className=" overflow-scroll">
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <Viewer fileUrl={data?.ktp} plugins={[newplugin]} />
                      </Worker>
                    </DialogBody>
                  </Dialog>
                  <Input
                    id="ktp"
                    className="w-full"
                    type="file"
                    label="KTP"
                    onChange={(e) =>
                      formik.setFieldValue("ktp", e.currentTarget.files)
                    }
                    onBlur={formik.handleBlur}
                    multiple={false} // Jika hanya satu file yang diizinkan untuk diunggah
                  />
                  {formik.touched.ktp && formik.errors.ktp && (
                    <div className="text-red-700 m-0">{formik.errors.ktp}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Kartu Keluarga</Typography>
                <div className="w-full flex items-center gap-3">
                  <button
                    onClick={handleOpenKK}
                    className="flex bg-blue-gray-50 rounded items-center p-2 italic gap-2"
                  >
                    <Typography className=" text-sm">
                      {kartuKeluarga}
                    </Typography>
                    <Tooltip content="Lihat KK">
                      <EyeIcon className="h-5 w-5 cursor-pointer" />
                    </Tooltip>
                  </button>
                  <Dialog open={openKK} handler={handleCloseKK}>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                      <Viewer
                        fileUrl={data?.kartu_keluarga}
                        plugins={[newplugin]}
                      />
                    </Worker>
                  </Dialog>
                  <Input
                    id="kartu_keluarga"
                    className="w-full"
                    type="file"
                    label="KK"
                    onChange={(e) =>
                      formik.setFieldValue(
                        "kartu_keluarga",
                        e.currentTarget.files
                      )
                    }
                    onBlur={formik.handleBlur}
                    multiple={false} // Jika hanya satu file yang diizinkan untuk diunggah
                  />
                  {formik.touched.kartu_keluarga &&
                    formik.errors.kartu_keluarga && (
                      <div className="text-red-700 m-0">
                        {formik.errors.kartu_keluarga}
                      </div>
                    )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Surat Ket.Aktif Kuliah</Typography>
                <div className="w-full flex items-center gap-3">
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
                  <Dialog open={openSurat} handler={handleCloseSurat}>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                      <Viewer
                        fileUrl={data?.surat_ket_aktif_kuliah}
                        plugins={[newplugin]}
                      />
                    </Worker>
                  </Dialog>
                  <Input
                    id="surat_ket_aktif_kuliah"
                    className="w-full"
                    type="file"
                    label="Ket.Aktif Kuliah"
                    onChange={(e) =>
                      formik.setFieldValue(
                        "surat_ket_aktif_kuliah",
                        e.currentTarget.files
                      )
                    }
                    onBlur={formik.handleBlur}
                    multiple={false} // Jika hanya satu file yang diizinkan untuk diunggah
                  />
                  {formik.touched.surat_ket_aktif_kuliah &&
                    formik.errors.surat_ket_aktif_kuliah && (
                      <div className="text-red-700 m-0">
                        {formik.errors.surat_ket_aktif_kuliah}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 flex gap-3">
            <Button className="bg-blue-900" type="submit">
              Ubah data
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UbahDataMahasiswaView;
