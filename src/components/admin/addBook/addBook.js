import { useEffect, useState } from "react";
import { AdminHeader } from "../adminheader/adminHeader";
import "./addBook.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export function AddBook() {
    const [categories, setCategories] = useState([])
    const [book_name, setBookname] = useState()
    const [title, setTitle] = useState()
    const [pdf, setPdf] = useState([])
    const [year, setYear] = useState()
    const [author, setAuthor] = useState()
    const [category, setCategory] = useState(categories[0])
    const [pages, setPages] = useState()
    const [description, setDescription] = useState()

    const fetchCategory = async () => {
        await axios.get("http://localhost:4500/categories", {
            headers: {
                Authorization: localStorage.getItem("admin")
            }
        }).then((res) => {
            console.log(res.data);
            setCategories(res.data.data)

        })
    }

   useEffect(()=>{
    fetchCategory()
   },[category])
    const formData = new FormData()
    formData.append('book_name', book_name)
    formData.append('title', title)
    formData.append('book_pdf', pdf)
    formData.append('year', year)
    formData.append('author', author)
    formData.append('category', category)
    formData.append('pages', pages)
    formData.append('description', description)


    const addBook = async () => {


        await axios.post("http://localhost:4500/addbook", formData, {

            headers: {
                Authorization: localStorage.getItem("admin")
            }
        }).then((res) => {
         
            if (res.status === 201) {
                console.log(res);
                toast.success(res.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    window.location.pathname = "/admin/books/addBook"
                }, 2000)
            }
        }).catch((err) => {

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
    return (
        <div>
            <AdminHeader />
            <ToastContainer />
            <h1 className="main_text">Add Book</h1>
            <div className="addbook_container">

                <div className="addbook_card">
                    <input type="text" placeholder="enter book name" onChange={(element) => setBookname(element.target.value)} />
                    <input type="url" placeholder="enter book img url" onChange={(element) => setTitle(element.target.value)} />
                    <input className="pdf_input" type="file" placeholder="enter book pdf" onChange={(element) => setPdf(element.target.files[0])} />
                    <input type="number" placeholder="enter book year" onChange={(element) => setYear(element.target.value)} />
                    <input type="text" placeholder="enter book author" onChange={(element) => setAuthor(element.target.value)} />
                    <select onChange={(e) => setCategory(e.target.value)} value={category}>
                        {categories.map((c) => (
                            <option key={c.category_id} value={c.category_name}>{c.category_name}  </option>

                        ))}
                    </select>
                    <input type="number" placeholder="enter book pages" onChange={(element) => setPages(element.target.value)} />
                    <input type="text" placeholder="enter book description" onChange={(element) => setDescription(element.target.value)} />
                    <button className="addBook_button" onClick={addBook}>AddBook</button>
                </div>

            </div>
        </div>
    )
}