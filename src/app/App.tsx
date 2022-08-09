import { Routes, Route } from "react-router-dom";

import Buy from "../pages/Buy";
import Sell from "../pages/Sell";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Quote from "../pages/Quote";
import Portfolio from "../pages/Portfolio";
import Error from "../pages/Error";
  
  
import './App.css';

function App() {
  return <>
    <header>
      <h1>STØNKS</h1>
    </header>
    <main>
      <Routes>
        <>
          <Route path="/portfolio" element={<Portfolio/>} />
          <Route path="/buy" element={<Buy/>} />
          <Route path="/sell" element={<Sell/>} />
          <Route path="/quote" element={<Quote/>} />
        </>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/error" element={<Error/>} />
      </Routes>
    </main>
    <footer>

    </footer>
  </>
}

export default App;
