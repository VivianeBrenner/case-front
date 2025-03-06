import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/process/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProcessForm from "./components/forms/ProcessForm";
import ProcessDetails from "./pages/process/ProcessDetails";


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/*  <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
                <Route path="/process/new" element={<ProcessForm />} />
                <Route path="/process/:id" element={<ProcessDetails />} />

            </Routes>
        </Router>
    );
};

export default AppRoutes;


