import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/process/Dashboard";
import ProcessForm from "./components/forms/ProcessForm";
import ProcessDetails from "./pages/process/ProcessDetails";
import UserManagement from "./pages/users/UserManagement";
import AreaManagement from "./pages/areas/AreaManagement";
import SubprocessManagement from "./pages/subprocess/SubprocessManagement";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/process/new" element={<ProcessForm />} />
                <Route path="/process/:id" element={<ProcessDetails />} />
                <Route path="/areas" element={<AreaManagement />} />
                <Route path="/subprocess" element={<SubprocessManagement />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
