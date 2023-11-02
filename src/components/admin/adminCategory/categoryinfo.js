import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./categoryinfo.css"



export function CategoryInfo(){
   const {id} = useParams()
   const [category,setCateogry] = useState([])
   const [category_name,setCategoryname] = useState('')
   const data = {
    category_name:category_name
   }

    async function deleteCategory(){
        await axios.delete(`http://localhost:4500/deleteCategory/${id}`,{
            headers:{
                Authorization:localStorage.getItem("admin")
            }
        }).then((res)=>{
            if(res.status === 200){
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
                    window.location.pathname = "/admin/categories"
                  },2000)
            }
        }).catch((err)=>{
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

   async function updateCategory(e){
    e.preventDefault()
    await axios.put(`http://localhost:4500/updateCategory/${id}`,data,{
        headers:{
            Authorization:localStorage.getItem("admin")
        }
    }).then((res)=>{
        if(res.status === 200){
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
                window.location.pathname=`/category/${id}`
              },2000);
        }

    }).catch((err)=>{
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
   async function categoryInfo(){
    await axios.get(`http://localhost:4500/category/${id}`,{
        headers: {
            Authorization: localStorage.getItem("admin")
          }
    }).then((res)=>{
        setCateogry(res.data.data)
    })
   }
   useEffect(()=>{
    categoryInfo()
   },[])
   return (
    <div className="category_container">
        <ToastContainer/>
        <Link className="back_button" to="/admin/categories">Back</Link>
         
        <div className="category_input">
            <h2 style={{textAlign:"center"}}>Category</h2>
            <div className="categorytext_input">
            <label>
                <h3 style={{textAlign:"center"}}>Category name:</h3>
                <input className="categoryname_input" type="text" placeholder={category.category_name} onChange={(e)=>setCategoryname(e.target.value)}/>
            </label>
           
            </div>
            <button onClick={updateCategory} className="update_button">Save changes</button>
            <button onClick={deleteCategory} className="delete_button">Delete</button>
        </div>
    </div>
   )
}