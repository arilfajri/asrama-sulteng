import React, { useEffect } from "react";
import NavigationBar from "../component/NavigationBar";
import Banner from "../component/Banner";
import {
  BanknotesIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import Footer from "../component/Footer";
import { useDispatch } from "react-redux";
import { getInformasi } from "../config/redux/informasi/informasiThunk";
import { informasiDataSelector } from "../config/redux/informasi/informasiSelector";

const KontakView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInformasi());
  }, [dispatch]);
  const informasi = informasiDataSelector();
  return (
    <div>
      <NavigationBar />
      <Banner text={"Kontak"} />
      <h1 className="text-xl font-semibold my-10 text-center">Hubungi Kami</h1>
      <div className="bg-abuAbu my-10 md:flex flex-col md:py-20 py-8">
        <div className="flex justify-center items-center gap-4">
          <PhoneIcon className="h-8 w-8" />
          <h1 className="font-semibold md:text-lg text-base">
            No.Telp : {informasi[0].no_hp}
          </h1>
        </div>
        <div className="flex justify-center items-center gap-4">
          <EnvelopeIcon className="h-8 w-8" />
          <h1 className="font-semibold md:text-lg text-base">
            Email : {informasi[0].email}
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default KontakView;
