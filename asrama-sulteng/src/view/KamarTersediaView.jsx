import React from "react";
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

const KamarTersediaView = () => {
  return (
    <div className="flex">
      <SidebarCalonPenghuni />
      <div className="w-full">
        <TopBar />
        <div className="p-5">
          <Typography className=" text-xl">Kamar Tersedia</Typography>
        </div>
        <div className="p-5 grid grid-cols-3 gap-4 justify-between">
          <Card className="mt-6">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src="https://images.unsplash.com/photo-1623625434462-e5e42318ae49?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="card-image"
                className="h-full w-full"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray">
                UI/UX Review Check
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Link to="/kamar/detail">
                <Button className=" bg-blue-900">Pilih Kamar</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className="mt-6">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src="https://images.unsplash.com/photo-1623625434462-e5e42318ae49?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="card-image"
                className="h-full w-full"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray">
                UI/UX Review Check
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Link to="/kamar/detail">
                <Button className=" bg-blue-900">Pilih Kamar</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className="mt-6">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src="https://images.unsplash.com/photo-1623625434462-e5e42318ae49?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="card-image"
                className="h-full w-full"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray">
                UI/UX Review Check
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Link to="/kamar/detail">
                <Button className=" bg-blue-900">Pilih Kamar</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className="mt-6">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src="https://images.unsplash.com/photo-1623625434462-e5e42318ae49?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="card-image"
                className="h-full w-full"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray">
                UI/UX Review Check
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Link to="/kamar/detail">
                <Button className=" bg-blue-900">Pilih Kamar</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className="mt-6">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src="https://images.unsplash.com/photo-1623625434462-e5e42318ae49?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="card-image"
                className="h-full w-full"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray">
                UI/UX Review Check
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Link to="/kamar/detail">
                <Button className=" bg-blue-900">Pilih Kamar</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className="mt-6">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src="https://images.unsplash.com/photo-1623625434462-e5e42318ae49?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="card-image"
                className="h-full w-full"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray">
                UI/UX Review Check
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Link to="/kamar/detail">
                <Button className=" bg-blue-900">Pilih Kamar</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KamarTersediaView;
