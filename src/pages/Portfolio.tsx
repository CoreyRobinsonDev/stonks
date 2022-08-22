import AccountDetails from "../components/AccountDetails";
import Doughnut from "../components/Doughnut";
import RecentActivity from "../components/RecentActivity";
import PortfolioCSS from "../modules/Portfolio.module.css";

const { container, portfolio__body } = PortfolioCSS;

const Portfolio = () => {
  return <section className={container}>
    <AccountDetails />
    <div className={portfolio__body}>
      <Doughnut/>
      <RecentActivity />
    </div>
  </section>
}
export default Portfolio;