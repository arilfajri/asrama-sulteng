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
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { kamardataSelector } from "../config/redux/kamar/kamarSelector";
import { useDispatch } from "react-redux";
import { deleteKamar, getAllKamar } from "../config/redux/kamar/kamarThunk";
import Sidebar from "../component/Sidebar";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

const KamarView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllKamar());
  }, [dispatch]);
  const kamar = kamardataSelector();
  console.log("kamar", kamar);
  const handleDeleteKamar = (id) => {
    Swal.fire({
      title: "Apakah anda yakin ingin menhapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Tidak, batalkan!",
      confirmButtonText: "Iya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Terhapus!",
          text: "Data Kamu Telah Terhapus",
          icon: "success",
        });
        dispatch(deleteKamar(id))
          .then(() => {
            dispatch(getAllKamar());
          })
          .catch((error) => {
            console.error("Error deleting kamar:", error);
          });
      }
    });
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <TopBar />
        <div className="p-5">
          <Typography className=" text-xl">Kelola Kamar Asrama</Typography>
        </div>
        <div className="px-5 flex justify-between">
          <Link to={"/kelolakamar/tambah"}>
            <Button color="green">Tambah Data</Button>
          </Link>
          <div>
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
        <div className="p-5 grid grid-cols-3 gap-4 justify-between">
          {kamar &&
            kamar.map((kamarItem) => (
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
                <CardFooter className="pt-0 flex items-center justify-between">
                  <Button className=" bg-blue-900">
                    <Link
                      to={`/kelolakamar/detail/${kamarItem.id}`}
                      state={kamarItem}
                    >
                      Detail Kamar
                    </Link>
                  </Button>
                  <div className="flex gap-2 ">
                    <Link
                      to={`/kelolakamar/ubah/${kamarItem.id}`}
                      state={kamarItem}
                    >
                      <Tooltip content="Ubah">
                        <PencilSquareIcon
                          color="green"
                          className=" h-6 w-6 cursor-pointer"
                        />
                      </Tooltip>
                    </Link>
                    <Tooltip content="Hapus">
                      <TrashIcon
                        color="red"
                        className="h-6 w-6 cursor-pointer"
                        onClick={() => handleDeleteKamar(kamarItem.id)}
                      />
                    </Tooltip>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default KamarView;
