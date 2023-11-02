import {useEffect, useState } from "react"
import Header from "./header"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./security.css"
const AdminSecurity = ()=>{
     const [user,setUser] = useState([])
     const [password,setPassword] = useState()
    
     const updateUserPassword = (e)=>{
      e.preventDefault()
      const data = {
        password
      }

  
      axios.put("http://localhost:4500/password",data,{
        headers:{
          Authorization: localStorage.getItem("admin")
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
          
          ;
          setTimeout(()=>{
            window.location.pathname = "/admin/security"
          },2000)
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
              Authorization: localStorage.getItem("admin")
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
          
            <div className="container_security">
              <ToastContainer/>   
              <h1 className="h1">Change Or Recover Your Password:</h1>
              <div className="inputs">
             <label className="email_input">
              <h3>Email</h3>
              <input type="text" value={user.email} />
               
             </label>
             <label className="password_input">
              <h3>Password</h3>
              <input type="password" value="***********"/>
               
             </label>
             <label className="newpassword_input">
              <h3>New password</h3>
              <input type="password" placeholder="enter password" onChange={event=>setPassword(event.target.value)} />
               
             </label>

            </div>
            <button className="security_button" onClick={updateUserPassword}>Save changes</button>
            </div>

            
        </div>
    )
}

export default AdminSecurity