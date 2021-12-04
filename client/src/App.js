import "./App.css";
//working generic chat
import Homepage from "./Pages/Homepage";
import { Route, Routes } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";

// emochat styled components
// import Login from "./components/login/index";
// import Register from "./components/register/index";
// import Menu from "./components/menu/index";
// import Room from "./components/message/index";

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    // <>
    //    <Router>
    <div className="App">
        <Routes>
        {/*      <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/message" element={<Room />} />*/}
          
      <Route path="/" element={<Homepage />} exact />
      <Route path="/chats" element={<Chatpage />} />
      </Routes> 
    </div>
//       </Router>
//     </>
  );
}

export default App;