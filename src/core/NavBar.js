import React, { useState,Fragment } from 'react';
import { Link, withRouter } from "react-router-dom";
// import { signout, isAuthenticated } from "../auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faArrowLeft,faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import Avatar from '@material-ui/core/Avatar';
import { Redirect } from "react-router-dom";

import { Modal } from 'react-bootstrap';
import signInPic from './../imgs/signInPic.png'
import signUpPic from './../imgs/signUpPic.png'
import { GrClose} from 'react-icons/gr';
import { signin, authenticate, isAuthenticated,signout, signup } from "../auth";
import { useHistory } from "react-router-dom";


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
  let history1 = useHistory();

  const [visible, setVisible] = useState(false);

  const [titleName,setTitleName]=useState(isAuthenticated()?isAuthenticated().user.name:'התחבר')

  const [show, setShow] = useState(false );
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow1(false)
    setShow(true)
  }
  

  const [show1, setShow1] = useState(false );
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () =>{
    setShow(false)   
    setShow1(true)

    } 

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const [values, setValues] = useState({
    email: "ofer3klein@gmail.com",
    password: "ofer3k1998",
    error: "",
    loading: false,
    redirectToReferrer: false
});
const [valuesSignUp, setValuesSignUp] = useState({
    name: "",
    email1: "",
    password1: "",
    password2: "",
    error: "",
    success: false
});
const { email, password, loading, error, redirectToReferrer } = values;
const { email1, password1,password2, loading1, error1, redirectToReferrer1 } = valuesSignUp;
    const { user } = isAuthenticated();
    
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
        console.log({...values})
    };

    const handleChange1 = name => event => {
        setValuesSignUp({ ...valuesSignUp, error: false, [name]: event.target.value });
        console.log({...valuesSignUp})
    };
 
    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
                history1.push("/shop");
                window.location.reload(false);
            }
        });
    };
    const clickSubmit1 = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({name:email1.substr(0,4),  email:email1,password:password1 }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                });
            }
        });
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
              <div>
              {!isAuthenticated()&&<span onClick={handleShow} >{titleName}</span>}
              {isAuthenticated()&&<span >{titleName}</span>}
              </div>
              
              <Avatar  className={'avatar'} alt="Ofer Klein" src="/static/images/avatar/1.jpg" />
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
               <Button variant="primary" >
        Launch demo modal
      </Button>

      <Modal size={'lg'}  centered={true} show={show} onHide={handleClose}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body  className={'signIn_modal_container'}>
        <div class="parent_signIn_modal">
<div  class="div1_signIn_modal">
    <img className={'image_fit'} src={signInPic} />
    
</div>
<div class="div2_signIn_modal" onClick={handleClose} style={{textAlign:'left'}}><GrClose/></div>
<div class="div3_signIn_modal"><span>לא רשום?</span><span onClick={handleShow1}  className={'toSignup'}>  להרשמה</span> </div>
<div class="div4_signIn_modal signIn_submit">
    <span onClick={clickSubmit} className={'submit_signIn_button'}>התחבר</span>
</div>
<div class="div5_signIn_modal"><input onChange={handleChange("password")}
                    type="password"
                  
                    value={password} className={'modal_input'}/></div>
<div class="div6_signIn_modal"><span className={'modal_input_title'}>סיסמה</span></div>
<div class="div7_signIn_modal">
    <input onChange={handleChange("email")}
                    type="email"
                    value={email} 
                    className={'modal_input'} />
    </div>
<div class="div8_signIn_modal"><span className={'modal_input_title'}>כתובת מייל</span></div>
<div class="div9_signIn_modal "><span className={'modal_title__seconde'}>הזן את הפרטים כדי להתחבר</span></div>
<div class="div10_signIn_modal"><span className={'modal_title'}>התחברות</span></div>
</div>
        </Modal.Body>
        
        
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
{/*  */}
<Modal size={'lg'}  centered={true} show={show1} onHide={handleClose1}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body  className={'signIn_modal_container'}>
        {/* <div class="parent_signIn_modal">
<div  class="div1_signIn_modal">
    <img className={'image_fit'} src={signUpPic} />
</div>
<div class="div2_signIn_modal" onClick={handleClose1} style={{textAlign:'left'}}><GrClose/></div>
<div class="div3_signIn_modal"><span>כבר רשום?</span><span onClick={handleShow} className={'toSignup'}>  להתחברות</span> </div>
<div class="div4_signIn_modal signIn_submit">
    <span onClick={clickSubmit1} className={'submit_signIn_button'}>התחבר</span>
</div>
<div class="div5_signIn_modal"><input onChange={handleChange1("password")}
                    type="password"
                  
                    value={password} className={'modal_input'}/></div>
<div class="div6_signIn_modal"><span className={'modal_input_title'}>סיסמה</span></div>
<div class="div7_signIn_modal">
    <input onChange={handleChange1("email")}
                    type="email"
                    value={email} 
                    className={'modal_input'} />
    </div>
<div class="div8_signIn_modal"><span className={'modal_input_title'}>כתובת מייל</span></div>
<div class="div9_signIn_modal "><span className={'modal_title__seconde'}>הזן את הפרטים כדי להתחבר</span></div>
<div class="div10_signIn_modal"><span  className={'modal_title'}>התחברות</span></div>
</div> */}

{/*  */}
<div class="parent_signUp_modal">
<div class="div1_signUp_modal"> 
<img className={'image_fit'} src={signUpPic} />
</div>
<div class="div2_signUp_modal" onClick={handleClose1} style={{textAlign:'left'}}><GrClose/></div>
<div class="div3_signUp_modal" style={{textAlign:'center'}}><span>כבר רשום?</span><span onClick={handleShow} className={'toSignup'}>  להתחברות</span> </div>
<div class="div4_signUp_modal" style={{textAlign:'center'}}><span onClick={clickSubmit1} className={'submit_signIn_button'}>המשך</span></div>
<div class="div5_signUp_modal"><input onChange={handleChange1("password1")}
                    type="password"
                  
                     className={'modal_input'}/></div>
<div class="div7_signUp_modal"><input onChange={handleChange1("email1")}
                    type="email"
                     
                    className={'modal_input'} /></div>
<div class="div6_signUp_modal"><span className={'modal_input_title'}>סיסמה</span></div>
<div class="div8_signUp_modal"><span className={'modal_input_title'}>כתובת מייל*</span></div>
<div class="div9_signUp_modal"><span className={'modal_title__seconde'}>הזן את הפרטים כדי להרשם</span></div>
<div class="div10_signUp_modal"><span className={'modal_title'}>הרשמה</span></div>
<div class="div11_signUp_modal"><span className={'modal_title__third'}>שדות המסומנים ב* הם שדות חובה</span></div>
<div class="div12_signUp_modal"><input onChange={handleChange1("password2")}
                    type="password"
                  
                     className={'modal_input'}/></div>
</div>
        </Modal.Body>
        
        
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
{/*  */}
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
