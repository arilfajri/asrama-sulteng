import React from "react";
import NavigationBar from "../component/NavigationBar";
import { Button } from "@material-tailwind/react";
import budaya1 from "../assets/banyakOrang.png";
import budaya2 from "../assets/recycle.png";
import budaya3 from "../assets/waktu.png";
import Footer from "../component/Footer";

const HomeView = () => {
  return (
    <div>
      <NavigationBar />
      {/* banner */}
      <div className="md:h-96 h-72 relative flex items-center justify-center mt-20">
        <img
          src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
          <Button color="deep-orange" className="mt-6">
            Booking
          </Button>
        </div>
      </div>
      {/* banner */}

      {/* deskripsi */}
      <div className="container mx-auto">
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
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur illo reiciendis temporibus at pariatur, necessitatibus
              perferendis repudiandae libero aut modi exercitationem inventore
              quae recusandae voluptatum officia nulla minima doloremque sit.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://plus.unsplash.com/premium_photo-1681493795338-e797a16e8934?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
      <div className="py-10">
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
