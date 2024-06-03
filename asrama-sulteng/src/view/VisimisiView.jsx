import React, { useEffect } from "react";
import NavigationBar from "../component/NavigationBar";
import Footer from "../component/Footer";
import Banner from "../component/Banner";
import { useDispatch } from "react-redux";
import { getInformasi } from "../config/redux/informasi/informasiThunk";
import { informasiDataSelector } from "../config/redux/informasi/informasiSelector";

const VisimisiView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInformasi());
  }, [dispatch]);
  const informasi = informasiDataSelector();
  return (
    <div>
      <NavigationBar />
      <Banner text={"Visi Misi"} />
      {/* visi */}
      <div className="bg-abuAbu my-10 md:flex md:py-20 py-8 text-justify p-5">
        <div className="w-full md:w-2/5 flex flex-col items-center justify-center mb-3 md:mb-0">
          <div className="text-3xl uppercase font-bold">Visi</div>
          <div
            className="h-1 bg-orangeAsrama w-16
          "
          ></div>
        </div>
        <div className="w-full md:w-3/5 flex items-center justify-center">
          {informasi[0].visi}
        </div>
      </div>
      {/* visi */}
      {/* misi */}
      <div className="bg-abuAbu my-10 md:flex md:py-20 py-8 text-justify p-5">
        <div className="w-full md:w-2/5 flex flex-col items-center justify-center mb-3 md:mb-0">
          <div className="text-3xl uppercase font-bold">Misi</div>
          <div
            className="h-1 bg-orangeAsrama w-20
          "
          ></div>
        </div>
        <div className="w-full md:w-3/5 flex flex-col md:gap-4 gap-2">
          {informasi[0].misi.split("\n").map((item, index) => (
            <div key={index}>
              {item}
              <br />
            </div>
          ))}
        </div>
      </div>
      {/* misi */}
      <Footer />
    </div>
  );
};

export default VisimisiView;
