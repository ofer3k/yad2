import React, { useState,Fragment } from 'react';
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faArrowLeft,faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import Avatar from '@material-ui/core/Avatar';


// import logo from '../../public/icons'
import 'antd/dist/antd.css';
import { Drawer, Button } from 'antd';
import '../navbar.css'

// const isActive = (history, path) => {
//     if (history.location.pathname === path) {
//         return { color: "#ff9900" };
//     } else {
//         return { color: "#ffffff" };
//     }
// };


const NavBar = ({history}) => {
  const [visible, setVisible] = useState(false);

  const [titleName,setTitleName]=useState(isAuthenticated()?isAuthenticated().user.name:'התחבר')

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
    <div style={{zIndex:'1000'}} className={'headline'} >
    {/* <Button  > */}
    <FontAwesomeIcon className={'arrowLeft'} icon={faAngleLeft}  onClick={showDrawer} />
        <img style={{    height: '25px'}} src='//assets.yad2.co.il/yad2site/y2assets/images/header/Yad2_logo_white2.svg'></img>
    <FontAwesomeIcon className={'burgerMenu'} icon={faBars}  onClick={showDrawer} />
    {/* <FontAwesomeIcon className={'burgerMenu'} icon={faBars}  onClick={showDrawer} /> */}

      {/* </Button> */}
    </div>
      
      <Drawer
        // title={titleName}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
          <div className={'navHeader'}>
              {titleName}
              <Avatar className={'avatar'} alt="Ofer Klein" src="/static/images/avatar/1.jpg" />
          </div>

      <ul className="">
      {isAuthenticated() &&  <li className="li_style_center">
                <Link
                    className="addProduct"
                    to="/create/product"
                >
                    פרסום מודעה
                </Link>
            </li>}


      {isAuthenticated() && (
                <li className="li_style_right">
                    <span
                        className=""
                        style={{ cursor: "pointer", color: "" }}
                        onClick={() =>
                            signout(() => {
                                setTitleName('התחבר')
                                // history.push("/");
                            })
                        }
                    >
                        התנתקות
                    </span>
                </li>
            )}
           

            <li className="nav-item">
                <Link
                    className="nav-link"
                    // style={isActive(history, "/")}
                    to="/"
                >
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link"
                    // style={isActive(history, "/")}
                    to="/searchForm"
                >
                    searchForm
                </Link>
            </li>

            <li className="li_style_right">
                <Link
                    className=""
                    // style={isActive(history, "/shop")}
                    to="/shop"
                >
                    חנות
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link"
                    // style={isActive(history, "/cart")}
                    to="/cart"
                >
                    סל קניות{" "}
                    <sup>
                        {/* <small className="cart-badge">{itemTotal()}</small> */}
                    </sup>
                </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        // style={isActive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="li_style_right">
                    <Link
                        className=""
                        // style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        האזור האישי
                    </Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            // style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            Signin
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            // style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            Signup
                        </Link>
                    </li>
                </Fragment>
            )}


        </ul>

      </Drawer>
    </>
  );
};

export default NavBar;
