import { Link } from "react-router-dom";
import { RiHome2Fill, RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaMoneyCheckAlt, FaChartBar } from "react-icons/fa";
import { TbListSearch } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import NavBarCSS from "../modules/NavBar.module.css";

const Navbar = () => {
  return <nav className={NavBarCSS.container}>
    <ul className={`${NavBarCSS.list} ${NavBarCSS.desktop_list}`}>
      <li><Link className={`${NavBarCSS.list__item} hover`} to="/home">Home</Link></li>
      <li><Link className={`${NavBarCSS.list__item} hover`} to="/portfolio">Portfolio</Link></li>
      <li><Link className={`${NavBarCSS.list__item} hover`} to="/quote">Quote</Link></li>
      <li><Link className={`${NavBarCSS.list__item} hover`} to="/buy">Buy</Link></li>
      <li><Link className={`${NavBarCSS.list__item} hover`} to="/sell">Sell</Link></li>
      <li><Link className={`${NavBarCSS.list__item} hover`} to="/settings">Settings</Link></li>
    </ul>
    <ul className={`${NavBarCSS.list} ${NavBarCSS.mobile_list}`}>
      <li><Link className={NavBarCSS.list__item} to="/home"><RiHome2Fill title="Home" /></Link></li>
      <li><Link className={NavBarCSS.list__item} to="/portfolio"><FaChartBar title="Portfolio" /></Link></li>
      <li><Link className={NavBarCSS.list__item} to="/quote"><TbListSearch title="Quote" /></Link></li>
      <li><Link className={NavBarCSS.list__item} to="/buy"><FaMoneyCheckAlt title="Buy" /></Link></li>
      <li><Link className={NavBarCSS.list__item} to="/sell"><RiMoneyDollarBoxFill title="Sell" /></Link></li>
      <li><Link className={NavBarCSS.list__item} to="/settings"><MdOutlineSettings title="Settings" /></Link></li>
    </ul>
  </nav>
}
export default Navbar;