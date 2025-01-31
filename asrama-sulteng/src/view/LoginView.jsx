import React, { useEffect, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Footer from "../component/Footer";
import NavigationBar from "../component/NavigationBar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../config/redux/auth/authThunk";
import { authRole } from "../config/redux/auth/authSelector";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const LoginView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const userRole = authRole();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Email tidak valid")
        .required("Email diperlukan"),
      password: Yup.string()
        .min(6, "Password harus terdiri dari setidaknya 6 karakter")
        .required("Password diperlukan"),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(login(values));
        formik.resetForm();
      } catch (error) {
        console.error("Gagal melakukan dispatch:", error);
      }
    },
  });

  useEffect(() => {
    if (userRole === "admin") {
      navigate("/dashboard");
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Login berhasil",
      });
    } else if (userRole === "user") {
      navigate("/kamar");
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Login berhasil",
      });
    }
  }, [userRole, navigate]);

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

          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
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
            </div>

            <Button
              type="submit"
              className="mt-6"
              fullWidth
              color="deep-orange"
            >
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
