import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard";
import Employees from "./components/Employees";
import NoMatch from "./components/NoMatch/NoMatch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        {/* <Route path="/register" element={<Registration />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
