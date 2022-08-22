import AccountDetails from "../components/AccountDetails";
import GroupedDailyBars from "../components/GroupedDailyBars";
import HomeCSS from "../modules/Home.module.css";

const { container } = HomeCSS;

const Home = () => {
  return <section className={container}>
    <AccountDetails/>
    <GroupedDailyBars/>
  </section>  
}
export default Home;