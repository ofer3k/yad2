<Form style={{marginTop:'4rem'}} className="mb-3" onSubmit={clickSubmit}>
<div>

<Accordion defaultActiveKey="5">
<Card>
 
<Card.Header>
<span className="numIcon">2</span>
 <Accordion.Toggle className={'accordion_title'} as={Button} variant="link" eventKey="0">
   כתובת הנכס        
 </Accordion.Toggle>
</Card.Header>
<Accordion.Collapse  eventKey="0">
 <Card.Body className={'accordion_body'}>

{/* Our recommendation */}
<Card className={'parent1 adress_badge'} style={{ width: '70vw',dir:'rtl' }}>
<Card.Img className={' div2'} variant="right" src="https://assets.yad2.co.il/personal/images/general/video.png" />
<Card.Body style={{dir:'rtl'}} className={' div1'} >
<Card.Title className={'adress_badge_title'}>המלצה שלנו</Card.Title>
<Card.Text  className='adress_badge_text'>
העלאת וידאו של הנכס תמשוך יותר מתעניינים למודעה שלך
</Card.Text>
</Card.Body>
</Card>
<br/>
<p className={'info_text'}>סימנו עבורך את שדות החובה. שלא נפספס פרט חשוב</p>
<br/>

<div className={'property_type'}>
<p className={"property_type_title"} >*סוג הנכס</p>
<select defaultValue={'null'}  onChange={handleChange("property_type")} className={'property_type_select'} id="property_type" name="property_type">
<option hidden value="null">דירה או אולי פנטהאוז?</option>
<option value="Apartment">דירה</option>
<option value="Garden Apartment">דירת גן</option>
<option value="Private house">בית פרטי/קוטג'</option>
<option value="roof">גג/פנטהאוז</option>
<option value="Plots">מגרשים</option>
<option value="Duplex">דופלקס</option>
<option value="Vacation Apartment">דירת נופש</option>
<option value="Townhouse">דו משפחתי</option>
<option value="basement">מרתף/פרטר</option>
<option value="Triplex">טריפלקס</option>
<option value="Unit">יחידת דיור</option>
<option value="Farm">משק חקלאי/נחלה</option>
<option value="Auxiliary farm">משק עזר</option>
<option value="Assisted living">דיור מוגן</option>
<option value="bulding">בניין מגורים</option>
<option value="loft">סטודיו/לופט</option>
</select>
</div>
{/* property_condition */}
<div className={'property_type'}>
<p className={"property_type_title"} >*מצב הנכס</p>
<select defaultValue={'null'}   onChange={handleChange("property_condition")} className={'property_type_select'} id="property_condition" name="property_condition">
<option  hidden value="null">משופץ? חדש מקבלן?</option>
<option value="New from a contractor">חדש מקבלן (לא גרו בו בכלל)</option>
<option value="New (property up to 5 years old)">חדש (נכס בן עד 5 שנים)</option>
<option value="Renovated">משופץ (שופץ ב 5 השנים האחרונות)</option>
<option value="In saved mode">במצב שמור (במצב טוב,לא שופץ)</option>
<option value="Renovation required">דרוש שיפוץ (זקוק לעבודת שיפוץ)</option>
</select>
</div>
{/* settlement */}
<div className={'property_type'}>
<p className={"property_type_title"} >*ישוב</p>
    <input type="text" onBlur={handleChange("property_address_city")} onClick={handleChange("property_address_city")} onChange={handleChange("property_address_city")} className={"address_city"} id={"search_input"} placeholder="?איפה נמצא הנכס" />
</div>
<div className={'property_type'}>
<p className={"property_type_title"} >*רחוב</p>
    <input type="text" onClick={handleChange("property_address_street")} onChange={handleChange("property_address_street")} className={"address_street"} id={"search_input_street"} placeholder="הכנסת שם הרחוב" />
</div>
<div className={'property_type'}>
<p className={"property_type_title"} >*מס' בית</p>
    <input type="number" onChange={handleChange("property_address_num")} className={"address_house_num"} id={""} placeholder="" />
</div>


<div className={'parent_of_floor'}>
<div className={'floor1'}><p className={"property_type_title_floor"} >*קומה</p>
    <input type="number" onChange={handleChange("property_floor")} className={"address_house_num"} id={""} placeholder="הכנסת מספר קומה" /></div>
<div className={'floor2'}><p className={"property_type_title_floor"} >*סה"כ קומות בבניין</p>
    <input type="number" onChange={handleChange("property_total_floors")} className={"address_house_num"} id={""} placeholder={`הכנסת סה"כ קומות`} /></div>
</div>

<div dir='rtl' className={'inline_box1'}>
<input onChange={handleChange("is_on_pillars")} className={'inline_box'} type='checkbox'/>
<p className={'inline_box'}>על עמודים</p>
</div>
<br/>
<div class="flex-container">
<button  class="flex-items continue_button">המשך</button>
<button class="flex-items prev_button">חזרה</button>
</div>

 </Card.Body>
</Accordion.Collapse>
</Card>
<Card>
<Card.Header>
<span className="numIcon">3</span>
 <Accordion.Toggle className={'accordion_title'} as={Button} variant="link" eventKey="1">
   על הנכס
 </Accordion.Toggle>
</Card.Header>
<Accordion.Collapse eventKey="1">
 <Card.Body>
 <div className={'property_type'}>
<p className={"property_type_title"} >*מספר חדרים</p>
<select defaultValue={'null'}  onChange={handleChange("num_of_rooms")} className={'property_type_select'} id="num_of_rooms" name="num_of_rooms">
<option  hidden value="null">בחירת מספר חדרים</option>
<option value="0">0</option>
<option value="1">1</option>
<option value="1.5">1.5</option>
<option value="2">2</option>
<option value="2.5">2.5</option>
<option value="3">3</option>
<option value="3.5">3.5</option>
<option value="4">4</option>
<option value="4.5">4.5</option>
<option value="5">5</option>
<option value="5.5">5.5</option>
<option value="6">6</option>
<option value="6.5">6.5</option>
<option value="7">7</option>
<option value="7.5">7.5</option>
<option value="8">8</option>
<option value="8.5">8.5</option>
<option value="9">9</option>
<option value="9.5">9.5</option>
<option value="10">10</option>
<option value="10.5">10.5</option>
<option value="11">11</option>
<option value="11.5">11.5</option>
<option value="12">12</option>
</select>
</div>


<div className={'property_type'}>
<p className={"property_type_title"} >חניה</p>
<div className={'radio_group'}>
<p className={'radio_div4'}  onClick={handleChange("num_of_parking")} value='3' variant="secondary">ללא</p>
<p className={'radio_div3'} onClick={handleChange("num_of_parking")} value='2' variant="secondary">1</p>
<p className={'radio_div2'} onClick={handleChange("num_of_parking")} value='1' variant="secondary">2</p>
<p className={'radio_div1'} onClick={handleChange("num_of_parking")} value='0' variant="secondary">3</p>
</div>
</div>

<div className={'property_type'}>
<p className={"property_type_title"} >מרפסת</p>
<div className={'radio_group'}>
<p className={'radio_div4'}  onClick={handleChange("num_of_balcony")} value='3' variant="secondary">ללא</p>
<p className={'radio_div3'} onClick={handleChange("num_of_balcony")} value='2' variant="secondary">1</p>
<p className={'radio_div2'} onClick={handleChange("num_of_balcony")} value='1' variant="secondary">2</p>
<p className={'radio_div1'} onClick={handleChange("num_of_balcony")} value='0' variant="secondary">3</p>
</div>
</div>

<div className={'property_type'}>
<p className={"property_type_title"} >מאפייני הנכס</p>

<div className="parent_prop">
<button id={'air_condition'} className="div1_prop">
<div   onClick={handleRadio("air_condition")} >
<FaRegSnowflake/>
<span className={'prop_text'}>מיזוג</span>
</div>
</button>

<button id={'shelter'} className="div2_prop">
<div onClick={handleRadio("shelter")} >
<FiBox/>
<span className={'prop_text'}>ממ"ד</span>
</div>
</button>

<button id={'garage'} className="div3_prop">
<div onClick={handleRadio("garage")} ><BiBox/>
<span  className={'prop_text'}>מחסן</span> </div>
</button>

<button id={'pandor'} className="div4_prop">
<div onClick={handleRadio("pandor")} ><RiDoorClosedLine/>
<span  className={'prop_text'}>דלתות פנדור</span></div>
</button>

<button id={"furniture"} className="div5_prop" >
<div onClick={handleRadio("furniture")} ><BiCabinet/>
<span className={'prop_text'}>ריהוט</span></div>
</button>

<button id={"handicapped"} className="div6_prop">
<div onClick={handleRadio("handicapped")} ><FaWheelchair/>
<span className={'prop_text'}>גישה לנכים</span></div>
</button>

<button id={"elevator"} className="div7_prop">
<div onClick={handleRadio("elevator")} ><GiElevator/>
<span className={'prop_text'}>מעלית</span></div>
</button>
<button id={"tadiran"} className="div8_prop">
<div onClick={handleRadio("tadiran")} ><FaRegSnowflake/>
<span className={'prop_text'}>מזגן תדיראן</span></div>
</button>
<button id={"unit"} className="div9_prop">
<div onClick={handleRadio("unit")} ><BsHouseDoor/>
<span  className={'prop_text'}>יחידת דיור</span></div>
</button>
<button id={"renovated"} className="div10_prop">
<div onClick={handleRadio("renovated")} ><RiPaintBrushLine/>
<span  className={'prop_text'}>משופצת</span></div>
</button>
<button id={"kosher"} className="div11_prop">
<div onClick={handleRadio("kosher")} ><GiTap/>
<span className={'prop_text'}>מטבח כשר</span></div>
</button>
<button id={"boiler"} className="div12_prop">
<div onClick={handleRadio("boiler")} ><GiSolarPower/>
<span className={'prop_text'}>דוד שמש</span></div>
</button>
<button id={"bars"} className="div13_prop">
<div onClick={handleRadio("bars")} ><AiOutlineTable/>
<span className={'prop_text'}>סורגים</span></div>
</button>
</div>

</div>
<br/>
<p className={'info_text'}>?מה חשוב לך שידעו על הנכס</p>
<br/>

<div className={'property_type'}>
<div className={'flex-container'}>
<p className={"flex-items limit_left"} id={'leftA'} >{maxLetters}/400</p>
<p className={"property_type_title flex-items"} >פרוט הנכס</p>
</div>
<textarea  id={'textA'} className={'text_area'}
placeholder={`זה המקום לתאר את הפרטים הבולטים, למשל, האם נערך שיפוץ במבנה, מה שופץ, כיווני אוויר, האווירה ברחוב וכו`}
               onChange={
                 handleChange2()
                   }
                   onKeyUp={
                     handleChange('description')
                   }
               maxlength={400}
           />
</div>
<div class="flex-container">
<button  class="flex-items continue_button">המשך</button>
<button class="flex-items prev_button">חזרה</button>
</div>



</Card.Body>
</Accordion.Collapse>
</Card>
<Card>
<Card.Header>
<span className="numIcon">4</span>

 <Accordion.Toggle className={'accordion_title'} as={Button} variant="link" eventKey="2">
   תשלומים,תאריכים ועוד
 </Accordion.Toggle>
</Card.Header>
<Accordion.Collapse eventKey="2">
 <Card.Body>
 <div className={'property_type'}>
<p className={"property_type_title"} >מ"ר בנוי</p>
    <input type="number" onChange={handleChange("build_mr")} className={"build_mr"} id={""} placeholder={`כמה מ"ר יש בנכס`} />
</div>
<div className={'property_type'}>
<p className={"property_type_title"} >*גודל במ"ר סך הכל</p>
    <input type="number" onChange={handleChange("build_mr_total")} className={"build_mr"} id={""} placeholder={``} />
</div>

<div className={'property_type'}>
<p className={"property_type_title"} >*מחיר</p>
    <input type="number" onChange={handleChange("price")} className={"build_mr"} id={""} placeholder={`סכום מינימלי 100,000`} />
</div>

<div className={'property_type'}>
<p className={"property_type_title"} >*תאריך כניסה</p>
<div dir='rtl' className={'inline_box1'}>
    <input type="date" onChange={handleChange("entry_date")} className={"date"} id={'entry_date'} />
<input  onChange={date()} className={'inline_box'} type='checkbox'/>
<p className={'inline_box'}>מיידי</p>
</div>
</div>
<div class="flex-container">
<button  class="flex-items continue_button">המשך</button>
<button class="flex-items prev_button">חזרה</button>
</div>

</Card.Body>
</Accordion.Collapse>
</Card>
<Card>
<Card.Header>
<span className="numIcon">5</span>

 <Accordion.Toggle className={'accordion_title'} as={Button} variant="link" eventKey="3">
   תמונות וסרטונים
 </Accordion.Toggle>
</Card.Header>
<Accordion.Collapse eventKey="3">
 <Card.Body>
   {/* msg */}
 <Card className={' adress_badge'} style={{ width: '70vw',dir:'rtl' }}>
<Card.Img className={' '} variant="right" src="" />
<Card.Body style={{dir:'rtl'}} className={''} >
<Card.Title className={'adress_badge_title'}></Card.Title>
<Card.Text  className='adress_badge_text'>
לא לדאוג
</Card.Text>
</Card.Body>
</Card>
{/*  */}
<div className={'info_text_photos'}>
<p style={{marginBottom:'0rem'}}>?ידעת שמודעות עם תמונות ברורות מקבלות פי 10 יותר פניות </p>
<p >לא להסס להעלות לפה תמונות (אפשר עד 10 + וידאו) ולהבליט את הצדדים הטובים ביותר של הנכס</p>
</div>
<br/> 
<div dir={'rtl'} className={'parent3'}>
<div  className={''}>
{
!previewSource &&
(<form >
<div className={'div33'}>
<span className={'input_file_title'}>העלאת סרטון</span>
<input type='file' accept="video/*" name='main_image' onChange={handleFileInputChange} value={fileInput}  />
</div>
</form>)}
{previewSource && <div className={'div33'}>
<span className={'input_file_title'}>הסרטון עלה,אפשר להמשיך בפרסום</span>
</div>}
</div>

<div className={' '}>
{
!previewVideo &&
(<form >
<div className={'div44'}>
<span className={'input_file_title'}>העלאת תמונות</span>
<input type='file' name='main_video' onChange={handleFileInputChange} value={videoInput}  />
</div>
</form>)}
{previewVideo && (
<div  className={'div44'}>
<span className={'input_file_title'}>העלאת תמונות</span>
  <img style={{height:'80%',maxWidth:'100%', }} src={previewVideo}/>
</div>
)}
</div>
</div>
<p style={{width:'80vw',float:'right'}}>
<hr style={{width:'80vw'}} />
</p>
<p style={{width:'80vw',float:'right',textAlign:'right'}}>תמונות שיופיעו בגוף המודעה</p>
{/* body photos */}
<div dir={'rtl'} className={'parent3'}>
<div  className={''}>
{
!previewPic2 &&
(<form >
<div className={'div33'}>
<span className={'input_file_title'}>העלאת תמונות</span>
<input type='file' name='pic2' onChange={handleFileInputChange} value={fileInput}  />
</div>

</form>)}
{previewPic2 && (
<div  className={'div33'}>
<span className={'input_file_title'}>העלאת תמונות</span>
  <img style={{height:'80%',maxWidth:'100%', }} src={previewPic2}/>
</div>
)}
</div>

<div className={' '}>
{
!previewPic1 &&
(<form >
<div className={'div33'}>
<span className={'input_file_title'}>העלאת תמונות</span>
<input type='file' name='pic1' onChange={handleFileInputChange} value={pic1}  />
</div>
</form>)}
{previewPic1 && (
<div  className={'div33'}>
<span className={'input_file_title'}>העלאת תמונות</span>
  <img style={{height:'80%',maxWidth:'100%', }} src={previewPic1}/>
</div>
)}
</div>
</div>
{/* another line */}
<div dir={'rtl'} className={'parent3'}>
<div  className={''}>
{
!previewPic4 &&
(<form >
<div className={'div33'}>
<span className={'input_file_title'}>העלאת תמונות</span>
<input type='file' name='pic4' onChange={handleFileInputChange} value={pic4}  />
</div>
</form>)}
{previewPic4 && (
<div  className={'div33'}>
<span className={'input_file_title'}>העלאת תמונות</span>
  <img style={{height:'80%',maxWidth:'100%', }} src={previewPic4}/>
</div>
)}
</div>

<div className={' '}>
{
!previewPic3 &&
(<form >
<div className={'div33'}>
<span className={'input_file_title'}>העלאת תמונות</span>
<input type='file' name='pic3' onChange={handleFileInputChange} value={pic3}  />
</div>
</form>)}
{previewPic3 && (
<div  className={'div33'}>
<span className={'input_file_title'}>העלאת תמונות</span>
  <img style={{height:'80%',maxWidth:'100%', }} src={previewPic3}/>
</div>
)}
</div>
</div>
<div class="flex-container">
<button  class="flex-items continue_button">המשך</button>
<button class="flex-items prev_button">חזרה</button>
</div>
{/* submit button for cloudinary */}
 </Card.Body>
</Accordion.Collapse>
</Card>
<Card>
<Card.Header>
<span className="numIcon">6</span>

 <Accordion.Toggle className={'accordion_title'} as={Button} variant="link" eventKey="4">
   פרטים ליצירת קשר
 </Accordion.Toggle>
</Card.Header>
<Accordion.Collapse eventKey="4">
 <Card.Body>
   
   {/* שם איש הקשר */}
   <div className={'property_type'}>
<p className={"property_type_title"} >*שם איש הקשר</p>
    <input type="text" onChange={handleChange("contact_name")} className={"address_city"} id={""} placeholder={`${isAuthenticated().user.name}`} defaultValue={`${isAuthenticated().user.name}`} />
</div>
<br/>
<br/>

<div className={'property_type'}>
<p className={"property_type_title"} >*טלפון ראשי</p>
<div class="parent_phone">
<div class="div1_phone"> 
<select  defaultValue={'null'}  onChange={handleChange("contact_number_start")} className={''} id="" name="">
<option  value="050">050</option>
<option  value="051">051</option>
<option  value="052">052</option>
<option  value="053">053</option>
<option  value="054">054</option>
<option  value="055">055</option>
<option  value="058">058</option>
</select>
</div>
<div > 
    <input className={"div2_phone"}  type="number"  placeholder="630-50-81" pattern={"[0-9]{3}-[0-9]{2}-[0-9]{2}"} required onBlur={handleChange("contact_number")}  />
</div>
</div>
</div>
<br/>
<div className={'property_type'}>
<p className={"property_type_title"} >*דוא"ל</p>
    <input type={"email"} onChange={handleChange("mail")} className={"address_city"}   />
</div>
<div class="flex-container">
<button  class="flex-items continue_button">המשך</button>
<button class="flex-items prev_button">חזרה</button>
</div>
 </Card.Body>
</Accordion.Collapse>
</Card>
<Card>
<Card.Header>
<span className="numIcon">7</span>
 <Accordion.Toggle className={'accordion_title'} as={Button} variant="link" eventKey="5">
   סיום פרסום
 </Accordion.Toggle>
</Card.Header>
<Accordion.Collapse eventKey="5">
 <Card.Body>
   <div dir={'rtl'} >
<p style={{textAlign:'right'}}>
זהו, אנחנו בסוף. לנו נשאר לשמור את המודעה שלך, לך נשאר לבחור את מסלול הפרסום.  
</p>
{/*  */}
<p style={{textAlign:'right'}}>
אגב רצינו לספר לך שיש באתר עוד x מודעות דומוות לשלך באיזור y והסביבה שמתחרות על תשומת לב הקוני</p>
{/*  */}
<p style={{textAlign:'right'}}>
ההמלצה שלנו? לשדרג את המודעה. להופיע לפני כולם ולהתקדם להסכם תיק תק   </p>
<hr/>
<h6 style={{textAlign:'right'}}>
באיזה מסלול לפרסם את המודעה? זה הרגע לבלוט מעל כולם  
</h6>
   </div>
   <div class="parent_Route">
<div class="div1_Route">
<p onClick={()=>{setValues({ ...values, 'Route': 'vip' })}}>VIP</p>
</div>
<div class="div2_Route"> 
<p onClick={()=>{setValues({ ...values, 'Route': 'marked' })}}>מודגשת</p>
</div>
<div class="div3_Route">
<p onClick={()=>{setValues({ ...values, 'Route': 'basic' })}}>בסיסי</p>
</div>
</div>
<br/>
<br/>
<br/>
<br/>
<br/>
<button onClick={handleSubmitFile} type='button' >upload files to cloudinary</button>
<button onClick={clickSubmit}  type='button' >העלה טופס ליד 2</button>
       
 </Card.Body>
</Accordion.Collapse>
</Card>
</Accordion>

</div>
       {/* <h4>Post Photo</h4>
       <div className="form-group">
           <label className="btn btn-secondary">
               <input
                   onChange={handleChange("photo")}
                   type="file"
                   name="photo"
                   accept="image/*"
               />
           </label>
       </div> */}
{/*                
       <div className="form-group">
           <label className="text-muted">Name</label>
           <input
               onChange={handleChange("name")}
               type="text"
               className="form-control"
               value={name}
           />
       </div>

       <div className="form-group">
           <label className="text-muted">Description</label>
           <textarea
               onChange={handleChange("description")}
               className="form-control"
               value={description}
           />
       </div> */}
{/* 
       <div className="form-group">
           <label className="text-muted">Price</label>
           <input
               onChange={handleChange("price")}
               type="number"
               className="form-control"
               value={price}
           />
       </div> */}
{/* 
       <div className="form-group">
           <label className="text-muted">Category</label>
           <select
               onChange={handleChange("category")}
               className="form-control"
           >
               <option>Please select</option>
               {categories &&
                   categories.map((c, i) => (
                       <option key={i} value={c._id}>
                           {c.name}
                       </option>
                   ))}
           </select>
       </div>

       <div className="form-group">
           <label className="text-muted">Shipping</label>
           <select
               onChange={handleChange("shipping")}
               className="form-control"
           >
               <option>Please select</option>
               <option value="0">No</option>
               <option value="1">Yes</option>
           </select>
       </div>

       <div className="form-group">
           <label className="text-muted">Quantity</label>
           <input
               onChange={handleChange("quantity")}
               type="number"
               className="form-control"
               value={quantity}
           />
       </div>

       <button className="btn btn-outline-primary">Create Product</button> */}
   </Form>