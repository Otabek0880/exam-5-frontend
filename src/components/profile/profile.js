import {useEffect, useState } from "react"
import Header from "./header/header"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./profile.css"
const Profile = ()=>{
     const [user,setUser] = useState([])
     const [firstname,setFirstName] = useState()
     const [secondname,setSecondname] = useState()
     const [phonenumber,setPhonenumber] = useState()
    
     const updateUserInfo = (e)=>{
      e.preventDefault()

      const data = {
        firstname,
        secondname,
        phonenumber
       }
  
      axios.put("http://localhost:4500/userinfo",data,{
        headers:{
          Authorization: localStorage.getItem("user")
        }
      }).then((res) => {
         
        console.log(res);
        if (res.status === 200) {
          toast.success(res.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
          setTimeout(()=>{
            window.location.pathname = "/profile"
          },2000);
        }
      }).catch((err)=>{
        console.log(err.response.data.error);
        toast.error(err.response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
         
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
        
       
     }
    
    const getInfo = async()=>{
        await axios.get("http://localhost:4500/userinfo", {
            headers: {
              Authorization: localStorage.getItem("user")
            }
          }).then((res) => {
            console.log(res.data);
            setUser(res.data.data)
            console.log(user.firstname);
          })
    }
    useEffect(() => {
      getInfo()
    },[])
    return (
        <div>
            <Header/>
          
            <div className="container_profile">
              <ToastContainer/>   
              <h1 className="h1">My profile</h1>
              <div className="inputs">
             <label className="firstname_input">
              <h3>First name</h3>
              <input type="text" placeholder={user.firstname}  onChange={event => setFirstName(event.target.value)}/>
               
             </label>
             <label className="secondname_input">
              <h3>Second name</h3>
              <input type="text" placeholder={user.secondname} onChange={event => setSecondname(event.target.value)}/>
               
             </label>

             <label className="phonenumber_input">
              <h3>Phone number</h3>
              <input type="text" placeholder={user.phonenumber}  onChange={event => setPhonenumber(event.target.value)}/>
               
             </label>
            </div>
            <button className="profile_button" onClick={updateUserInfo}>Save changes</button>
            </div>

            
        </div>
    )
}

export default Profile