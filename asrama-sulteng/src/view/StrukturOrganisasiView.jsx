import React from "react";
import NavigationBar from "../component/NavigationBar";
import Banner from "../component/Banner";
import strukturOrganisasi from "../assets/strukturorganisasi.png";
import Footer from "../component/Footer";

const StrukturOrganisasiView = () => {
  return (
    <div>
      <NavigationBar />
      <Banner text={"Struktur Organisasi"} />
      <div className="my-10 flex flex-col justify-center items-center">
        <h1 className="text-xl font-semibold">
          Struktur Organisasi Asrama Tora-Tora
        </h1>
        <img
          className=" mt-8 rounded-md shadow-md p-5"
          src={strukturOrganisasi}
          alt=""
        />
      </div>
      <Footer />
    </div>
  );
};

export default StrukturOrganisasiView;
