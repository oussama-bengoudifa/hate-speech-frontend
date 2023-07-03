import React from "react";
import { Link, useNavigate } from "react-router-dom";

//mantine
import {
  TextInput,
  PasswordInput,
  Loader,
  Modal,
  PinInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

//hooks
import { useAuth } from "../hooks";

//services
import { forgetPassword, resetPassword } from "../services";

//store
import { useAuthStore } from "../store";

export const ForgetPassword = () => {
  const token = useAuth();

  const { loginUser } = useAuthStore((state) => ({
    loginUser: state.loginUser,
  }));

  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [loadingReset, setLoadingReset] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(true);

  //form
  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const formReset = useForm({
    initialValues: {
      password: "",
      code: "",
    },

    validate: {
      code: (value) => (value === "" ? "Code required" : null),
      password: (value) => (value === "" ? "Password required" : null),
    },
  });

  const [opened, { open, close }] = useDisclosure(false);
  const [codeValue, setCodeValue] = React.useState(null);

  const signin = async (values) => {
    setLoading(true);
    const response = await forgetPassword(values);
    console.log(response);
    if (!response) {
      form.setFieldError("email", "User not found");
    }

    open();

    setLoading(false);
  };

  const handleResetPassword = async () => {
    const email = form.values.email;
    setLoadingReset(true);
    const response = await resetPassword({
      email,
      code: codeValue,
      newPassword: formReset.values.password,
    });
    if (!response) {
      setLoadingReset(false);

      return notifications.show({
        title: "Error",
        message: "Wrong Code or was expired,try again submit email",
        color: "red",
      });
    }

    notifications.show({
      title: "Success",
      message: "Your password was been updated successfully",
      color: "green",
      onClose: () => navigate("/login"),
      autoClose: () => navigate("/login"),
    });
  };

  React.useEffect(() => {
    if (token !== null) {
      if (token === "expired") {
        setPageLoading(false);
      } else {
        navigate("/dashboard");
      }
    }
  }, [token]);

  if (pageLoading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader variant="dots" color="#F29727" />
      </div>
    );

  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <Modal opened={opened} onClose={close} title="Reset Password Form">
        <div className="flex flex-col  gap-4 py-6">
          <span className="text-sm text-black  mt-4 underline underline-offset-4 ">
            Please enter the code and new password to reset it
          </span>
          <form
            onSubmit={formReset.onSubmit((values) =>
              handleResetPassword(values)
            )}
            className="flex flex-col gap-3 min-w-[350px] mt-6"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mulish text-xs font-bold text-[#3F3D56] mt-5">
                Code
              </span>
              <PinInput
                onChange={(e) => setCodeValue(e)}
                length={6}
                type="alphanumeric"
              />
            </div>
            <PasswordInput
              placeholder="Enter your new password"
              label="New Password"
              {...formReset.getInputProps("password")}
              className="password-input"
              sx={{
                input: {
                  fontSize: "12px",
                  height: "36px",
                  fontFamily: "Mulish, sans-serif",
                  borderRadius: "4px",
                },
                label: {
                  fontSize: "12px",
                },
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleResetPassword();
              }}
              type="submit"
              className="w-full rounded-[4px] bg-primary mt-4 duration-300 hover:bg-primaryDark text-white text-sm flex justify-center items-center h-10"
            >
              {loadingReset ? "Loading ..." : "Submit"}
            </button>
          </form>
        </div>
      </Modal>
      <div className="app">
        <div className="w-full h-screen">
          <div className="flex h-full relative z-20">
            <div className="flex justify-center items-center w-full">
              <div className="flex items-center flex-col">
                <img
                  src="/svg/waf.svg"
                  alt="Vittlo"
                  className="w-10 h-10 object-contain"
                />
                <span className="font-mulish text-xl font-bold text-[#3F3D56] mt-5">
                  Reset password
                </span>
                <span className="text-xs text-secondary font-light mt-2">
                  Please enter your email
                </span>
                <form
                  onSubmit={form.onSubmit((values) => signin(values))}
                  className="flex flex-col gap-3 min-w-[350px] mt-6"
                >
                  <TextInput
                    label="Email"
                    placeholder="Please enter your email"
                    size="xs"
                    withAsterisk
                    {...form.getInputProps("email")}
                    sx={{
                      input: {
                        fontSize: "12px",
                        height: "36px",
                        fontFamily: "Mulish, sans-serif",
                        border: "1px solid #D8D8D8",
                        background: "#F8F8F8",
                        borderRadius: "4px",
                      },
                    }}
                  />

                  <span className="text-xs text-black font-light mt-2">
                    Go back to login{" "}
                    <Link to="/login" className="font-bold text-primary">
                      click here
                    </Link>
                  </span>
                  <button
                    type="submit"
                    className="w-full rounded-[4px] bg-primary mt-4 duration-300 hover:bg-primaryDark text-white text-sm flex justify-center items-center h-10"
                  >
                    {loading ? "Loading ..." : "Confirm"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
