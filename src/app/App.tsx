import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import Buy from "../pages/Buy";
import Sell from "../pages/Sell";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Quote from "../pages/Quote";
import Portfolio from "../pages/Portfolio";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Error from "../pages/Error";
import { useAppDispatch, useAppSelector } from "../util/hooks";
import { setUser } from "../features/userSlice"; 
import './App.css';

function App() {
  const user = useAppSelector(state => state.user.loggedUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.get("/user/getLoggedUser")
      .then((res) => dispatch(setUser(res.data)))
  }, [dispatch])

  return <>
    <header>
      <h1>STØNKS</h1>
      <Navbar/>
    </header>
    <main>
      <Routes>
        {user && <>
          <Route path="/home" element={<Home/>} />
          <Route path="/portfolio" element={<Portfolio/>} />
          <Route path="/buy" element={<Buy/>} />
          <Route path="/sell" element={<Sell/>} />
          <Route path="/quote" element={<Quote/>} />
        </>}
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </main>
    <footer>

    </footer>
  </>
}

export default App;
