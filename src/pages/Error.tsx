import { Link } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import ErrorCSS from "../modules/Error.module.css";

const Error = () => {
  return <section className={ErrorCSS.container}>
    <Link className={ErrorCSS.link} to="/"><RiArrowGoBackFill/></Link>
    <h1>Page not found.</h1>
  </section>
}
export default Error;