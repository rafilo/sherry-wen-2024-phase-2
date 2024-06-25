import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
    Typography,
    Snackbar,
    CircularProgress,
  } from "@mui/material";
import { useState } from "react";
export const DashBoard = () => {
    const useremailInStore = useSelector((state: RootState) => state.loggedinUser)
    const [loading, setLoading] = useState(false);

    const handleLoadingClose = () => {
        setLoading(false);
      };
    return (
        <div className="min-h-screen bg-gray-100">
            <Snackbar
                open={loading}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                style={{ background: "rgba(0, 0, 0, 0.3)", top: 0 }}
                sx={{ height: "100%", width: "100%" }}
                onClose={handleLoadingClose}
            >
                <div>
                <CircularProgress style={{color: "#0288d1"}}/>
                <Typography
                    sx={{ mt: 4, mb: 2, fontWeight: "bold" }}
                    variant="h6"
                    component="div"
                    style={{ color: "#0288d1", position:"relative", left:"-45px"}}
                    >
                    Now Loading...
                    </Typography>
                
                </div>
            </Snackbar>
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                            </div>

                        </div>
                    </div>
                </div>
            </nav>

            
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">dashboard</div>
                </header>

            <main>current user
                <div>{useremailInStore.userEmail}</div>
            </main>
        </div>
    )
}