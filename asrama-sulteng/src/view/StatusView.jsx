import React, { useEffect } from "react";
import SidebarCalonPenghuni from "../component/SidebarCalonPenghuni";
import TopBar from "../component/TopBar";
import { Typography, Stepper, Step, Spinner } from "@material-tailwind/react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { getAllMahasiswa } from "../config/redux/mahasiswa/mahasiswaThunk";
import {
  mahasiswaSelector,
  mahasiswaSelectorId,
} from "../config/redux/mahasiswa/mahasiswaSelector";

const StatusView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMahasiswa());
  }, [dispatch]);
  const mahasiswa = mahasiswaSelector();
  console.log(mahasiswa?.status);
  return (
    <div className="flex">
      <SidebarCalonPenghuni />
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
            <Stepper
              activeStep={
                mahasiswa.status === null
                  ? 0
                  : mahasiswa.status === "Diterima"
                  ? 2
                  : 1
              }
              activeLineClassName="bg-green-500"
            >
              <Step
                className=""
                activeClassName="!bg-green-500"
                completedClassName="!bg-green-500"
              >
                <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                  <Typography className=" text-black">Data Terkirim</Typography>
                </div>
              </Step>
              <Step
                className=""
                activeClassName="!bg-green-500"
                completedClassName="!bg-green-500"
              >
                <Spinner color="white" />
                <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                  <Typography className=" text-black">Menunggu</Typography>
                </div>
              </Step>
              <Step
                className=""
                activeClassName="!bg-white"
                completedClassName="!bg-red-500"
              >
                {mahasiswa?.status === null ? (
                  <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                    <Typography className=" text-black"></Typography>
                  </div>
                ) : mahasiswa?.status === "Diterima" ? (
                  <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                    <CheckCircleIcon className="text-green-500 h-14 w-14" />
                    <Typography className=" text-black">Diterima</Typography>
                  </div>
                ) : (
                  <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                    <XMarkIcon className="text-red-500 h-14 w-14" />
                    <Typography className=" text-black">Ditolak</Typography>
                  </div>
                )}
              </Step>
            </Stepper>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusView;
