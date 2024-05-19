import React, { useEffect } from "react";
import SidebarCalonPenghuni from "../component/SidebarCalonPenghuni";
import TopBar from "../component/TopBar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { kamardataSelector } from "../config/redux/kamar/kamarSelector";
import { useDispatch } from "react-redux";
import { getAllKamar } from "../config/redux/kamar/kamarThunk";
import { getAllMahasiswa } from "../config/redux/mahasiswa/mahasiswaThunk";
import { mahasiswaSelector } from "../config/redux/mahasiswa/mahasiswaSelector";

const KamarTersediaView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllKamar());
    dispatch(getAllMahasiswa());
  }, [dispatch]);
  const kamar = kamardataSelector();
  const mahasiswa = mahasiswaSelector();

  const kamarMahasiswa = mahasiswa?.kamar?.id;

  console.log("mahasiswa", mahasiswa);
  console.log("kamar", kamarMahasiswa);
  return (
    <div className="flex">
      <SidebarCalonPenghuni />
      <div className="w-full">
        <TopBar />
        <div className="p-5">
          <Typography className=" text-xl">Kamar Tersedia</Typography>
        </div>
        <div className="p-5 grid grid-cols-3 gap-4 justify-between">
          {kamar &&
            kamar.map((kamarItem) => (
              <Card key={kamarItem.id} className="mt-6">
                <CardHeader color="blue-gray" className="relative h-56">
                  <img
                    src={kamarItem.gambar}
                    alt="card-image"
                    className={`h-full w-full ${
                      kamarMahasiswa || kamarItem.mahasiswa ? "opacity-50" : ""
                    }`}
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className={`${
                      kamarMahasiswa || kamarItem.mahasiswa ? "opacity-50" : ""
                    }`}
                  >
                    {kamarItem.nomor_kamar}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  {kamarMahasiswa ? (
                    kamarItem.id === kamarMahasiswa ? (
                      <Button className="bg-blue-900" disabled>
                        Anda Telah Membooking Kamar Ini
                      </Button>
                    ) : kamarItem.mahasiswa ? (
                      <Button className="bg-blue-900" disabled>
                        Kamar Terisi
                      </Button>
                    ) : (
                      <Button className="bg-blue-900" disabled>
                        Pilih Kamar
                      </Button>
                    )
                  ) : kamarItem.mahasiswa ? (
                    <Button className="bg-blue-900" disabled>
                      Kamar Terisi
                    </Button>
                  ) : (
                    <Button className="bg-blue-900">
                      <Link
                        to={`/kamar/detail/${kamarItem.id}`}
                        state={kamarItem}
                      >
                        Pilih Kamar
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default KamarTersediaView;
