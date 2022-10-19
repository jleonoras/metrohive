import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Error from "./page/Error";
import "./component/nav.css";
import Register from "./page/Register";
import Navbar from "./component/StyledNavbar";
import AddListing from "./page/AddListing";
import Listing from "./page/Listing";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addlisting" element={<AddListing />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
