import { useAppSelector } from "../util/hooks";

const AccountDetails = () => {
  const user = useAppSelector(state => state.user.loggedUser);


  return <section>
    <p>Welcome, {user?.username}</p>
    <p>Balance: ${user?.balance.toLocaleString("en-US")}</p>
  </section>
}
export default AccountDetails;