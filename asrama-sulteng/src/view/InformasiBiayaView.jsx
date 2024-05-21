import React, { useEffect } from "react";
import NavigationBar from "../component/NavigationBar";
import Banner from "../component/Banner";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import Footer from "../component/Footer";
import { useDispatch } from "react-redux";
import { getInformasi } from "../config/redux/informasi/informasiThunk";
import { informasiDataSelector } from "../config/redux/informasi/informasiSelector";

const InformasiBiayaView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInformasi());
  }, [dispatch]);
  const informasi = informasiDataSelector();
  return (
    <div>
      <NavigationBar />
      <Banner text={"Informasi Biaya"} />
      <div className="bg-abuAbu my-10 md:flex md:py-20 py-8 justify-center items-center gap-6">
        <BanknotesIcon className="h-24 w-24 text-orangeAsrama mx-auto md:mx-0" />
        <h1 className="font-semibold md:text-xl text-base text-center">
          {informasi[0].biaya}
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default InformasiBiayaView;
