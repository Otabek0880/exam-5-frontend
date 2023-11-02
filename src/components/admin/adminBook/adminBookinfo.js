import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./adminBookinfo.css"

export default function AdminBookInfo(){
    const {id} = useParams()
    const [book,setBook] = useState([])
    
    useEffect(()=>{
        fetchBook()
    },[])
    function deleteBook(){
        axios.delete(`http://localhost:4500/book/${id}`,{
            headers:{
                Authorization:localStorage.getItem("admin")
            }
        }).then((res)=>{
            console.log(res);
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
                    window.location.pathname = "/admin/books"
                },2000)
            }
        }).catch((err)=>{
            console.log(err);
            toast.error("Error", {
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
    
    async function fetchBook(){
        await axios.get(`http://localhost:4500/book/${id}`,{
            headers:{
                Authorization:localStorage.getItem("admin")
            }
        }).then((res)=>{
            console.log(res);
            setBook(res.data.data)
        })
    }

    return(
        <div className="bookinfo_container"> 
        <ToastContainer/>
        <Link className="back_link" to="/admin/books">Back</Link>
        <div className="bookcard">
            <img src={book.title}/>
            <p>Book name : <span>{book.book_name}</span></p>
            <p>Author : <span>{book.author}</span></p>
            <p>Janri : <span>{book.category_id}</span></p>
            <p>Year : <span>{book.year}</span></p>
            <p>Pages : <span>{book.pages}</span></p>
            <p>Description : <span>{book.description}</span></p>
        </div>
         <div className="buttons">
         <button className="update_button2"><Link style={{textDecoration:"none",color:"white"}} to={`/update/book/${id}`}>Update</Link></button>
        <button onClick={deleteBook} className="delete_button2">Delete</button>
         </div>
         </div>
    )

}