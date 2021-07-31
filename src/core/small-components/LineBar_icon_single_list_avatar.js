import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated,signout, signup } from "../../auth";
import {BsPerson} from 'react-icons/bs'
import {MdCompareArrows} from 'react-icons/md'
import {VscHistory} from 'react-icons/vsc'
import {RiDoorLine} from 'react-icons/ri'

export default function LineBar_icon_single_list_avatar(props) {
   let {name,note,head}=props
 const [show, setShow] = useState(false);
 const { user, token } = isAuthenticated();
 const showDropdown = (e)=>{
    setShow(!show);
}
const hideDropdown = e => {
    setShow(false);
}

    return (
<div className={'lineBar_icon__container__avatar'} onMouseEnter={showDropdown} onMouseLeave={hideDropdown} >
        {isAuthenticated()&&
        <p className={'avatar_navBar'}>{user.name.substr(0,2)}</p>}
    {show&&isAuthenticated()&&
       <div style={{marginLeft:'-20px',width:'140px'}}  class="parent_flex_one_list select_content__avatar ">
    <ul >
        <li className={'user_private_dropDown'}>
        <span className={'user_choice'}>
        <span className={'user_choice_title'}>איזור אישי</span> <BsPerson size={'20px'}/> 
        </span>
        </li>
        <li className={'user_private_dropDown'}>
        <span className={'user_choice'}>
        <span className={'user_choice_title'}>השוואת רכבים</span> <MdCompareArrows size={'20px'}/> 
        </span>
        </li>
        <li className={'user_private_dropDown'}>
        <span className={'user_choice'}>
        <span className={'user_choice_title'}>חיפושים אחרונים</span> <VscHistory size={'20px'}/> 
        </span>
        </li>

        <li onClick={() =>signout(() => {  window.location.reload(false)})
                        } className={'user_private_dropDown'}>
        <span className={'user_choice'}>
        <span className={'user_choice_title'}>התנתקות</span> <RiDoorLine size={'20px'}/> 
        </span>
        </li>        
        
        
    </ul>
        </div>
    }
{!isAuthenticated()&&
        <p className={'avatar_navBar'}>{user.name.substr(0,4)}</p>}
    {show&&!isAuthenticated()&&
       <div style={{marginLeft:'-20px',width:'140px'}}  class="parent_flex_one_list select_content__avatar ">
    <ul >
        <li className={'user_private_dropDown'}>
        <span className={'user_choice'}>
        <span className={'user_choice_title'}>איזור אישי</span> <BsPerson size={'20px'}/> 
        </span>
        </li>
        <li className={'user_private_dropDown'}>
        <span className={'user_choice'}>
        <span className={'user_choice_title'}>השוואת רכבים</span> <MdCompareArrows size={'20px'}/> 
        </span>
        </li>
        <li className={'user_private_dropDown'}>
        <span className={'user_choice'}>
        <span className={'user_choice_title'}>חיפושים אחרונים</span> <VscHistory size={'20px'}/> 
        </span>
        </li>

        <li onClick={() =>signout(() => {  window.location.reload(false)})
                        } className={'user_private_dropDown'}>
        <span className={'user_choice'}>
        <span className={'user_choice_title'}>התנתקות</span> <RiDoorLine size={'20px'}/> 
        </span>
        </li>        
        
        
    </ul>
        </div>
    }
    
</div>
    )
}
