import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import axios from "axios";

import { useAppSelector } from "../util/hooks";

const Register = () => {
  const [username, setUsername] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);
  const [confirmPassword, setConfirmedPassword] = useState<null | string>(null);
  const [alert, setAlert] = useState("");
  const user = useAppSelector(state => state.user.loggedUser);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("/register", {
      username,
      password,
      confirmPassword
    }).then(() => navigate("/"))
    .catch((err) => setAlert(err.response.data))
  }
  return <section className="container">
    {user && <Navigate to="/home" />}
    <h1 className="title">Register</h1>
    <form className="form__container" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="username">Username:</label>
      <input id="username" type="text" onChange={(e) => setUsername(e.target.value)} autoFocus required />
      <label htmlFor="password">Password:</label>
      <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required />
      <label htmlFor="confirm-password">Confirm Password:</label>
      <input id="confirm-password" type="password" onChange={(e) => setConfirmedPassword(e.target.value)} required />
      <input type="submit" value="Register" />
    </form>
    <span>{alert}</span>
    <div>
      <p>Already have an account?</p>
      <Link to="/">Log In</Link>
    </div>
  </section>
}
export default Register;