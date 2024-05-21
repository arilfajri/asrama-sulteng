import React, { useEffect } from "react";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { getInformasi } from "../config/redux/informasi/informasiThunk";
import { useDispatch } from "react-redux";
import { informasiDataSelector } from "../config/redux/informasi/informasiSelector";

const Footer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInformasi());
  }, [dispatch]);
  const informasi = informasiDataSelector();
  console.log(informasi);
  return (
    <div>
      <div className="bg-abuAbu px-14 py-10">
        <h1 className=" font-semibold">Asrama Tora-Tora</h1>
        <div className="md:flex gap-4 md:gap-0 flex-none">
          <div className="md:w-1/2">
            <div className="flex gap-2 mt-3">
              <MapPinIcon className="h-5 w-5" />
              <p className="text-sm">J{informasi[0].alamat}</p>
            </div>
            <div className="flex gap-2 mt-3">
              <PhoneIcon className="h-5 w-5" />
              <p className="text-sm">{informasi[0].no_hp}</p>
            </div>
            <div className="flex gap-2 mt-3">
              <EnvelopeIcon className="h-5 w-5" />
              <p className="text-sm">{informasi[0].email}</p>
            </div>
          </div>
          <div className="md:w-1/2 flex gap-6 justify-center">
            <div className="text-sm">
              <a href="">
                <h1 className="mt-3 hover:text-orangeAsrama">Visi Misi</h1>
              </a>
              <a href="">
                <h1 className="mt-3 hover:text-orangeAsrama">
                  Struktur Organisasi
                </h1>
              </a>
              <a href="">
                <h1 className="mt-3 hover:text-orangeAsrama">
                  Informasi Biaya
                </h1>
              </a>
            </div>
            <div className="text-sm">
              <a href="">
                <h1 className="mt-3 hover:text-orangeAsrama">Kontak</h1>
              </a>
              <a href="">
                <h1 className="mt-3 hover:text-orangeAsrama">
                  Data Mahasiswa Penghuni
                </h1>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-orangeAsrama2 p-4 text-center text-sm">
        2024 Copyright Asrama Tora-Tora
      </div>
    </div>
  );
};

export default Footer;
