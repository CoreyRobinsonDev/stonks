import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import axios from "axios";

import { useAppSelector } from "../util/hooks";
import RegisterCSS from "../modules/Register.module.css";

const Register = () => {
  const [username, setUsername] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);
  const [confirmPassword, setConfirmedPassword] = useState<null | string>(null);
  const [alert, setAlert] = useState("");
  const user = useAppSelector(state => state.user.loggedUser);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("https://stonks-crd.herokuapp.com/register", {
      username,
      password,
      confirmPassword
    }).then(() => navigate("/"))
    .catch((err) => setAlert(err.response.data))
  }

  return <section className={RegisterCSS.container}>
    {user && <Navigate to="/home" />}
    <form className={RegisterCSS.form} onSubmit={(e) => handleSubmit(e)}>
    <h1 className={RegisterCSS.title}>Register</h1>
      <label htmlFor="username">Username:
        <input
          style={{border: `${alert === "Username Already Exists" ? "1px solid red" : "1px solid"}`}}
          className={RegisterCSS.form__input} id="username" type="text" onChange={(e) => setUsername(e.target.value)} autoFocus required />
      </label>
      <label htmlFor="password">Password:
        <input
          style={{border: `${alert === "Passwords Don't Match" ? "1px solid red" : "1px solid"}`}}
          className={RegisterCSS.form__input} id="password" type="password" onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <label htmlFor="confirm-password">Confirm Password:
        <input
          style={{border: `${alert === "Passwords Don't Match" ? "1px solid red" : "1px solid"}`}}
          className={RegisterCSS.form__input} id="confirm-password" type="password" onChange={(e) => setConfirmedPassword(e.target.value)} required />
      </label>
      <small className={RegisterCSS.alert}>{alert}</small>
      <input className={`${RegisterCSS.form__btn} hover`} type="submit" value="Register" />
    </form>
    <div className={RegisterCSS.footer}>
      <p>Already have an account?</p>
      <Link className={`${RegisterCSS.login} hover`} to="/">Log In</Link>
    </div>
  </section>
}
export default Register;