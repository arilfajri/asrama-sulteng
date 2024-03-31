import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Footer from "../component/Footer";
import NavigationBar from "../component/NavigationBar";

const LoginView = () => {
  return (
    <div>
      <NavigationBar />
      <div className="flex justify-center items-center mt-28 mb-10">
        <Card
          color="transparent"
          shadow={false}
          className="outline outline-1 p-5 outline-orangeAsrama2 shadow-md"
        >
          <Typography variant="h4" color="black" className="text-center">
            Login
          </Typography>

          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input
                size="lg"
                placeholder="Masukkan email kamu"
                className=" !border-t-blue-gray-200 focus:!border-orangeAsrama2"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="Masukkan password kamu"
                className=" !border-t-blue-gray-200 focus:!border-orangeAsrama2"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <Button className="mt-6" fullWidth color="deep-orange">
              Login
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Belum punya akun?{" "}
              <a href="/register" className="font-medium text-orangeAsrama2">
                Register
              </a>
            </Typography>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default LoginView;
