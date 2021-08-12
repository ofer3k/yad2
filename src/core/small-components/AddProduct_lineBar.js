import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated,signout, signup } from "../../auth";
// 
import { Modal } from 'react-bootstrap';
import signInPic from './../../imgs/signInPic.png'
import signUpPic from './../../imgs/signUpPic.png'
import { GrClose} from 'react-icons/gr';
import { useHistory } from "react-router-dom";
// import logo from '../../public/icons'
import 'antd/dist/antd.css';
import '../../css/navbar.css'
// 
export default function AddProduct_lineBar() {
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
    let history1 = useHistory();
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
          document.getElementById("submit_signIn_button12").className = 'submit_signIn_button_ok'
          document.getElementById("submit_signIn_button12").disabled=false
          console.log(document.getElementById("submit_signIn_button12"))

          }else{
            //   alert('no')
        //   document.getElementById("submit_signIn_button12").disabled = true;
          document.getElementById("submit_signIn_button12").className = 'submit_signIn_button'
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
        //   alert('here')
          setValues({ ...values, error: false, loading: true });
          signin({ email, password }).then(data => {
              if (data.error) {
                //   alert('error')
                  setValues({ ...values, error: data.error, loading: false });
                  setIsError(true)
              } else {
                // alert('no error')
                authenticate(data, () => {
                      setValues({
                          ...values,
                          redirectToReferrer: true
                      });
                  });
                  history1.push("/create/product");
                  window.location.reload(false);
              }
          });
      };
      const clickSubmit1 = event => {
          event.preventDefault();
          setValues({ ...values, error: false });
          signup({name:email1.substr(0,4),email:email1,password:password1 }).then(data => {
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
        <div>
              {isAuthenticated() &&  
                <Link
                    to="/create/product"
                >
                    <button className={'addProduct_lineBar_container'}>
פרסום מודעה חדשה + 
            </button>
                </Link>
        }
             {!isAuthenticated() &&  
                
                    <button onClick={handleShow} className={'addProduct_lineBar_container'}>
פרסום מודעה חדשה + 
            </button>
        }
          
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
    <button disabled={false}  onClick={clickSubmit} id={'submit_signIn_button12'} className={'submit_signIn_button'}>התחבר</button>
</div>
<div class="div5_signIn_modal"><span><input onChange={handleChange("password")}
                    type="password"
                    placeholder={'הקלד סיסמה'}
                    className={ isPasswordValid?'modal_input':'modal_input_error'}/>
    </span>
    {isError&&
<div className={'error_msg_submit'} >אחד הפרטים שהוזן שגוי</div>}

    </div>
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
{/*  */}
<div class="parent_signUp_modal">
<div class="div1_signUp_modal"> 
<img className={'image_fit'} src={signUpPic} />
</div>
<div class="div2_signUp_modal" onClick={handleClose1} style={{textAlign:'left'}}><GrClose/></div>
<div class="div3_signUp_modal" style={{textAlign:'center'}}><span>כבר רשום?</span><span onClick={handleShow} className={'toSignup'}>  להתחברות</span> </div>
<div class="div4_signUp_modal" style={{textAlign:'center',marginTop:'10px'}}><span id={'submit_signIn_button1'} onClick={clickSubmit1} className={isPassword1Valid&&isPassword2Valid&&isMail1Valid&&valuesSignUp.email1.length>6&&valuesSignUp.password1.length>4&&valuesSignUp.password2.length>4?'submit_signIn_button_ok':'submit_signIn_button'}>המשך</span></div>
<div class="div5_signUp_modal">

    
    <input name={'password1'} onChange={handleChange1("password1")}
                    type="password"
                  
                     className={ isPassword1Valid?'modal_input':'modal_input_error'}/>

                     </div>
<div class="div7_signUp_modal">
    <input onChange={handleChange1("email1")}
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
                    {isSignUpError&&<div style={{textAlign:'center'}} className={'error_msg_submit'}>תקלה בהרשמה</div>} </div>
</div>
        </Modal.Body> 
      </Modal>

        </div>
    )
}
