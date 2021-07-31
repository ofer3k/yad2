import React from 'react'
import checkNo from '../../imgs/check_no.png';
import checkYes from '../../imgs/check_yes.png'
export default function Popup_IconTitle(props) {
    const {class1,isTrue,title1}=props
    let iconImg=isTrue=='true'?checkYes:checkNo
    console.log(props,'props')
    return (
        <p>
            <span className={class1} >{title1}</span>    
            <img src={iconImg}/>
        </p>
    )
}
