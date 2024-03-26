import React from "react";
import NavigationBar from "../component/NavigationBar";
import Banner from "../component/Banner";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import Footer from "../component/Footer";

const InformasiBiayaView = () => {
  return (
    <div>
      <NavigationBar />
      <Banner text={"Informasi Biaya"} />
      <div className="bg-abuAbu my-10 md:flex md:py-20 py-8 justify-center items-center gap-6">
        <BanknotesIcon className="h-24 w-24 text-orangeAsrama mx-auto md:mx-0" />
        <h1 className="font-semibold md:text-xl text-base text-center">
          "Iuran Bulanan Hanya 100 Ribu: Kenyamanan Terjangkau di Asrama
          Tora-Tora"
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default InformasiBiayaView;
