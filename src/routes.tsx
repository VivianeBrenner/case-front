import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
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
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
   
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/process/new" element={<ProcessForm />} />
          <Route path="/process/:id" element={<ProcessDetails />} />
          <Route path="/areas" element={<AreaManagement />} />
          <Route path="/subprocess" element={<SubprocessManagement />} />
        </Route>


        <Route element={<PrivateRoute role="ADMIN" />}>
          <Route path="/users" element={<UserManagement />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
