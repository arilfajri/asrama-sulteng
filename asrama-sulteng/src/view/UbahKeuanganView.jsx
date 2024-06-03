import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import TopBar from "../component/TopBar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateKeuangan } from "../config/redux/keuangan/keuanganThunk";
import Swal from "sweetalert2";

const UbahKeuanganView = () => {
  const [jenis, setJenis] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const formik = useFormik({
    initialValues: data,
    validationSchema: Yup.object().shape({
      tanggal: Yup.date().required("Tanggal transaksi diperlukan"),
      keterangan: Yup.string().required("Keterangan diperlukan"),
      // jenis: Yup.string().required("Jenis transaksi diperlukan"),
      nominal: Yup.number()
        .required("Nominal transaksi diperlukan")
        .integer("Nominal harus berupa bilangan bulat")
        .positive("Nominal harus positif")
        .integer()
        .typeError("Nominal harus berupa bilangan bulat"),
      bukti_transaksi: Yup.string().required("Bukti transaksi diperlukan"),
    }),
    onSubmit: (values) => {
      console.log(values.jenis);
      console.log("Form values:", values.bukti_transaksi[0]);
      try {
        dispatch(
          updateKeuangan({
            ...values,
            jenis: jenis || values.jenis,
            bukti_transaksi: values.bukti_transaksi[0],
          })
        );
        Swal.fire({
          title: "Data Berhasil DiUbah!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            navigate(-1);
          }
        });
      } catch (error) {
        console.error("Failed to update data keuangan:", error);
      }
    },
  });

  const [prevImgBuktiTransaksi, setPrevBuksetPrevImgBuktiTransaksi] = useState(
    data.bukti_transaksi
  );
  const handleBuktiTransaksiChange = (e) => {
    const file = e.target.files[0]; // Ambil file gambar yang dipilih
    const reader = new FileReader(); // Buat instance FileReader

    // Ketika pembacaan file selesai
    reader.onloadend = () => {
      setPrevBuksetPrevImgBuktiTransaksi(reader.result); // Set URL gambar yang dipilih sebagai preview
    };

    if (file) {
      reader.readAsDataURL(file); // Membaca file gambar sebagai URL data
    } else {
      setPrevBuksetPrevImgBuktiTransaksi(null); // Set preview menjadi null jika tidak ada file yang dipilih
    }
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <TopBar />
        <div className="p-5">
          <Typography className="text-xl">Ubah Transaksi</Typography>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-5">
            <div className="flex flex-col gap-5">
              <div className="flex items-center">
                <Typography className="w-96">Tanggal</Typography>
                <div className="w-full">
                  <Input
                    id="tanggal"
                    label="Tanggal Transaksi"
                    value={
                      formik.values?.tanggal
                        ? new Date(formik.values?.tanggal)
                            .toISOString()
                            .slice(0, 10)
                        : ""
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="date"
                  />
                  {formik.touched.tanggal && formik.errors.tanggal && (
                    <div className="text-red-700 m-0">
                      {formik.errors.tanggal}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Keterangan</Typography>
                <div className="w-full">
                  <Textarea
                    id="keterangan"
                    label="Keterangan"
                    value={formik.values.keterangan}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.keterangan && formik.errors.keterangan && (
                    <div className="text-red-700 m-0">
                      {formik.errors.keterangan}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Jenis</Typography>
                <div className="w-full">
                  <Select
                    id="jenis"
                    label="Jenis"
                    onChange={(val) => setJenis(val)}
                    // onChange={formik.handleChange}
                    value={formik.values.jenis}
                    onBlur={formik.handleBlur}
                  >
                    <Option value="Pemasukkan">Pemasukkan</Option>
                    <Option value="Pengeluaran">Pengeluaran</Option>
                  </Select>
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Nominal</Typography>
                <div className="w-full">
                  <Input
                    id="nominal"
                    label="Nominal"
                    value={formik.values.nominal}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="number"
                  />
                  {formik.touched.nominal && formik.errors.nominal && (
                    <div className="text-red-700 m-0">
                      {formik.errors.nominal}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Typography className="w-96">Bukti Transaksi</Typography>
                <div className="w-full">
                  {prevImgBuktiTransaksi && (
                    <img
                      src={prevImgBuktiTransaksi}
                      alt="Struktur Organisasi Preview"
                      className="w-44 h-22 pb-3"
                    />
                  )}
                  <Input
                    id="bukti_transaksi"
                    type="file"
                    label="Bukti Transaksi"
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

                      formik.setFieldValue(
                        "bukti_transaksi",
                        e.currentTarget.files
                      );
                      handleBuktiTransaksiChange(e); // Call the function handleBuktiTransaksiChange
                    }}
                    onBlur={formik.handleBlur}
                    multiple={false}
                  />
                  {formik.touched.bukti_transaksi &&
                    formik.errors.bukti_transaksi && (
                      <div className="text-red-700 m-0">
                        {formik.errors.bukti_transaksi}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 flex gap-3">
            <Button className="bg-blue-900" type="submit">
              Ubah Data
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UbahKeuanganView;
