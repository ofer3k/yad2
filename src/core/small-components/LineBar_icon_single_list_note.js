import React,{useState} from 'react'
import {BsBell,BsHeart} from 'react-icons/bs'
export default function LineBar_icon_single_list_note(props) {
   let {name,note,head}=props
 const [show, setShow] = useState(false);
 const showDropdown = (e)=>{
    setShow(!show);
}
const hideDropdown = e => {
    setShow(false);
}

    return (
<div onMouseEnter={showDropdown} onMouseLeave={hideDropdown} >
    {name==='a'?<span className={'note_msg__icon'} ><BsBell  /></span>:<span className={'note_msg__icon'}><BsHeart/></span>}
    {show&&
        
       <div class="parent_flex_one_list select_content single_note">
    <p style={{fontSize:'16px'}}>{head}</p>
    <span>{note}</span>
        </div>
    }
</div>
    )
}
