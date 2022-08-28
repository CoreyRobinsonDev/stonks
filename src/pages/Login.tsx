import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../util/hooks";
import { setUser } from "../app/features/userSlice";
import LoginCSS from "../modules/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState<string>("Guest");
  const [password, setPassword] = useState<string>("guest");
  const [isGuest, setIsGuest] = useState(false);
  const user = useAppSelector(state => state.user.loggedUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isGuest) {
      await axios({
        method: "POST",
        url: "https://stonks-crd.herokuapp.com/register",
        withCredentials: true,
        data: {
          username,
          password,
          confirmPassword: password
        },
      })
    }

    axios({
      method: "POST",
      withCredentials: true,
      url: "https://stonks-crd.herokuapp.com/login",
      data: {
        username,
        password
      }
      }).then((res) => {
      dispatch(setUser(res.data));
      navigate("/home");
    })
  }

  const setGuest = () => {
    setUsername(`Guest${new Date().getTime().toString()}`);
    setPassword("guest");
    setIsGuest(true);
  }

  return <section className={LoginCSS.container}>
    {user && <Navigate to="/home" />}
    <form className={LoginCSS.form} onSubmit={(e) => handleSubmit(e)}>
    <h1 className={LoginCSS.title}>Log In</h1>
      <label htmlFor="username">Username:
        <input className={LoginCSS.form__input} id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <label htmlFor="password">Password:
        <input className={LoginCSS.form__input} id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <input className={`${LoginCSS.form__btn_submit} ${LoginCSS.form__btn} hover`} type="submit" value="Log In" />
      <button className={`${LoginCSS.form__btn} hover`} onClick={setGuest}>Continue as "Guest"</button>
    </form>
    <div className={LoginCSS.footer}>
      <p>Don't have an account?</p>
      <Link className={`${LoginCSS.register} hover`} to="/register">Register</Link>
    </div>
  </section>
}
export default Login;