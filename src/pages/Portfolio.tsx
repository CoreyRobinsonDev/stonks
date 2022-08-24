import AccountDetails from "../components/AccountDetails";
import Doughnut from "../components/Doughnut";
import RecentActivity from "../components/RecentActivity";
import PortfolioCSS from "../modules/Portfolio.module.css";

const Portfolio = () => {
  return <section>
    <AccountDetails />
    <div className={PortfolioCSS.portfolio__body}>
      <Doughnut/>
      <RecentActivity />
    </div>
  </section>
}
export default Portfolio;