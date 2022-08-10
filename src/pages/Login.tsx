import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../util/hooks";
import { setUser } from "../features/userSlice";

const Login = () => {
  const [username, setUsername] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);
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
      navigate("/portfolio");
    })
  }

  return <section>
    {user && <Navigate to="/portfolio" />}
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="username">Username:</label>
      <input id="username" type="text" onChange={(e) => setUsername(e.target.value)} />
      <label htmlFor="password">Password:</label>
      <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <input type="submit" value="Log In" />
    </form>
  </section>
}
export default Login;