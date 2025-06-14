import Menu from "../inc/Menu";
import {useState} from 'react';

function Home()
{
  let [name,setName] = useState("")
  let [gender,setGender] = useState("")
  let [stream,setStream] = useState("")
  let [address,setAddress] = useState("")
  let [pimg,setPimg] = useState("")
  return(
    <>
    <Menu/>
    <h1>I am Home Page</h1>
    <div className="container">
      <p>Name</p>
      <p><input type="text" onChange={(event)=>{
                setName(event.target.value)
      }}  /></p>
      <p>Gender</p>
      <p><label><input onChange={(event)=>{
                setGender(event.target.value)
      }} type="radio" name="gender" value="Male"/>Male</label></p>
      <p><label><input onChange={(event)=>{
                setGender(event.target.value)
      }} type="radio" name="gender" value="Female"/>Female</label></p>


      <p>Stream</p>

      <p>Address</p>
       <p><textarea onChange={(event)=>{
                setAddress(event.target.value)
      }} ></textarea></p>

      <p><input onClick={()=>{

        console.log(name)
        console.log(gender)
        console.log(stream)
        console.log(address)
        console.log(pimg.name)
        
      }} type="button" value="Add Student"/></p>

    </div>
    </>
  )
}

export default Home;