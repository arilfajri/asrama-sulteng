import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import TopBar from "../component/TopBar";
import { useDispatch } from "react-redux";
import {
  getInformasi,
  updateInformasi,
} from "../config/redux/informasi/informasiThunk";
import { informasiDataSelector } from "../config/redux/informasi/informasiSelector";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const InformasiView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getInformasi());
  }, [dispatch]);
  const informasi = informasiDataSelector();
  console.log(informasi);

  const [prevImgBanner, setPrevImgBanner] = useState(informasi[0].banner);
  const [prevImgFotoDeskripsi, setPrevImgFotoDeskripsi] = useState(
    informasi[0].foto_deskripsi
  );
  const [prevImgStukturOrganisasi, setPrevImgStukturOrganisasi] = useState(
    informasi[0].struktur_organisasi
  );

  const handleFotoDeskripsiChange = (e) => {
    const file = e.target.files[0]; // Ambil file gambar yang dipilih
    const reader = new FileReader(); // Buat instance FileReader

    // Ketika pembacaan file selesai
    reader.onloadend = () => {
      setPrevImgFotoDeskripsi(reader.result); // Set URL gambar yang dipilih sebagai preview
    };

    if (file) {
      reader.readAsDataURL(file); // Membaca file gambar sebagai URL data
    } else {
      setPrevImgFotoDeskripsi(null); // Set preview menjadi null jika tidak ada file yang dipilih
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0]; // Ambil file gambar yang dipilih
    const reader = new FileReader(); // Buat instance FileReader

    // Ketika pembacaan file selesai
    reader.onloadend = () => {
      setPrevImgBanner(reader.result); // Set URL gambar yang dipilih sebagai preview
    };

    if (file) {
      reader.readAsDataURL(file); // Membaca file gambar sebagai URL data
    } else {
      setPrevImgBanner(null); // Set preview menjadi null jika tidak ada file yang dipilih
    }
  };

  const handleStukturOrganisasiChange = (e) => {
    const file = e.target.files[0]; // Ambil file gambar yang dipilih
    const reader = new FileReader(); // Buat instance FileReader

    // Ketika pembacaan file selesai
    reader.onloadend = () => {
      setPrevImgStukturOrganisasi(reader.result); // Set URL gambar yang dipilih sebagai preview
    };

    if (file) {
      reader.readAsDataURL(file); // Membaca file gambar sebagai URL data
    } else {
      setPrevImgStukturOrganisasi(null); // Set preview menjadi null jika tidak ada file yang dipilih
    }
  };

  const formik = useFormik({
    initialValues: informasi[0],
    validationSchema: Yup.object().shape({
      banner: Yup.string().required("Banner diperlukan"),
      deskripsi_singkat: Yup.string().required("Deskripsi singkat diperlukan"),
      foto_deskripsi: Yup.string().required("Foto deskripsi diperlukan"),
      visi: Yup.string().required("Visi diperlukan"),
      misi: Yup.string().required("Misi diperlukan"),
      alamat: Yup.string().required("Alamat diperlukan"),
      email: Yup.string().required("Email diperlukan"),
      no_hp: Yup.string().required("No Hp diperlukan"),
      struktur_organisasi: Yup.string().required(
        "Struktur organisasi diperlukan"
      ),
      biaya: Yup.string().required("Biaya diperlukan"),
    }),
    onSubmit: (values) => {
      console.log("Form Values:", values);
      console.log("Form Values:", values.misi);
      try {
        dispatch(
          updateInformasi({
            ...values,
            id: informasi[0].id,
            banner: values.banner[0],
            foto_deskripsi: values.foto_deskripsi[0],
            struktur_organisasi: values.struktur_organisasi[0],
          })
        );
        Swal.fire({
          title: "Informasi Berhasil Diubah!",
          icon: "success",
        });
        dispatch(getInformasi());
      } catch (error) {
        console.error("Failed to create data keuangan:", error);
      }
    },
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <TopBar />
        <div className="p-5">
          <Typography className="text-xl">
            Ubah Isi Informasi Yang Di Tampilkan
          </Typography>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-5">
            <div className="flex flex-col gap-5">
              <div className="flex items-center">
                <Typography className="w-96">Banner</Typography>
                <div className="w-full">
                  {prevImgBanner && (
                    <img
                      src={prevImgBanner}
                      alt="Banner Preview"
                      className="w-44 h-22 pb-3"
                    />
                  )}
                  <Input
                    id="banner"
                    type="file"
                    label="Banner"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => {
                      formik.setFieldValue("banner", e.currentTarget.files);
                      handleBannerChange(e); // Panggil fungsi handleBannerChange
                    }}
                    onBlur={formik.handleBlur}
                    multiple={false}
                  />
                  {formik.touched.banner && formik.errors.banner && (
                    <div className="text-red-700 m-0">
                      {formik.errors.banner}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Deskripsi Singkat</Typography>
                <div className="w-full">
                  <Textarea
                    id="deskripsi_singkat"
                    label="Deskripsi Singkat"
                    value={formik.values.deskripsi_singkat}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.deskripsi_singkat &&
                    formik.errors.deskripsi_singkat && (
                      <div className="text-red-700 m-0">
                        {formik.errors.deskripsi_singkat}
                      </div>
                    )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Foto Deskripsi</Typography>
                <div className="w-full">
                  {prevImgFotoDeskripsi && (
                    <img
                      src={prevImgFotoDeskripsi}
                      alt="Foto Deskripsi Preview"
                      className="w-44 h-22 pb-3"
                    />
                  )}
                  <Input
                    id="foto_deskripsi"
                    type="file"
                    label="Foto Deskripsi"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => {
                      formik.setFieldValue(
                        "foto_deskripsi",
                        e.currentTarget.files
                      );
                      handleFotoDeskripsiChange(e); // Panggil fungsi handleBannerChange
                    }}
                    onBlur={formik.handleBlur}
                    multiple={false}
                  />
                  {formik.touched.foto_deskripsi &&
                    formik.errors.foto_deskripsi && (
                      <div className="text-red-700 m-0">
                        {formik.errors.foto_deskripsi}
                      </div>
                    )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Visi</Typography>
                <div className="w-full">
                  <Textarea
                    id="visi"
                    label="Visi"
                    value={formik.values.visi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.visi && formik.errors.visi && (
                    <div className="text-red-700 m-0">{formik.errors.visi}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Misi</Typography>
                <div className="w-full">
                  <Textarea
                    id="misi"
                    label="Misi"
                    value={formik.values.misi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.misi && formik.errors.misi && (
                    <div className="text-red-700 m-0">{formik.errors.misi}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Alamat</Typography>
                <div className="w-full">
                  <Input
                    id="alamat"
                    className="w-full"
                    label="Alamat"
                    value={formik.values.alamat}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.alamat && formik.errors.alamat && (
                    <div className="text-red-700 m-0">
                      {formik.errors.alamat}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Kontak</Typography>
                <div className=" flex flex-col w-full gap-2">
                  <div className="w-full">
                    <Input
                      id="email"
                      className="w-full"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-700 m-0">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <Input
                      id="no_hp"
                      className="w-full"
                      label="No.Hp"
                      value={formik.values.no_hp}
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
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Struktur Organisasi</Typography>
                <div className="w-full">
                  {prevImgStukturOrganisasi && (
                    <img
                      src={prevImgStukturOrganisasi}
                      alt="Struktur Organisasi Preview"
                      className="w-44 h-22 pb-3"
                    />
                  )}
                  <Input
                    id="struktur_organisasi"
                    type="file"
                    label="Struktur Organisasi"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => {
                      formik.setFieldValue(
                        "struktur_organisasi",
                        e.currentTarget.files
                      );
                      handleStukturOrganisasiChange(e); // Panggil fungsi handleBannerChange
                    }}
                    onBlur={formik.handleBlur}
                    multiple={false}
                  />
                  {formik.touched.struktur_organisasi &&
                    formik.errors.struktur_organisasi && (
                      <div className="text-red-700 m-0">
                        {formik.errors.struktur_organisasi}
                      </div>
                    )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Biaya</Typography>
                <div className="w-full">
                  <Input
                    id="biaya"
                    className="w-full"
                    label="Biaya"
                    value={formik.values.biaya}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.biaya && formik.errors.biaya && (
                    <div className="text-red-700 m-0">
                      {formik.errors.biaya}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 flex gap-3">
            <Button className="bg-blue-900" type="submit">
              Ubah Informasi
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InformasiView;
