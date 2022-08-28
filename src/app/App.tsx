import { Routes, Route, useLocation } from "react-router-dom";
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
import Settings from "../pages/Settings";
import Error from "../pages/Error";
import { useAppDispatch, useAppSelector } from "../util/hooks";
import { setUser } from "./features/userSlice"; 
import './App.css';

function App() {
  const user = useAppSelector(state => state.user.loggedUser);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    axios.get("https://stonks-crd.herokuapp.com/user/getLoggedUser")
      .then((res) => dispatch(setUser(res.data)))
  }, [dispatch])

  
  return <>
    <header className="app__header">
      <h1>{location.pathname === "/home" || location.pathname === "/" ? "STØNKS" : location.pathname.slice(1).replace(/^./, location.pathname.slice(1)[0].toUpperCase())}</h1>
      {user && <Navbar/>}
    </header>
    <main>
      <Routes>
        {user && <>
          <Route path="/home" element={<Home/>} />
          <Route path="/portfolio" element={<Portfolio/>} />
          <Route path="/buy" element={<Buy/>} />
          <Route path="/sell" element={<Sell/>} />
          <Route path="/quote" element={<Quote/>} />
          <Route path="/settings" element={<Settings/>} />
        </>}
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </main>
    <footer className="app__footer">
      <small>This site was created for educational purposes and is not meant to be a functional service. All data is provided by Polygon.io's free api, which is limited to 5 requests per minute.</small>
      <small><a href="https://github.com/CoreyRobinsonDev/stonks" target="_blank" rel="noreferrer">{"<View Code>"}</a></small>
    </footer>
  </>
}

export default App;
