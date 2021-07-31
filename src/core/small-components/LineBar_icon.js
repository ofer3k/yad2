import React,{useState} from 'react'

export default function LineBar_icon(props) {
   let {name,options}=props
   const optionItems = options.map((option) =>
   <li>{option}</li>
 );

 const [show, setShow] = useState(false);
 const [showHover, setShowHover] = useState(false);
 
 const showHoverFunc = (e)=>{
    setShowHover(!showHover);
}
const hideHoverFunc = e => {
    setShowHover(false)
}
 const showDropdown = (e)=>{
    setShow(!show);
}
const hideDropdown = e => {
    setShow(false);
}
const half = Math.ceil(optionItems.length / 2);    

const firstHalf = optionItems.slice(0, half)
const secondHalf = optionItems.slice(-half)

    return (
<div onMouseEnter={showDropdown} onMouseLeave={hideDropdown} className={'lineBar_icon__container'}>
    {name}

    {show&&
       <div  class="parent_flex select_content">
<ul class="div1_flex">
{firstHalf.map((option) =>
   <li className={'li_LineBar'}>{option}</li>
 )}
    </ul>
<ul class="div2_flex">
{secondHalf.map((option) =>
   <li className={'li_LineBar'}>{option}</li>
 )}</ul>
</div>
    }
</div>
    )
}
