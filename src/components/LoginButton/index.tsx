"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useAuthActions } from "@/hooks/useAuthActions";
import { useEffect, useState } from "react";

export const LoginButton = () => {
    const { isAuthenticated } = useSelector((state: any) => state.auth);
    const { logoutAction } = useAuthActions();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleLogout = () => {
        logoutAction();
        router.push("/");
    };

    if (!isClient) {
        return null;
    }

    return (
        <>
            {isAuthenticated ? (
                <Button onClick={handleLogout} variant="contained">
                    Logout
                </Button>
            ) : (
                <Button
                    onClick={() => router.push("/login")}
                    variant="contained"
                    sx={{
                        backgroundColor: "#FF6F61",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#FF4A3B",
                        },
                    }}
                >
                    Login
                </Button>
            )}
        </>
    );
};
