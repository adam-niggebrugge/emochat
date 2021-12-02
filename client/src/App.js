import "./App.css";

import Login from "./components/login/index";
import Register from "./components/register/index";
import Menu from "./components/menu/index";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className="App">

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
              <Route path="/menu" element={<Menu />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
