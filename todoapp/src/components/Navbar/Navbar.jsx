import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Tooltip } from "antd";

import { MdOutlineLogout, MdOutlineAccountCircle } from "react-icons/md";
import { IoLogoWebComponent } from "react-icons/io5";

import AuthContext from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { handleLogout, user} = useContext(AuthContext);

  return (
    <div className="navbar__swapper">
      <div className="navbar__custom">
        <div className="navbar__logo">
          <Link to={"/"} className="navlink">
            <IoLogoWebComponent className="logo__icon" /> <span>Create by LKN</span>
          </Link>
        </div>
        <div className="navbar__redirect">
          <Tooltip title={"Account"} placement={"bottom"} color={"#2489b5"}>
            <div className="navbar__account d-flex gap-1 justify-content-center align-items-center">
              <Link to={"/login"} className="navlink">
                <MdOutlineAccountCircle  className="account__icon"/> 
              </Link>
              <div className="text-white text__font-family__custom">
                {user.username}
              </div>
            </div>
          </Tooltip>
          <Tooltip title={'Logout'} placement={"bottomRight"} color={'#2489b5'}>
            <div className="navbar__logout" onClick={handleLogout}>
              <div className="navlink">
                <MdOutlineLogout className="logout__icon" />
              </div>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
