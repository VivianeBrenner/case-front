import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Dashboard />} />
               {/*  <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;


