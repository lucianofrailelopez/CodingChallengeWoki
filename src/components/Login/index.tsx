"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useAuthActions } from "@/hooks/useAuthActions";

export const Login = () => {
    const { isAuthenticated } = useSelector((state: any) => state.auth);
    const { logoutAction } = useAuthActions()
    const router = useRouter();
    const handleLogout = () => {
        logoutAction();
        localStorage.removeItem("request_token");
        router.push("/");
    };
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
    )
}