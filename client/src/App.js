import logo from "./logo.svg";
import "./App.css";
import InteractiveEmoji from "./components/InteractiveEmoji";
import Login from "./components/login/index";
import Register from "./components/register/index";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          {/* <InteractiveEmoji /> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
