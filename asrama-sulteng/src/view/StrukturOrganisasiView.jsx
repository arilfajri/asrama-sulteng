import React, { useEffect } from "react";
import NavigationBar from "../component/NavigationBar";
import Banner from "../component/Banner";
import strukturOrganisasi from "../assets/strukturorganisasi.png";
import Footer from "../component/Footer";
import { useDispatch } from "react-redux";
import { getInformasi } from "../config/redux/informasi/informasiThunk";
import { informasiDataSelector } from "../config/redux/informasi/informasiSelector";

const StrukturOrganisasiView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInformasi());
  }, [dispatch]);
  const informasi = informasiDataSelector();
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
          src={informasi[0].struktur_organisasi}
          alt=""
        />
      </div>
      <Footer />
    </div>
  );
};

export default StrukturOrganisasiView;
