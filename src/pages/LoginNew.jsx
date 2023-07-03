import React from "react";
import { Link, useNavigate } from "react-router-dom";

//mantine
import { TextInput, PasswordInput, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

//hooks
import { useAuth } from "../hooks";

//services
import { loginAdmin } from "../services";

//store
import { useAuthStore } from "../store";

export const LoginNew = () => {
  const token = useAuth();

  const { loginUser } = useAuthStore((state) => ({
    loginUser: state.loginUser,
  }));

  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(true);

  //form
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value === "" ? "Password required" : null),
    },
  });

  const signin = async (values) => {
    setLoading(true);
    const response = await loginAdmin(values);
    if (!response) {
      setLoading(false);

      return form.setFieldError("email", "Wrong credentials");
    }

    loginUser(response.refresh_token, response.access_token, "User");

    setLoading(false);

    navigate("/dashboard");
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
                  Login
                </span>
                <span className="text-xs text-secondary font-light mt-2">
                  Please fill bellow to get your mobile authentication key
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
                  {/*    <TextInput
                    label="Username"
                    placeholder="Please enter your username"
                    size="xs"
                    withAsterisk
                    {...form.getInputProps("username")}
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
                  /> */}
                  <PasswordInput
                    placeholder="Enter password"
                    label="Password"
                    withAsterisk
                    {...form.getInputProps("password")}
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
                  <span className="text-xs text-black font-light mt-2">
                    {"don't"} have an account sign up{" "}
                    <Link to="/register" className="font-bold text-primary">
                      here
                    </Link>
                  </span>
                  <button
                    type="submit"
                    className="w-full rounded-[4px] bg-primary mt-4 duration-300 hover:bg-primaryDark text-white text-sm flex justify-center items-center h-10"
                  >
                    {loading ? "Loading ..." : "Confirm"}
                  </button>
                  <span className="text-xs text-black font-light mt-2">
                    {"don't"} Did forget you password?{" "}
                    <Link
                      to="/forget-password"
                      className="font-bold text-primary"
                    >
                      click here
                    </Link>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
