import React from "react";
import SidebarCalonPenghuni from "../component/SidebarCalonPenghuni";
import TopBar from "../component/TopBar";
import { Typography, Stepper, Step, Spinner } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const StatusView = () => {
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
          <Stepper activeStep={1} activeLineClassName="bg-green-500">
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
              activeClassName="!bg-red-500"
              completedClassName="!bg-red-500"
            >
              <XMarkIcon className=" h-5 w-5" />
              <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                <Typography className=" text-black">Ditolak</Typography>
              </div>
            </Step>
          </Stepper>
        </div>
      </div>
    </div>
  );
};

export default StatusView;
