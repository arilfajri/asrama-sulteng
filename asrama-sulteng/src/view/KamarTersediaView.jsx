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
import { kamarSelector } from "../config/redux/kamar/kamarSelector";
import { useDispatch } from "react-redux";
import { getAllKamar } from "../config/redux/kamar/kamarThunk";

const KamarTersediaView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllKamar());
  }, []);
  const kamar = kamarSelector();
  console.log("kamar", kamar);
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
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray">
                    {kamarItem.nomor_kamar}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Link to={`/kamar/detail/${kamarItem.id}`} state={kamarItem}>
                    <Button className=" bg-blue-900">Pilih Kamar</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default KamarTersediaView;
