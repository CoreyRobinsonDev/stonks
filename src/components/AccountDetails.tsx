import { useAppSelector } from "../util/hooks";
import AccDetailsCSS from "../modules/AccountDetails.module.css";

const { container, balance } = AccDetailsCSS;

const AccountDetails = () => {
  const user = useAppSelector(state => state.user.loggedUser);


  return <section className={container}>
    <h2>Welcome, {user?.username}</h2>
    <div>
      <p>Current Balance</p>
      <p className={balance}>${user?.balance.toLocaleString("en-US")}</p>
    </div>
  </section>  
}
export default AccountDetails;