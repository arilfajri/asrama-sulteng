import React, { useEffect } from "react";
import NavigationBar from "../component/NavigationBar";
import { Button } from "@material-tailwind/react";
import budaya1 from "../assets/banyakOrang.png";
import budaya2 from "../assets/recycle.png";
import budaya3 from "../assets/waktu.png";
import Footer from "../component/Footer";
import { getInformasi } from "../config/redux/informasi/informasiThunk";
import { informasiDataSelector } from "../config/redux/informasi/informasiSelector";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const HomeView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInformasi());
  }, [dispatch]);
  const informasi = informasiDataSelector();
  console.log(informasi);
  return (
    <div>
      <NavigationBar />
      {/* banner */}
      <div className="md:h-96 h-72 relative flex items-center justify-center mt-20">
        <img
          src={informasi[0]?.banner}
          alt=""
          className="w-full object-cover md:h-96 md:w-full lg:w-full lg:h-full h-72 brightness-50"
        />
        <div className="text-white text-center absolute">
          <h1 className="lg:text-3xl md:text-3xl text-2xl font-bold uppercase">
            Selamat Datang Di Asrama Tora - Tora
          </h1>
          <h1 className="capitalize p-3">
            Tempat Nyaman untuk Menjalani Pengalaman Mahasiswa yang Tidak
            Terlupakan
          </h1>
          <h1 className="text-sm pt-12">Segera Booking kamar !</h1>
          <Link to="/login">
            <Button color="deep-orange" className="mt-6">
              Booking
            </Button>
          </Link>
        </div>
      </div>
      {/* banner */}

      {/* deskripsi */}
      <div className="container mx-auto p-5">
        <div className="md:flex py-10">
          <div className="md:w-1/2 ">
            <div className="flex gap-2 py-2">
              <h1 className="text-2xl uppercase font-bold text-orangeAsrama">
                i
              </h1>
              <h1 className="text-2xl uppercase font-bold">
                Asrama Tora - Tora
              </h1>
            </div>
            <p className="text-justify">{informasi[0]?.deskripsi_singkat}</p>
          </div>
          <div className="md:w-1/2">
            <img
              src={informasi[0]?.foto_deskripsi}
              alt=""
              className="lg:w-[400px] md:w-[300px] mx-auto"
            />
          </div>
        </div>
      </div>
      {/* deskripsi */}

      {/* budaya */}
      <div className="bg-abuAbu py-10">
        <h1 className="text-2xl text-center font-semibold">
          Budaya Asrama Tora-Tora
        </h1>
        <div className="md:flex pt-9 justify-center gap-7">
          <div className="text-center md:mt-0 mt-4">
            <img src={budaya1} className="h-20 w-20 mx-auto" alt="" />
            <p className="w-60 mx-auto">
              Berbaik sangka, senyum, bekerja sama, dan musyawarah.
            </p>
          </div>
          <div className=" text-center md:mt-0 mt-4">
            <img src={budaya2} className="h-20 w-20 mx-auto" alt="" />
            <p className="w-60 mx-auto">
              Memungut, memilah, dan memanfaatkan sampah.
            </p>
          </div>
          <div className=" text-center md:mt-0 mt-4">
            <img src={budaya3} className="h-20 w-20 mx-auto" alt="" />
            <p className="w-60 mx-auto">Disiplin waktu dan antri</p>
          </div>
        </div>
      </div>
      {/* budaya */}

      {/* alamat */}
      <div className="py-10 px-5">
        <h1 className="text-2xl text-center font-semibold">Alamat</h1>
        <div className="flex justify-center pt-5">
          <iframe
            width="800"
            height="400"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=+(Asrama%20Tora%20-%20Tora)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            title="Google Maps"
            className=" shadow-xl rounded"
          >
            <a href="https://www.gps.ie/">gps systems</a>
          </iframe>
        </div>
      </div>
      {/* alamat */}
      <Footer className=" pt-6" />
    </div>
  );
};

export default HomeView;
