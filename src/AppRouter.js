import React from 'react';
import {Box, Typography} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import Login from "./Login";
import SignUp from "./SignUp";

function CopyRight() {
    return (<Typography variant="body2" color="textSecondary" align="center">
        Copyright &copy; tj academy {new Date().getFullYear()}
    </Typography>
    )
}
const AppRouter = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<App />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
            <Box mt={5}>
                <CopyRight />
            </Box>
        </div>
    );
};

export default AppRouter;