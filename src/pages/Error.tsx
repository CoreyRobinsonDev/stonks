import { Link } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";

const Error = () => {
  return <section>
    <Link to="/"><RiArrowGoBackFill/></Link>
    <h1>Page not found.</h1>
  </section>
}
export default Error;