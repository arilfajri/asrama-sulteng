import React from "react";
import NavigationBar from "../component/NavigationBar";
import { Button } from "@material-tailwind/react";
import Footer from "../component/Footer";

const VisimisiView = () => {
  return (
    <div>
      <NavigationBar />
      {/* banner */}
      <div className="md:h-64 h-52 relative flex items-center justify-center mt-20">
        <img
          src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full object-cover md:h-64 md:w-full lg:w-full lg:h-full h-52"
        />

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center">
          <div className="md:h-24 h-16 bg-black bg-opacity-50 md:w-96 w-72 text-white text-center uppercase font-bold md:text-3xl text-xl flex items-center justify-center">
            visi misi
          </div>
        </div>
      </div>
      {/* banner */}
      {/* visi */}
      <div className="bg-abuAbu my-10 md:flex md:py-20 py-8 text-justify">
        <div className="w-full md:w-2/5 flex flex-col items-center justify-center mb-3 md:mb-0">
          <div className="text-3xl uppercase font-bold">Visi</div>
          <div
            className="h-1 bg-orangeAsrama w-16
          "
          ></div>
        </div>
        <div className="w-full md:w-3/5 flex items-center justify-center">
          Menjadi komunitas hunian yang inklusif, mendukung pertumbuhan pribadi,
          dan menciptakan atmosfer positif bagi setiap penghuni, di mana
          kebersamaan dan tanggung jawab menjadi landasan utama.
        </div>
      </div>
      {/* visi */}
      {/* misi */}
      <div className="bg-abuAbu my-10 md:flex md:py-20 py-8 text-justify">
        <div className="w-full md:w-2/5 flex flex-col items-center justify-center mb-3 md:mb-0">
          <div className="text-3xl uppercase font-bold">Misi</div>
          <div
            className="h-1 bg-orangeAsrama w-20
          "
          ></div>
        </div>
        <div className="w-full md:w-3/5 flex flex-col md:gap-4 gap-2">
          <div>
            Memberikan pengalaman hunian yang ramah dan inklusif bagi setiap
            penghuni.
          </div>
          <div>
            Menciptakan lingkungan yang mendukung pertumbuhan pribadi, akademik,
            dan sosial.
          </div>
          <div>
            Menyelenggarakan beragam kegiatan dan program untuk memperkuat rasa
            kebersamaan di antara penghuni.
          </div>
          <div>
            Menyediakan fasilitas dan layanan yang memenuhi kebutuhan penghuni
            untuk mencapai kesejahteraan optimal.
          </div>
          <div>
            {" "}
            Menghargai keragaman dan mendukung toleransi di antara penghuni
            Asrama.
          </div>
          <div>
            Mendorong partisipasi aktif dalam pengelolaan dan penyelenggaraan
            kegiatan Asrama.
          </div>
          <div>
            Menyediakan ruang untuk ekspresi kreatif dan pertukaran ide di
            antara penghuni.
          </div>
          <div>
            Menjunjung tinggi nilai-nilai keadilan, transparansi, dan tanggung
            jawab dalam semua kegiatan Asrama.
          </div>
          <div>
            Memastikan keamanan dan kenyamanan sebagai prioritas utama bagi
            semua penghuni Asrama.
          </div>
          Menyediakan platform untuk pertukaran pengalaman dan
          pengetahuan antar penghuni.
          <div></div>
        </div>
      </div>
      {/* misi */}
      <Footer />
    </div>
  );
};

export default VisimisiView;
