import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./addCategory.css"

export function AddCateogry(){
    const [category_name,setCategoryname] = useState("")
 
    const data={
        category_name
    }

   async function addCategory(){
      await axios.post("http://localhost:4500/createCategory",data,{
        headers:{
            Authorization: localStorage.getItem("admin")
        }
      }).then((res)=>{
        if(res.status === 201){
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
                window.location.pathname = "/admin/categories/addCategory"
              },2000)
        }
      }).catch((err) => {
        console.log(err);
        toast.error(err.response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });

    }
    return (
        <div style={{backgroundColor:"yellow"}} className="addcategory_container">
            <ToastContainer/>
            <div className="back_button">
                <Link className="back" to="/admin/categories">Back</Link>
            </div>
            <div className="addcategory_part">
               <h3>Add Category</h3>
               <div className="addcateogry_input">
                <input type="text" placeholder="enter category name" onChange={(element)=>setCategoryname(element.target.value)}/>
               </div>
               <button className="category_button" onClick={addCategory}>Add</button>
            </div>
        </div>
    )
}