"use client";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import axios from "axios";

export const LoginComponent = () => {
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/authentication/token/new?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
            );
            const requestToken = data.request_token;
            router.push(
                `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${encodeURIComponent(
                    "http://localhost:3000/profile"
                )}`
            );
        } catch (error) {
            console.error("Error fetching request token:", error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen px-10 pt-20 bg-white dark:bg-[#111]">
            <div className="bg-white dark:bg-[#111] shadow-md rounded p-8 max-w-md w-full text-center">
                <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">
                    Join MovieFlix
                </h1>
                <p className="mb-6 text-black dark:text-white">
                    Create an account to enjoy the following benefits:
                </p>
                <ul className="text-left list-disc list-inside mb-6 text-black dark:text-white">
                    <li>Add movies to your favorites</li>
                    <li>Create custom playlists</li>
                    <li>Rate and review movies</li>
                    <li>Get personalized recommendations</li>
                    <li>Stay updated with the latest releases</li>
                </ul>
                <Button
                    onClick={handleLogin}
                    className="bg-[#FF6F61] text-white px-4 py-2 rounded hover:bg-[#FF4A3B] transition duration-300"
                >
                    Login with TMDb
                </Button>
            </div>
        </div>
    );
}
