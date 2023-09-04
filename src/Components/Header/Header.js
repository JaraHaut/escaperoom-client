import "./Header.scss";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

function Header() {
  return (
    <>
      <header className="header">
        <nav className="header-nav">
          <div className="header-nav__home">
            <Link className="header-nav__home-link" to="/properties">
              escape room
            </Link>
          </div>
          <div className="header-nav__agents">
            <Link className="header-nav__agents-link" to="/agencies">
              <div className="header-nav__agents-icon">
                <BusinessOutlinedIcon fontSize="inherit" />
              </div>
              <p className="header-nav__text">LETTING AGENTS</p>
            </Link>
          </div>
          <div className="header-nav__newlisting">
            <Link className="header-nav__newlisting-link" to="/properties/add">
              <div className="header-nav__newlisting-icon">
                <AddHomeOutlinedIcon fontSize="inherit" />
              </div>
              <p className="header-nav__text">ADD NEW LISTING</p>
            </Link>
          </div>
          <div className="header-nav__login">
            <div className="header-nav__login-icon">
              <AccountCircleOutlinedIcon fontSize="inherit" />
            </div>
            <p className="header-nav__text">LOGIN</p>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Header;
