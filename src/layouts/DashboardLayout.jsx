/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";

//hooks
import { useAuth } from "../hooks";

//store
import { useAuthStore } from "../store";

//react router
import { useNavigate } from "react-router-dom";

//services
import { getCode } from "../services";

export const DashboardLayout = () => {
  const token = useAuth();

  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const { logoutUser } = useAuthStore((state) => ({
    logoutUser: state.logoutUser,
  }));

  const fetch = async () => {
    const response = await getCode(token);
    setCode(response?.code);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <header className="w-full flex justify-center items-center flex-col">
        <nav className="flex justify-between items-center w-full mb-10 pt-8">
          <img
            src={"/svg/waf.svg"}
            alt="sumz_logo"
            className="w-10 object-cover"
          />
          <button
            type="button"
            onClick={() => {
              logoutUser();
              navigate("/login");
            }}
            className="rounded-full border border-primary bg-primary py-3 px-5 text-sm text-white transition-all hover:bg-white hover:text-primary"
          >
            Logout
          </button>
        </nav>
        <h1 className="head_text">
          Stay safe with <br className="max-md:hidden" />
          <span className="orange_gradient">Hate Speech Model</span>{" "}
        </h1>
        <h2 className="desc mt-20">
          Enhancing Online Safety and Combating Harmful Language.
        </h2>
      </header>
      <section className="mt-16 w-full max-w-xl">
        <div className="flex flex-col w-full gap-2">
          <form className="relative gap-4 flex justify-center items-center">
            <img
              src={"/svg/key.svg"}
              alt="link_icon"
              className="absolute left-4 my-2 ml-3 w-5"
            />
            <input
              type="text"
              value={code}
              required
              className="url_input peer"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(
                  "77b39ece-a99d-4145-86d6-c68b210747e7"
                );
              }}
              className="black_btn"
            >
              Copy
            </button>
            {/*     <button
              type="submit"
              className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
            >
              ↩︎
            </button> */}
          </form>
        </div>
      </section>
    </>
  );
};
