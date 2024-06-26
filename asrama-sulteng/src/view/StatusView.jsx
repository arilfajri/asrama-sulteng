import React, { useEffect } from "react";
import SidebarCalonPenghuni from "../component/SidebarCalonPenghuni";
import TopBar from "../component/TopBar";
import {
  Typography,
  Stepper,
  Step,
  Spinner,
  Button,
  Alert,
} from "@material-tailwind/react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import {
  deleteMahasiswa,
  getAllMahasiswa,
} from "../config/redux/mahasiswa/mahasiswaThunk";
import { mahasiswaSelector } from "../config/redux/mahasiswa/mahasiswaSelector";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const StatusView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllMahasiswa());
  }, [dispatch]);
  const mahasiswa = mahasiswaSelector();
  const handleBookingKembali = () => {
    Swal.fire({
      title: "Apakah anda yakin ingin melakukan booking kamar lagi?",
      text: "Data yang kamu input saat booking sebelumnya akan dihapus!",
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
          text: "Silahkan booking kamar lagi :)",
          icon: "success",
        });
        dispatch(deleteMahasiswa(mahasiswa.id))
          .then(() => {
            navigate("/kamar");
          })
          .catch((error) => {
            console.error("Error deleting mahasiswa:", error);
          });
      }
    });
  };
  return (
    <div className="flex">
      <div className="hidden md:flex">
        <SidebarCalonPenghuni />
      </div>
      <div className="w-full">
        <TopBar />
        <div className="p-5">
          <Typography className=" text-xl">
            Status Pendaftaran/Booking
          </Typography>
        </div>
        <div className="w-full py-4 px-8">
          {mahasiswa === undefined ? (
            <Typography className="text-lg text-red-600">
              Anda belum melakukan booking kamar, silahkan booking kamar !
            </Typography>
          ) : (
            <>
              <Stepper
                activeStep={
                  mahasiswa.status === "Menunggu"
                    ? 1
                    : mahasiswa.status === "Diterima" ||
                      mahasiswa.status === "Ditolak"
                    ? 2
                    : 0
                }
                activeLineClassName="bg-green-500"
              >
                <Step
                  className=""
                  activeClassName="!bg-green-500"
                  completedClassName="!bg-green-500"
                >
                  <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                    <Typography className=" text-black">
                      Data Terkirim
                    </Typography>
                  </div>
                </Step>
                <Step
                  className=""
                  activeClassName="!bg-green-500"
                  completedClassName="!bg-green-500"
                >
                  {mahasiswa?.status === "Menunggu" ? (
                    <>
                      <Spinner color="white" />
                      <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                        <Typography className=" text-black">
                          Menunggu
                        </Typography>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                        <Typography className=" text-black">
                          Menunggu
                        </Typography>
                      </div>
                    </>
                  )}
                </Step>
                <Step
                  className={mahasiswa.status === "Diterima" ? "!bg-white" : ""}
                  activeClassName={
                    mahasiswa.status === "Ditolak" ? "!bg-red-500" : ""
                  }
                  completedClassName={
                    mahasiswa.status === "Ditolak" ? "!bg-red-500" : ""
                  }
                >
                  {mahasiswa?.status === "Menunggu" ? (
                    <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                      <Typography className=" text-black"></Typography>
                    </div>
                  ) : mahasiswa?.status === "Diterima" ? (
                    <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                      <CheckCircleIcon className="text-green-500 h-14 w-14" />
                      <Typography className=" text-black">Diterima</Typography>
                    </div>
                  ) : (
                    <div className="absolute -bottom-[1.6rem] ml-2 w-max text-center text-xs">
                      <XMarkIcon className="text-white h-10 w-10" />
                      <Typography className=" text-black">Ditolak</Typography>
                    </div>
                  )}
                </Step>
              </Stepper>
              {mahasiswa?.status === "Ditolak" ? (
                <div className=" flex flex-col h-96 justify-between mt-16">
                  <Alert className=" bg-red-100 text-red-900">
                    <Typography className=" font-semibold">
                      {" "}
                      Mohon maaf anda ditolak dengan alasan :
                    </Typography>
                    <Typography>{mahasiswa?.alasan}</Typography>
                  </Alert>
                  <Button
                    className="text-white w-max"
                    color="red"
                    onClick={handleBookingKembali}
                  >
                    Silahkan booking kamar lagi
                  </Button>
                </div>
              ) : mahasiswa?.status === "Diterima" ? (
                <Alert className=" bg-green-100 text-green-900 mt-16">
                  <Typography className=" font-semibold">
                    {" "}
                    Selamat anda telah diterima di Asrama Tora-Tora(Sulawesi
                    Tengah) Di Bandung
                  </Typography>
                </Alert>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusView;
