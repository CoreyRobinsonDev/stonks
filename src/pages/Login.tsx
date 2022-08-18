import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../util/hooks";
import { setUser } from "../features/userSlice";

const Login = () => {
  const [username, setUsername] = useState<string>("Guest");
  const [password, setPassword] = useState<string>("guest");
  const user = useAppSelector(state => state.user.loggedUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("/login", {
      username,
      password
    }).then((res) => {
      dispatch(setUser(res.data));
      navigate("/home");
    })
  }
  const setGuest = () => {
    setUsername("Guest");
    setPassword("guest");
  }

  return <section>
    {user && <Navigate to="/home" />}
    <h1>Log In</h1>
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="username">Username:</label>
      <input id="username" type="text" onChange={(e) => setUsername(e.target.value)} />
      <label htmlFor="password">Password:</label>
      <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <input type="submit" value="Log In" />
      <button onClick={setGuest}>Continue as "Guest"</button>
    </form>
    <div>
      <p>Don't have an account?</p>
      <Link to="/register">Register</Link>
    </div>
  </section>
}
export default Login;