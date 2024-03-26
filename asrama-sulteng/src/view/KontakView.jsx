import React from "react";
import NavigationBar from "../component/NavigationBar";
import Banner from "../component/Banner";
import {
  BanknotesIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import Footer from "../component/Footer";

const KontakView = () => {
  return (
    <div>
      <NavigationBar />
      <Banner text={"Kontak"} />
      <h1 className="text-xl font-semibold my-10 text-center">Hubungi Kami</h1>
      <div className="bg-abuAbu my-10 md:flex flex-col md:py-20 py-8">
        <div className="flex justify-center items-center gap-4">
          <PhoneIcon className="h-8 w-8" />
          <h1 className="font-semibold md:text-lg text-base">
            No.Telp : 0822-1761-1246
          </h1>
        </div>
        <div className="flex justify-center items-center gap-4">
          <EnvelopeIcon className="h-8 w-8" />
          <h1 className="font-semibold md:text-lg text-base">
            Email : asramatoratora.bdg@gmail.com
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default KontakView;
