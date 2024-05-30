import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/HomeRh";
import HomeEmployee from "./components/HomeEmployee";
import './App.css';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/homeRh" element={<Home />} />
          <Route path="/home" element={<HomeEmployee />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;