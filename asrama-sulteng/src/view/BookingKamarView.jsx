import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../component/TopBar";
import SidebarCalonPenghuni from "../component/SidebarCalonPenghuni";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createMahasiswa,
  getAllMahasiswa,
} from "../config/redux/mahasiswa/mahasiswaThunk";
import Swal from "sweetalert2";
import { updateKamar } from "../config/redux/kamar/kamarThunk";
import "react-datepicker/dist/react-datepicker.css";
import { daftar_jurusan, daftar_universitas } from "../config/data/listData";

const BookingKamarView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [jenis_kelamin, setJenisKelamin] = useState();
  const [jenjang, setJenjang] = useState();
  const data = location.state;

  useEffect(() => {
    dispatch(getAllMahasiswa());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      nama: "",
      jenis_kelamin: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      email: "",
      no_hp: "",
      alamat_asal: "",
      universitas: "",
      jurusan: "",
      angkatan: "",
      jenjang: "",
      ktp: "",
      kartu_keluarga: "",
      surat_ket_aktif_kuliah: "",
    },
    validationSchema: Yup.object().shape({
      nama: Yup.string().required("Nama diperlukan").min(3, "Minimal 3 huruf"),
      // jenis_kelamin: Yup.string().required("Jenis kelamin diperlukan"),
      tempat_lahir: Yup.string().required("Tempat lahir diperlukan"),
      tanggal_lahir: Yup.date().required("Tanggal lahir diperlukan"),
      email: Yup.string()
        .email("Email tidak valid")
        .required("Email diperlukan"),
      no_hp: Yup.string()
        .required("Nomor HP diperlukan")
        .matches(/^\d+$/, "No hp harus berupa angka")
        .max(12, "Nomor HP tidak boleh lebih dari 12 angka")
        .min(11, "Nomor HP minimal 11 angka"),
      alamat_asal: Yup.string().required("Alamat asal diperlukan"),
      universitas: Yup.string().required("Universitas diperlukan"),
      jurusan: Yup.string().required("Jurusan diperlukan"),
      angkatan: Yup.string()
        .required("Angkatan diperlukan")
        .matches(/^\d+$/, "Angkatan harus berupa angka")
        .max(4, "Angkatan tidak boleh lebih dari 4 angka")
        .min(4, "Angkatan minimal 4 angka"),
      ktp: Yup.string().required("KTP diperlukan"),
      kartu_keluarga: Yup.string().required("Kartu Keluarga diperlukan"),
      surat_ket_aktif_kuliah: Yup.string().required(
        "Surat keterangan aktif kuliah diperlukan"
      ),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("nama", values.nama);
      formData.append("jenis_kelamin", jenis_kelamin || values.jenis_kelamin);
      formData.append("jenjang", jenjang || values.jenjang);
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
      // formik.resetForm();
      Swal.fire({
        icon: "question",
        showDenyButton: true,
        title: "Apakah anda yakin ingin melakukan booking?",
        confirmButtonText: "Ya",
        denyButtonText: `Batalkan`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await dispatch(createMahasiswa(formData));
            await dispatch(
              updateKamar({
                id: data.id,
                nomor_kamar: data.nomor_kamar,
                fasilitas: data.fasilitas,
              })
            );
            navigate("/status");
          } catch (error) {
            console.error("Failed to create mahasiswa:", error);
          }
          Swal.fire(
            "Saved!",
            "Kamu telah melakukan booking, silahkan menunggu diverifikasi terlebih dahulu",
            "success"
          );
        } else if (result.isDenied) {
          Swal.fire("Booking dibatalkan!", "", "error");
        }
      });
    },
  });

  return (
    <div className="flex">
      <div className="hidden md:flex">
        <SidebarCalonPenghuni />
      </div>
      <div className="w-full">
        <TopBar />
        <div className="p-5">
          <Typography className="text-xl">
            Silahkan Mengisi Data Bagi Calon Penghuni Asrama
          </Typography>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-5">
            <div className="flex flex-col gap-5">
              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">Nama</Typography>
                <div className="w-full pt-3 md:pt-0">
                  <Input
                    id="nama"
                    label="Nama"
                    value={formik.values.nama}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.nama && formik.errors.nama && (
                    <div className="text-red-700 m-0">{formik.errors.nama}</div>
                  )}
                </div>
              </div>
              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">Jenis Kelamin</Typography>
                <div className="w-full pt-3 md:pt-0">
                  <Select
                    id="jenis_kelamin"
                    label="Jenis Kelamin"
                    onChange={(val) => setJenisKelamin(val)}
                    // onChange={formik.handleChange}
                    // value={formik.values.jenis_kelamin}
                    onBlur={formik.handleBlur}
                  >
                    <Option value="Laki-Laki">Laki-Laki</Option>
                    <Option value="Perempuan">Perempuan</Option>
                  </Select>
                </div>
              </div>
              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">Tempat Lahir</Typography>
                <div className="w-full pt-3 md:pt-0">
                  <Input
                    id="tempat_lahir"
                    label="Tempat Lahir"
                    value={formik.values.tempat_lahir}
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
              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">Tanggal Lahir</Typography>
                <div className="w-full pt-3 md:pt-0">
                  <Input
                    id="tanggal_lahir"
                    className="w-full"
                    label="Tanggal Lahir"
                    type="date"
                    value={formik.values.tanggal_lahir}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  {formik.touched.tanggal_lahir &&
                    formik.errors.tanggal_lahir && (
                      <div className="text-red-700 m-0">
                        {formik.errors.tanggal_lahir}
                      </div>
                    )}
                </div>
              </div>
              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">Email</Typography>
                <div className="w-full pt-3 md:pt-0">
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
              </div>
              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">No. Hp</Typography>
                <div className="w-full pt-3 md:pt-0">
                  <Input
                    id="no_hp"
                    className="w-full"
                    label="No.Hp"
                    type="number"
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
              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">Alamat Asal</Typography>
                <div className="w-full pt-3 md:pt-0">
                  <Input
                    id="alamat_asal"
                    className="w-full"
                    label="Alamat"
                    value={formik.values.alamat_asal}
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
              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">Universitas</Typography>
                <div className="w-full pt-3 md:pt-0">
                  <Input
                    id="universitas"
                    className="w-full"
                    label="Universitas"
                    value={formik.values.universitas}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    list="university-list"
                  />
                  <datalist id="university-list">
                    {daftar_universitas.map((uni, index) => (
                      <option key={index} value={uni} />
                    ))}
                  </datalist>
                  {formik.touched.universitas && formik.errors.universitas && (
                    <div className="text-red-700 m-0">
                      {formik.errors.universitas}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">Jurusan</Typography>
                <div className="w-full pt-3 md:pt-0">
                  <Input
                    id="jurusan"
                    className="w-full"
                    label="Jurusan"
                    list="jurusan-list"
                    value={formik.values.jurusan}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <datalist id="jurusan-list">
                    {daftar_jurusan.map((uni, index) => (
                      <option key={index} value={uni} />
                    ))}
                  </datalist>
                  {formik.touched.jurusan && formik.errors.jurusan && (
                    <div className="text-red-700 m-0">
                      {formik.errors.jurusan}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">Angkatan</Typography>
                <div className="w-full pt-3 md:pt-0">
                  <Input
                    id="angkatan"
                    className="w-full"
                    label="Angkatan"
                    type="number"
                    value={formik.values.angkatan}
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
              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">Jenjang</Typography>
                <div className="w-full pt-3 md:pt-0">
                  <Select
                    id="jenjang"
                    label="Jenjang"
                    onChange={(val) => setJenjang(val)}
                    // onChange={formik.handleChange}
                    // value={formik.values.jenis_kelamin}
                    onBlur={formik.handleBlur}
                  >
                    <Option value="S1">S1</Option>
                    <Option value="S2">S2</Option>
                    <Option value="S3">S3</Option>
                    <Option value="D1">D1</Option>
                    <Option value="D2">D2</Option>
                    <Option value="D3">D3</Option>
                    <Option value="D4">D4</Option>
                  </Select>
                </div>
              </div>
              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">Kamar Yang Di Booking</Typography>
                <Input
                  className="w-full"
                  label="Kamar"
                  value={data.nomor_kamar}
                  disabled
                />
              </div>
              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">KTP</Typography>
                <div className="w-full pt-3 md:pt-0">
                  <Input
                    id="ktp"
                    className="w-full"
                    type="file"
                    label="KTP"
                    onChange={(e) => {
                      const file = e.currentTarget.files[0];
                      const maxSize = 5 * 1024 * 1024; // 5 MB dalam byte

                      if (file && file.size > maxSize) {
                        Swal.fire({
                          title: "Ukuran file tidak boleh melebihi 5MB!",
                          icon: "error",
                        });
                        formik.setFieldError(
                          "ktp",
                          "Ukuran file melebihi 5 MB"
                        );
                        return;
                      }

                      formik.setFieldValue("ktp", e.currentTarget.files);
                    }}
                    onBlur={formik.handleBlur}
                    multiple={false}
                    accept="application/pdf"
                  />
                  <div className="text-blue-900 m-0 text-sm">
                    *.pdf(maxSize: 5MB)
                  </div>
                  {formik.touched.ktp && formik.errors.ktp && (
                    <div className="text-red-700 m-0">{formik.errors.ktp}</div>
                  )}
                </div>
              </div>

              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">Kartu Keluarga</Typography>
                <div className="w-full pt-3 md:pt-0">
                  <Input
                    id="kartu_keluarga"
                    className="w-full"
                    type="file"
                    label="KK"
                    onChange={(e) => {
                      const file = e.currentTarget.files[0];
                      const maxSize = 5 * 1024 * 1024; // 5 MB dalam byte

                      if (file && file.size > maxSize) {
                        Swal.fire({
                          title: "Ukuran file tidak boleh melebihi 5MB!",
                          icon: "error",
                        });
                        formik.setFieldError(
                          "kartu_keluarga",
                          "Ukuran file melebihi 5 MB"
                        );
                        return;
                      }

                      formik.setFieldValue(
                        "kartu_keluarga",
                        e.currentTarget.files
                      );
                    }}
                    onBlur={formik.handleBlur}
                    multiple={false}
                    accept="application/pdf"
                  />
                  <div className="text-blue-900 m-0 text-sm">
                    *.pdf(maxSize: 5MB)
                  </div>
                  {formik.touched.kartu_keluarga &&
                    formik.errors.kartu_keluarga && (
                      <div className="text-red-700 m-0">
                        {formik.errors.kartu_keluarga}
                      </div>
                    )}
                </div>
              </div>
              <div className="flex md:items-center flex-col md:flex-row items-start">
                <Typography className="w-96">
                  Surat Ket.Aktif Kuliah / Bukti Diterima Kuliah
                </Typography>
                <div className="w-full pt-3 md:pt-0">
                  <Input
                    id="surat_ket_aktif_kuliah"
                    className="w-full"
                    type="file"
                    label="Ket.Aktif Kuliah"
                    onChange={(e) => {
                      const file = e.currentTarget.files[0];
                      const maxSize = 5 * 1024 * 1024; // 5 MB dalam byte

                      if (file && file.size > maxSize) {
                        Swal.fire({
                          title: "Ukuran file tidak boleh melebihi 5MB!",
                          icon: "error",
                        });
                        formik.setFieldError(
                          "surat_ket_aktif_kuliah",
                          "Ukuran file melebihi 5 MB"
                        );
                        return;
                      }

                      formik.setFieldValue(
                        "surat_ket_aktif_kuliah",
                        e.currentTarget.files
                      );
                    }}
                    onBlur={formik.handleBlur}
                    multiple={false}
                    accept="application/pdf"
                  />
                  <div className="text-blue-900 m-0 text-sm">
                    *.pdf(maxSize: 5MB)
                  </div>
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
              Booking
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingKamarView;
