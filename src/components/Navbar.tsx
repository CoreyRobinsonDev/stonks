import { Link } from "react-router-dom";
import { RiHome2Fill, RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaMoneyCheckAlt, FaChartBar } from "react-icons/fa";
import { TbListSearch } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";

const Navbar = () => {
  return <nav>
    <ul>
      <li><Link to="/home"><RiHome2Fill title="Home" /></Link></li>
      <li><Link to="/portfolio"><FaChartBar title="Portfolio" /></Link></li>
      <li><Link to="/quote"><TbListSearch title="Quote" /></Link></li>
      <li><Link to="/buy"><FaMoneyCheckAlt title="Buy" /></Link></li>
      <li><Link to="/sell"><RiMoneyDollarBoxFill title="Sell" /></Link></li>
      <li><Link to="/settings"><MdOutlineSettings title="Settings" /></Link></li>
    </ul>
  </nav>
}
export default Navbar;