import "./App.css";
import { Route, Routes } from "react-router-dom";

//working generic chat
//import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";

// emochat styled components
import Login from "./components/login/index";
import Register from "./components/register/index";
// import Menu from "./components/menu/index";
// import Room from "./components/message/index";


function App() {
  return (
    <>
      <div className="App">
          <Routes>
          {/* <Route path="/menu" element={<Menu />} />
              <Route path="/message" element={<Room />} />*/}
            
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} /> 
            <Route path="/chats" element={<Chatpage />} />
        </Routes> 
      </div>
    </>
  );
}

export default App;