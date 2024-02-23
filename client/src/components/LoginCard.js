import React, { useEffect } from "react";
import { BsFilter } from "react-icons/bs";
import { FaSpotify } from "react-icons/fa";
import { GoogleIcon } from "./shared/GoogleIcon";
import { IoMdChatbubbles } from "react-icons/io";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { MdSwipe } from "react-icons/md";
import { PbjLogo } from "./shared/PbjLogo";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Div100vh from "react-div-100vh";

const LoginCard = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["loggedIn"]);

  useEffect(() => {
    grabTokenAndRedirect();
  }, []);

  const grabTokenAndRedirect = () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("token")) {
      const jwt = urlParams.get("token");
      const id = parseInt(urlParams.get("id"));
      sessionStorage.setItem("jwt", jwt);
      sessionStorage.setItem("userId", id);
      setCookie("loggedIn", true, { path: "/", expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) })
      if (urlParams.get("new")) {
        navigate("/welcome");
      } else {
        navigate("/swipe");
      }
    }
  };
  return (
    <Div100vh>
      <div className="fixed top-0 border-b border-slate-200 flex flex-row justify-center w-full bg-white h-12 items-center">
        <button className="relative">
          <div className="h-auto w-6">
            <PbjLogo />
          </div>
        </button>
      </div>
      <div className="overflow-y-scroll mx-auto">
        <div className="bg-gradient-animation text-white pt-12">
          <div className="inner-container py-6">
            <h1 className="font-bold text-xl">
              Welcome to Peanut Butter & Jam!
            </h1>
            <p className="mt-1">
              We are a music-based social networking app. We match you with
              folks who have similar music taste to you.
            </p>
          </div>
        </div>

        <div className="inner-container">
          <h2 className="font-bold text-xl">How it works</h2>
          <ol className="mt-2 flex flex-col gap-3">
            <li className="flex gap-3 items-center justify-start">
              <div className="bg-slate-100 p-2 rounded-md w-10 h-10 flex items-center justify-center">
                <FaSpotify size="1.5em" className="text-slate-950" />
              </div>
              <div className="flex-1">
                Create an account with Spotify. It gives us a sense of your
                music taste
              </div>
            </li>
            <li className="flex gap-3 items-center justify-start">
              <div className="bg-slate-100 p-2 rounded-md w-10 h-10 flex items-center justify-center">
                <MdSwipe size="1.5em" className="text-slate-950" />
              </div>
              <div className="flex-1">
                Swipe on folks with similar music taste
              </div>
            </li>
            <li className="flex gap-3 items-center justify-start">
              <div className="bg-slate-100 p-2 rounded-md w-10 h-10 flex items-center justify-center">
                <BsFilter size="1.5em" className="text-slate-950" />
              </div>
              <div className="flex-1">
                Filter based on distance, what instruments people play, and
                genres they enjoy
              </div>
            </li>
            <li className="flex gap-3 items-center justify-start">
              <div className="bg-slate-100 p-2 rounded-md w-10 h-10 flex items-center justify-center">
                <IoMdChatbubbles size="1.5em" className="text-slate-950" />
              </div>
              <div className="flex-1">
                Request to Jam with folks you think you'd vibe with
              </div>
            </li>
            <li className="flex gap-3 items-center justify-start">
              <div className="bg-slate-100 p-2 rounded-md w-10 h-10 flex items-center justify-center">
                <MdOutlineConnectWithoutContact
                  size="1.5em"
                  className="text-slate-950"
                />
              </div>
              <div className="flex-1">
                Chat with your matches and form a musical connection
              </div>
            </li>
          </ol>
        </div>

        <div className="inner-container pt-0">
          <div className="max-w-[350px] mx-auto text-center">
            <div className="mt-6 text-xs text-slate-900 px-10">
              <i>
                Use Spotify to instantly be matched with folks based on your
                music taste
              </i>
            </div>
            <div className="my-2">
              <a
                href={`${process.env.REACT_APP_BACKEND_URL}/authenticate-spotify`}
              >
                <div className="button-black px-5">
                  <div className="flex items-center justify-center gap-4">
                    <FaSpotify color="#1cd760" style={{ fontSize: "1.5em" }} />
                    <div>Continue with Spotify</div>
                  </div>
                </div>
              </a>
            </div>
            <div className="my-2">
              <a
                href={`${process.env.REACT_APP_BACKEND_URL}/authenticate-google`}
              >
                <div className="button-black px-5">
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-auto w-6">
                      <GoogleIcon />
                    </div>
                    <div>Continue with Google</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full text-center text-xs">
        <a href="https://www.termsfeed.com/live/d6ab7a46-b8e7-4d06-bcaa-d6e80093445c" target="_blank">
          View Privacy Policy
        </a>
        {" | "}
        <a href="https://www.termsfeed.com/live/d4646c97-ebd9-4a57-aa8a-aa133b450433" target="_blank">
          View Terms of Service
        </a>
      </div>
    </Div100vh>
  );
};

export default LoginCard;
