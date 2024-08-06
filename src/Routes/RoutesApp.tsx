import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../Pages/SignIn";
import SingUp from "../Pages/SingUp";
import Home from "../Pages/Home";

function RoutesApp() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/singup" element={<SingUp />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;