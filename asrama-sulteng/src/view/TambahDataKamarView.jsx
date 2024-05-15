import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import { Button, Input, Typography } from "@material-tailwind/react";
import TopBar from "../component/TopBar";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { createKamar } from "../config/redux/kamar/kamarThunk";
import { useNavigate } from "react-router-dom";

const TambahDataKamarView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [prevImgGambarKamar, setPrevImgGambarKamar] = useState(null);

  const handleGambarKamarChange = (e) => {
    const file = e.target.files[0]; // Ambil file gambar yang dipilih
    const reader = new FileReader(); // Buat instance FileReader

    // Ketika pembacaan file selesai
    reader.onloadend = () => {
      setPrevImgGambarKamar(reader.result); // Set URL gambar yang dipilih sebagai preview
    };

    if (file) {
      reader.readAsDataURL(file); // Membaca file gambar sebagai URL data
    } else {
      setPrevImgGambarKamar(null); // Set preview menjadi null jika tidak ada file yang dipilih
    }
  };

  const formik = useFormik({
    initialValues: {
      gambar: "",
      nomor_kamar: "",
      fasilitas: "",
    },
    validationSchema: Yup.object().shape({
      gambar: Yup.string().required("Gambar diperlukan"),
      nomor_kamar: Yup.string().required("Nomor kamar diperlukan"),
      fasilitas: Yup.string().required("Fasilitas diperlukan"),
    }),
    onSubmit: (values) => {
      console.log("Form Values:", values);
      try {
        dispatch(createKamar({ ...values, gambar: values.gambar[0] }));
        Swal.fire({
          title: "Data Kamar Berhasil Ditambah!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            navigate(-1);
          }
        });
      } catch (error) {
        console.error("Gagal Menambahkan Data Kamar!:", error);
      }
    },
  });
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <TopBar />
        <div className="p-5">
          <Typography className="text-xl">Tambah Data Kamar</Typography>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-5">
            <div className="flex flex-col gap-5">
              <div className="flex items-center">
                <Typography className="w-96">Gambar Kamar</Typography>
                <div className="w-full">
                  {prevImgGambarKamar && (
                    <img
                      src={prevImgGambarKamar}
                      alt="Banner Preview"
                      className="w-44 h-22 pb-3"
                    />
                  )}
                  <Input
                    id="gambar"
                    type="file"
                    label="Gambar"
                    onChange={(e) => {
                      formik.setFieldValue("gambar", e.currentTarget.files);
                      handleGambarKamarChange(e); // Panggil fungsi handleBannerChange
                    }}
                    onBlur={formik.handleBlur}
                    multiple={false}
                  />
                  {formik.touched.gambar && formik.errors.gambar && (
                    <div className="text-red-700 m-0">
                      {formik.errors.gambar}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Nomor Kamar</Typography>
                <div className="w-full">
                  <Input
                    id="nomor_kamar"
                    label="Nomor Kamar"
                    value={formik.values.nomor_kamar}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.nomor_kamar && formik.errors.nomor_kamar && (
                    <div className="text-red-700 m-0">
                      {formik.errors.nomor_kamar}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Fasilitas</Typography>
                <div className="w-full">
                  <Input
                    id="fasilitas"
                    className="w-full"
                    label="Fasilitas"
                    value={formik.values.fasilitas}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.fasilitas && formik.errors.fasilitas && (
                    <div className="text-red-700 m-0">
                      {formik.errors.fasilitas}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 flex gap-3">
            <Button className="bg-blue-900" type="submit">
              Tambah Data
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahDataKamarView;
