import React, { useEffect, useState } from "react";
import SidebarCalonPenghuni from "../component/SidebarCalonPenghuni";
import TopBar from "../component/TopBar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { kamardataSelector } from "../config/redux/kamar/kamarSelector";
import { useDispatch } from "react-redux";
import { getAllKamar } from "../config/redux/kamar/kamarThunk";
import { getAllMahasiswa } from "../config/redux/mahasiswa/mahasiswaThunk";
import { mahasiswaSelector } from "../config/redux/mahasiswa/mahasiswaSelector";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const KamarTersediaView = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [kamarsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    dispatch(getAllKamar());
    dispatch(getAllMahasiswa());
  }, [dispatch]);

  const kamar = kamardataSelector();
  const mahasiswa = mahasiswaSelector();

  const filteredKamar = kamar.filter((kamar) =>
    kamar.nomor_kamar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ambil indeks kamar pertama dan terakhir di setiap halaman
  const indexOfLastKamar = currentPage * kamarsPerPage;
  const indexOfFirstKamar = indexOfLastKamar - kamarsPerPage;
  const currentKamars = filteredKamar.slice(
    indexOfFirstKamar,
    indexOfLastKamar
  );

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const kamarMahasiswa = mahasiswa?.kamar?.id;

  console.log("mahasiswa", mahasiswa);
  console.log("kamar", kamarMahasiswa);
  return (
    <div className="flex">
      <div className="hidden md:flex">
        <SidebarCalonPenghuni />
      </div>
      <div className="w-full">
        <TopBar />
        <div className="p-5 flex justify-between">
          <Typography className=" text-xl">Kamar Tersedia</Typography>
          <div>
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="p-5 grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-4 justify-between">
          {kamar.length === 0 ? (
            <Typography className="p-4 text-center text-red-200 col-span-3 place-self-center">
              Tidak Ada Data Kamar
            </Typography>
          ) : (
            currentKamars.map((kamarItem) => (
              <Card key={kamarItem.id} className="mt-6">
                <CardHeader color="blue-gray" className="relative h-56">
                  <img
                    src={kamarItem.gambar}
                    alt="card-image"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray">
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
            ))
          )}
        </div>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {currentPage} of {Math.ceil(kamar.length / kamarsPerPage)}
          </Typography>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {Array.from(
                { length: Math.ceil(kamar.length / kamarsPerPage) },
                (_, index) => (
                  <IconButton
                    variant="outlined"
                    size="sm"
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </IconButton>
                )
              )}
            </div>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastKamar >= kamar.length}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </div>
    </div>
  );
};

export default KamarTersediaView;
