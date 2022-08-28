import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../util/hooks";
import { setUser } from "../app/features/userSlice";
import SettingsCSS from "../modules/Settings.module.css";

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = () => {
    axios.post("https://stonks-crd.herokuapp.com/logout");
    axios.post("https://stonks-crd.herokuapp.com/guest/reset");
    dispatch(setUser(null));
    navigate("/");
  }

  return <section className={SettingsCSS.container}>
    <ul>
      <li><button className={`${SettingsCSS.logout_btn} hover`} onClick={logout}>Log Out</button></li>
    </ul>
  </section>
}
export default Settings;