import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;


// import logo from "./logo.svg";
// import "./App.css";
// import InteractiveEmoji from "./components/InteractiveEmoji";
// import Login from "./components/login/index";
// import Register from "./components/register/index";
// import Menu from "./components/menu/index";
// import Room from "./components/message/index";

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// function App() {
//   return (
//     <>
//       <Router>
//         <div className="App">
//           {/* <InteractiveEmoji /> */}
//           <Routes>
//             <Route path="/" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//               <Route path="/menu" element={<Menu />} />
//               <Route path="/message" element={<Room />} />

//           </Routes>
//         </div>
//       </Router>
//     </>
//   );
// }

// export default App;
