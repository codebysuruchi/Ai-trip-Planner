import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import { useNavigation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // const navigation = useNavigation();
  const [openDiolog, setOpenDiolog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(user);
  });

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google token:", tokenResponse);
      getUserProfile(tokenResponse);
    },
    onError: (error) => console.log(error),
  });

  const getUserProfile = async (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        },
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDiolog(false);
        window.location.reload();
      });
  };

  return (
    <div>
      <div className="p-2 shadow-sm flex justify-between items-center px-4 sm:px-5 flex-wrap gap-2">
        {/* <img src="/logo.svg" alt="" /> */}
        <div className="flex gap-1">
          <img
            className="h-[30px] w-[30px] rounded-xl"
            src="/ymlogo.jpg"
            alt=""
          />
          <p className="text-black font-bold text-sm sm:text-base md:text-lg">YatraMitra</p>
        </div>
        <div>
          {user ? (
            <div className="flex  gap-2 sm:gap-5 items-center">
              <a href="/create-trip">
                <Button variant="outline" className="rounded-full text-white hover:text-gray-300 text-xs sm:text-sm md:text-base px-3 sm:px-4">
                  + Create Trip
                </Button>
              </a>
              <a href="/my-trips">
                <Button variant="outline" className="hover:text-gray-300 rounded-full text-white text-xs sm:text-sm md:text-base px-3 sm:px-4">
                  My Trips
                </Button>
              </a>
              <Popover>
                <PopoverTrigger asChild>
                  <img
                    src={user?.picture}
                    className="h-[30px] w-[30px]  sm:h-[35px] sm:w-[35px] rounded-full"
                    alt=""
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <h2
                    className="cursor-pointer "
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Logout
                  </h2>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button
              onClick={() => setOpenDiolog(true)}
              variant="outline"
              className="rounded-full text-white "
            >
              Sign In
              <Dialog open={openDiolog} onOpenChange={setOpenDiolog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="sr-only">
                      Sign in to YatraMitra
                    </DialogTitle>

                    <div className="flex gap-3 items-center">
                      <img
                        src="/ymlogo.jpg"
                        className="h-[30px] w-[30px] rounded-xl"
                        alt="YatraMitra"
                      />
                      <span className="font-bold text-gray-700">
                        YatraMitra
                      </span>
                    </div>

                    <h2 className="font-bold text-lg mt-7">
                      Sign In With Google
                    </h2>

                    <DialogDescription>
                      Sign in to the app with Google authentication securely.
                    </DialogDescription>
                  </DialogHeader>

                  <Button
                    disabled={loading}
                    onClick={login}
                    className="mt-5 w-full flex gap-4 items-center"
                  >
                    <FcGoogle className="h-7 w-7" />
                    Sign In With Google
                  </Button>
                </DialogContent>
              </Dialog>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
