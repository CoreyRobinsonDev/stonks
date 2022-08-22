import { Link } from "react-router-dom";
import { RiHome2Fill, RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaMoneyCheckAlt, FaChartBar } from "react-icons/fa";
import { TbListSearch } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import NavBarCSS from "../modules/NavBar.module.css";

const { container, list, list__item } = NavBarCSS;

const Navbar = () => {
  return <nav className={container}>
    <ul className={list}>
      <li><Link className={list__item} to="/home"><RiHome2Fill title="Home" /></Link></li>
      <li><Link className={list__item} to="/portfolio"><FaChartBar title="Portfolio" /></Link></li>
      <li><Link className={list__item} to="/quote"><TbListSearch title="Quote" /></Link></li>
      <li><Link className={list__item} to="/buy"><FaMoneyCheckAlt title="Buy" /></Link></li>
      <li><Link className={list__item} to="/sell"><RiMoneyDollarBoxFill title="Sell" /></Link></li>
      <li><Link className={list__item} to="/settings"><MdOutlineSettings title="Settings" /></Link></li>
    </ul>
  </nav>
}
export default Navbar;