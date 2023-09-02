import "./Header.scss";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import { AddHomeOutlined } from "@mui/icons-material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

function Header() {
  // console.log(typeof AccountCircleOutlinedIcon);
  return (
    <>
      <header className="header">
        <nav className="header-nav">
          <div className="header-nav__home">
            <Link className="header-nav__home-link" to="/properties">
              {/* <div className="header-nav__home-icon">
                <HomeOutlinedIcon fontSize="inherit" />
              </div> */}
              escape<br></br>room
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
