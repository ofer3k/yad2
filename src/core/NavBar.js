import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faAngleLeft,faHome,faCar, faCouch, faSuitcase, faSearch, faPaw, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import Avatar from '@material-ui/core/Avatar';
import { Redirect } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import signInPic from './../imgs/signInPic.png'
import signUpPic from './../imgs/signUpPic.png'
import { BsBell,BsHeart,BsSearch} from 'react-icons/bs';
import { GrClose} from 'react-icons/gr';
import { RiArrowLeftRightFill} from 'react-icons/ri';
import { signin, authenticate, isAuthenticated,signout, signup } from "../auth";
import { useHistory } from "react-router-dom";
import tree from './../imgs/palm_tree.png'

import 'antd/dist/antd.css';
import { Drawer} from 'antd';
import './../css/navbar.css'


const NavBar = ({history}) => {
  let history1 = useHistory();

  const [visible, setVisible] = useState(false);

  const [titleName,setTitleName]=useState(isAuthenticated()?isAuthenticated().user.name:'התחבר')
  const [isMailValid, setIsMailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isMail1Valid, setIsMail1Valid] = useState(true);
  const [isPassword1Valid, setIsPassword1Valid] = useState(true);
  const [isPassword2Valid, setIsPassword2Valid] = useState(true);
  const [isError,setIsError]=useState(false)
  const [isSignUpError,setIsSignUpError]=useState(false)

  
  const [show, setShow] = useState(false );
  const [show1, setShow1] = useState(false );
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow1(false)
    setShow(true)
  }
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
    email: "",
    password: "",
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
        if(name==='email'){
            let re = /\S+@\S+\.\S+/;
            if(event.target.value.length==0||!re.test(event.target.value))
            setIsMailValid(false)
            else{
                setIsMailValid(true)
            }
        }
        if(name==='password')
        {
            if(event.target.value.length==0)
            setIsPasswordValid(false)
            else{
                setIsPasswordValid(true)
            }
        }
        if(isMailValid&&isPasswordValid&&values.email.length>4&&values.password.length>4)
        {
            // alert('yes')
        document.getElementById("submit_signIn_button").disabled = false;
        document.getElementById("submit_signIn_button").className = 'submit_signIn_button_ok'
        }else{
        document.getElementById("submit_signIn_button").disabled = true;
        document.getElementById("submit_signIn_button").className = 'submit_signIn_button'
        }
        console.log({...values})
    };

    const handleChange1 = name => event => {
        setValuesSignUp({ ...valuesSignUp, error: false, [name]: event.target.value });
        
        if(name==='email1'){
            let re = /\S+@\S+\.\S+/;
            if(event.target.value.length==0||!re.test(event.target.value))
            setIsMail1Valid(false)
            else{
                setIsMail1Valid(true)
            }
        }
        if(name==='password1')
        {
            if(event.target.value.length<4)
            setIsPassword1Valid(false)
            else{
                setIsPassword1Valid(true)
            }
        }
        if(name==='password2')
        {
            if(event.target.value!=valuesSignUp.password1)
            setIsPassword2Valid(false)
            else{
                setIsPassword2Valid(true)
            }
        }
        // if(isMail1Valid&&   &&valuesSignUp.email1.length>4&&valuesSignUp.password1.length>4&&valuesSignUp.password2==valuesSignUp.password1)
        // {
            
        // document.getElementById("submit_signIn_button1").disabled = false;
        // document.getElementById("submit_signIn_button1").className = 'submit_signIn_button_ok'
        // }else{
        // document.getElementById("submit_signIn_button1").disabled = true;
        // document.getElementById("submit_signIn_button1").className = 'submit_signIn_button'
        // }
        console.log({...valuesSignUp})
    };
 
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
                setIsError(true)
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
                setIsSignUpError(true)
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
    <FontAwesomeIcon className={'arrowLeft'} icon={faAngleLeft} onClick={()=>window.history.back()}   />
        <Link to="/">
        <img style={{    height: '25px'}} src='//assets.yad2.co.il/yad2site/y2assets/images/header/Yad2_logo_white2.svg'></img>

        </Link>
    <FontAwesomeIcon className={'burgerMenu'} icon={faBars} onClick={showDrawer}  />

    </div>
      
      <Drawer
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        width={'60vw'}
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
                        className={"signOut"}
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
               
      <Modal size={'lg'}  centered={true} show={show} onHide={handleClose}>
        <Modal.Body  className={'signIn_modal_container'}>
        <div class="parent_signIn_modal">
<div  class="div1_signIn_modal">
    <img className={'image_fit'} src={signInPic} />
    
</div>
<div class="div2_signIn_modal" onClick={handleClose} style={{textAlign:'left'}}><GrClose/></div>
<div class="div3_signIn_modal"><span>לא רשום?</span><span onClick={handleShow1}  className={'toSignup'}>  להרשמה</span> </div>
<div class="div4_signIn_modal signIn_submit">
    <button  onClick={clickSubmit} id={'submit_signIn_button'} className={'submit_signIn_button'}>התחבר</button>
</div>
<div class="div5_signIn_modal"><span><input onChange={handleChange("password")}
                    type="password"
                    placeholder={'הקלד סיסמה'}
                    className={ isPasswordValid?'modal_input':'modal_input_error'}/>
    </span>
    {isError&&
<div className={'error_msg_submit'} >אחד הפרטים שהוזן שגוי</div>}</div>
<div class="div6_signIn_modal"><span className={'modal_input_title'}>סיסמה</span></div>
<div class="div7_signIn_modal">
    <input onChange={handleChange("email")}
                    type="email"
                    placeholder={'your@mail.com'} 
                    className={ isMailValid?'modal_input':'modal_input_error'} />
    <br/>{!isMailValid&&values.email.length>0&&<span className={'error_input'}>מבנה האימייל שהוזן אינו תקין</span>}
    {!isMailValid&&values.email.length<1&& <span className={'error_input'}>שדה חובה</span>}
    </div>
<div class="div8_signIn_modal"><span className={'modal_input_title'}>כתובת מייל</span></div>
<div class="div9_signIn_modal "><span className={'modal_title__seconde'}>הזן את הפרטים כדי להתחבר</span></div>
<div class="div10_signIn_modal"><span className={'modal_title'}>התחברות</span></div>
</div>
        </Modal.Body>
        
      </Modal>
{/*  */}
<Modal size={'lg'}  centered={true} show={show1} onHide={handleClose1}>
        <Modal.Body  className={'signIn_modal_container'}>

<div class="parent_signUp_modal">
<div class="div1_signUp_modal"> 
<img className={'image_fit'} src={signUpPic} />
</div>
<div class="div2_signUp_modal" onClick={handleClose1} style={{textAlign:'left'}}><GrClose/></div>
<div class="div3_signUp_modal" style={{textAlign:'center'}}><span>כבר רשום?</span><span onClick={handleShow} className={'toSignup'}>  להתחברות</span> </div>
<div class="div4_signUp_modal" style={{textAlign:'center'}}><span id={'submit_signIn_button1'} onClick={clickSubmit1} className={isPassword1Valid&&isPassword2Valid&&isMail1Valid&&valuesSignUp.email1.length>6&&valuesSignUp.password1.length>4&&valuesSignUp.password2.length>4?'submit_signIn_button_ok':'submit_signIn_button'}>המשך</span></div>
<div class="div5_signUp_modal"><input name={'password1'} onChange={handleChange1("password1")}
                    type="password"
                  
                     className={ isPassword1Valid?'modal_input':'modal_input_error'}/>
              
                     </div>
<div class="div7_signUp_modal"><input onChange={handleChange1("email1")}
                    type="email"
                     
                    className={ isMail1Valid?'modal_input':'modal_input_error'} />
                    </div>
<div class="div6_signUp_modal"><span className={'modal_input_title'}>סיסמה</span></div>
<div class="div8_signUp_modal"><span className={'modal_input_title'}>כתובת מייל*</span></div>
<div class="div9_signUp_modal"><span className={'modal_title__seconde'}>הזן את הפרטים כדי להרשם</span></div>
<div class="div10_signUp_modal"><span className={'modal_title'}>הרשמה</span></div>
<div class="div11_signUp_modal"><span className={'modal_title__third'}>שדות המסומנים ב* הם שדות חובה</span></div>
<div class="div12_signUp_modal" style={{marginTop:'10px'}}><input onChange={handleChange1("password2")}
                    type="password"
                  
                    className={ isPassword2Valid?'modal_input':'modal_input_error'}/>
                    {isSignUpError&&<div style={{textAlign:'center'}} className={'error_msg_submit'}>תקלה בהרשמה</div>}
                    
                    </div>
</div>
        </Modal.Body>
        
              </Modal>
<div class="parent_navBar_icon">
<div class="div1_navBar_icon navBar_icon"><BsBell/></div>
<div class="div2_navBar_icon navBar_icon"><BsHeart/></div>
<div class="div3_navBar_icon navBar_icon"><BsSearch/></div>
<div class="div4_navBar_icon navBar_icon"><RiArrowLeftRightFill/></div>
<div class="div5_navBar_icon navBar_icon_title">התראות שלי</div>
<div class="div6_navBar_icon navBar_icon_title">מודעות שאהבתי</div>
<div class="div7_navBar_icon navBar_icon_title">חיפושים אחרונים</div>
<div class="div8_navBar_icon navBar_icon_title">השוואת רכבים</div>
</div>
<hr/>
<div class="parent_navBar_quick_search">
<div class="div1_navBar_quick_search"><span className={'navBar_quick_search_title'}>חיפוש מהיר באתר</span></div>
<div class="div2_navBar_quick_search"><FontAwesomeIcon icon={faHome} /></div>
<div class="div3_navBar_quick_search navBar_quick_search_title_secondary">נדל"ן</div>
<div class="div4_navBar_quick_search"><FontAwesomeIcon icon={faCar} /></div>
<div class="div5_navBar_quick_search navBar_quick_search_title_secondary">רכב</div>
<div class="div6_navBar_quick_search"><FontAwesomeIcon icon={faCouch} /></div>
<div class="div7_navBar_quick_search navBar_quick_search_title_secondary">יד שניה</div>
<div class="div8_navBar_quick_search"><FontAwesomeIcon icon={faSuitcase} /></div>
<div class="div9_navBar_quick_search navBar_quick_search_title_secondary">עסקים למכירה</div>
<div class="div10_navBar_quick_search"><FontAwesomeIcon icon={faSearch} /></div>
<div class="div11_navBar_quick_search navBar_quick_search_title_secondary">דרושים IL</div>
<div class="div12_navBar_quick_search"><FontAwesomeIcon icon={faPaw} /></div>
<div class="div13_navBar_quick_search navBar_quick_search_title_secondary">חיות מחמד</div>
<div class="div14_navBar_quick_search"><img style={{height:'14px',width:'14px'}} src={tree} /></div>
<div class="div15_navBar_quick_search navBar_quick_search_title_secondary">תיירות ונופש</div>
<div class="div16_navBar_quick_search"><FontAwesomeIcon icon={faGraduationCap} /></div>
<div class="div17_navBar_quick_search navBar_quick_search_title_secondary">לימודים</div>
</div>

        </ul>

      </Drawer>
    </>
  );
};

export default NavBar;
