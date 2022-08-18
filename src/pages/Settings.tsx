import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../util/hooks";
import { setUser } from "../features/userSlice";

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = () => {
    axios.post("/logout");
    axios.post("/guest/reset");
    dispatch(setUser(null));
    navigate("/");
  }

  return <section>
    <ul>
      <li><button onClick={logout}>Log Out</button></li>
    </ul>
  </section>
}
export default Settings;