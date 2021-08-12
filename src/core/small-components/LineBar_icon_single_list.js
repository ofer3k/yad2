import React,{useState} from 'react'

export default function LineBar_icon_single_list(props) {
   let {name,options}=props
 

 const [show, setShow] = useState(false);
 
 const showDropdown = (e)=>{
    setShow(!show);
}
const hideDropdown = e => {
    setShow(false);
}
    return (
<div onMouseEnter={showDropdown} onMouseLeave={hideDropdown} className={'lineBar_icon__container'}>
    {name}

    {show&&
       <div class="parent_flex_one_list select_content">
<ul>
{options.map((option) =>
   <li style={{padding:'2px'}} className={'li_LineBar'}>{option}</li>
 )}
</ul>
</div>
    }
</div>
    )
}
