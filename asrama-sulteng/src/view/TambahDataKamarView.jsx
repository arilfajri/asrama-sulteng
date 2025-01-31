import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import {
  Button,
  Card,
  Checkbox,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
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
  const [selectedFacilities, setSelectedFacilities] = useState([]);

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

  const handleFacilityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFacilities([...selectedFacilities, value]);
    } else {
      setSelectedFacilities(
        selectedFacilities.filter((facility) => facility !== value)
      );
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
      // fasilitas: Yup.string().required("Fasilitas diperlukan"),
    }),
    onSubmit: (values) => {
      values.fasilitas = selectedFacilities.join(", ");
      try {
        dispatch(
          createKamar({
            ...values,
            gambar: values.gambar[0],
          })
        );
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
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="w-full">
        <TopBar />
        <div className="p-5">
          <Typography className="text-xl">Tambah Data Kamar</Typography>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-5">
            <div className="flex flex-col gap-5">
              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">Gambar Kamar</Typography>
                <div className="w-full pt-3 md:pt-0">
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
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => {
                      const file = e.currentTarget.files[0];
                      const maxSize = 5 * 1024 * 1024; // 5 MB in bytes

                      if (file && file.size > maxSize) {
                        Swal.fire({
                          title: "Ukuran gambar tidak boleh melebihi 5MB!",
                          icon: "error",
                        }).formik.setFieldError(
                          "bukti_transaksi",
                          "File melebihi 5 MB"
                        );
                        return;
                      }
                      formik.setFieldValue("gambar", e.currentTarget.files);
                      handleGambarKamarChange(e); // Panggil fungsi handleBannerChange
                    }}
                    onBlur={formik.handleBlur}
                    multiple={false}
                  />
                  <div className="text-blue-900 m-0 text-sm">
                    *.jpg, *.JPG, *.png, *.PNG, *.jpeg, *.JPEG(maxSize: 5MB)
                  </div>
                  {formik.touched.gambar && formik.errors.gambar && (
                    <div className="text-red-700 m-0">
                      {formik.errors.gambar}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">Nomor Kamar</Typography>
                <div className="w-full pt-3 md:pt-0">
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
              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">Fasilitas</Typography>
                <div className="w-full pt-3 md:pt-0">
                  <Card>
                    <List>
                      {["Lemari", "Meja", "Kasur", "Kursi"].map((facility) => (
                        <ListItem className="p-0" key={facility}>
                          <label
                            htmlFor={`facility-${facility}`}
                            className="flex w-full cursor-pointer items-center px-3 py-2"
                          >
                            <ListItemPrefix className="mr-3">
                              <Checkbox
                                id={`facility-${facility}`}
                                value={facility}
                                ripple={false}
                                className="hover:before:opacity-0"
                                containerProps={{
                                  className: "p-0",
                                }}
                                onChange={handleFacilityChange}
                              />
                            </ListItemPrefix>
                            <Typography
                              color="blue-gray"
                              className="font-medium"
                            >
                              {facility}
                            </Typography>
                          </label>
                        </ListItem>
                      ))}
                    </List>
                  </Card>
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
