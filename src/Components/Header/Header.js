import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <nav>
        <div>ESCAPEROOM</div>
        <div>
          <Link to="/properties">PROPERTIES</Link>
        </div>
        <div>
          <Link to="/properties/agents">LETTING AGENTS</Link>
        </div>
        <div>
          <Link to="/properties/add">ADD NEW LISTING</Link>
        </div>
      </nav>
    </>
  );
}
export default Header;
