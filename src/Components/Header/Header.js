import "./Header.scss";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

function Header() {
  // console.log(typeof AccountCircleOutlinedIcon);
  return (
    <>
      <header className="header">
        <nav className="header-nav">
          <div className="header-nav__home">
            <Link to="/properties">escaperoom</Link>
          </div>
          <div className="header-nav__link">
            <Link to="/properties/agents">LETTING AGENTS</Link>
          </div>
          <div className="header-nav__link">
            <Link to="/properties/add">ADD NEW LISTING</Link>
          </div>
          <div className="header-nav__login">
            <AccountCircleOutlinedIcon />
          </div>
        </nav>
      </header>
    </>
  );
}
export default Header;
