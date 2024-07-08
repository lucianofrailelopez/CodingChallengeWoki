"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAuthActions } from "../../hooks/useAuthActions";
import axios from "axios";
import { Button } from "@mui/material";

const Profile = () => {
  const router = useRouter();
  const { isAuthenticated, userName } = useSelector(
    (state: RootState) => state.auth
  );
  const { loginSuccessAction, accessTokenAction } = useAuthActions();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const request_token = params.get("request_token");

    if (!isAuthenticated && !request_token) {
      router.push("/login");
    } else if (request_token) {
      const fetchUserDetails = async () => {
        try {
          const { data: sessionData } = await axios.post(
            `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
            { request_token }
          );
          const { data: accountData } = await axios.get(
            `https://api.themoviedb.org/3/account?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionData.session_id}`
          );
          loginSuccessAction(accountData);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      accessTokenAction(request_token);
      fetchUserDetails();
    }
  }, [isAuthenticated, loginSuccessAction, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col justify-center items-center h-screen px-10 pt-20 bg-[#fff] dark:bg-[#111]">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen px-10 pt-20 bg-[#fff] dark:bg-[#111]">
      <h1 className="text-[#111] mt-2 dark:text-[#eee]">
        Welcome, {userName}!
      </h1>
      <Button
        onClick={() => router.push("/")}
        className="bg-[#FF6F61] text-white px-4 py-2 rounded hover:bg-[#FF4A3B] transition duration-300"
      >
        Go to Home
      </Button>
    </div>
  );
};

export default Profile;
