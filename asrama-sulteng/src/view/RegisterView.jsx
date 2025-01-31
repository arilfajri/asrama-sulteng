import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Footer from "../component/Footer";
import React, { useState } from "react";
import NavigationBar from "../component/NavigationBar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../config/redux/auth/authThunk";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const RegisterView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confPassword: "",
      role: "user",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, "Nama harus terdiri dari setidaknya 2 karakter")
        .required("Nama diperlukan"),
      email: Yup.string()
        .email("Email tidak valid")
        .required("Email diperlukan"),
      password: Yup.string()
        .min(6, "Password harus terdiri dari setidaknya 6 karakter")
        .required("Password diperlukan"),
      confPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          "Konfirmasi password harus sesuai dengan password"
        )
        .required("Konfirmasi password diperlukan"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("value", values);
        formik.resetForm();
        dispatch(register(values));
      } catch (error) {
        console.error("Login failed:", error.response.data.msg);
      }
    },
  });
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
            Register
          </Typography>

          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography color="blue-gray" className="-mb-3">
                Nama
              </Typography>
              <div>
                <Input
                  id="name"
                  size="lg"
                  placeholder="Masukkan nama!"
                  className=" !border-t-blue-gray-200 focus:!border-orangeAsrama2"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-700 m-0">{formik.errors.name}</div>
                )}
              </div>
              <Typography color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <div>
                <Input
                  id="email"
                  size="lg"
                  placeholder="Masukkan email!"
                  className=" !border-t-blue-gray-200 focus:!border-orangeAsrama2"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-700 m-0">{formik.errors.email}</div>
                )}
              </div>
              <Typography color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    size="lg"
                    placeholder="Masukkan password!"
                    className=" !border-t-blue-gray-200 focus:!border-orangeAsrama2"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </div>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-700 m-0">
                    {formik.errors.password}
                  </div>
                )}
              </div>
              <Typography color="blue-gray" className="-mb-3">
                Confirm Password
              </Typography>
              <div>
                <div className="relative">
                  <Input
                    id="confPassword"
                    type={showConfPassword ? "text" : "password"}
                    size="lg"
                    placeholder="Masukkan konfirmasi password!"
                    className=" !border-t-blue-gray-200 focus:!border-orangeAsrama2"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={formik.values.confPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                    onClick={() => setShowConfPassword(!showConfPassword)}
                  >
                    {showConfPassword ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </div>
                </div>
                {formik.touched.confPassword && formik.errors.confPassword && (
                  <div className="text-red-700 m-0">
                    {formik.errors.confPassword}
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="mt-6"
              fullWidth
              color="deep-orange"
            >
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Sudah punya akun?{" "}
              <a href="/login" className="font-medium text-orangeAsrama2">
                Login
              </a>
            </Typography>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterView;
