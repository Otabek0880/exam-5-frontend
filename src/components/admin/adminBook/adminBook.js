import { Link } from "react-router-dom";
import { AdminHeader } from "../adminheader/adminHeader";
import "./adminBook.css"
import { useEffect, useState } from "react";
import axios from "axios";
import AdminBookInformation from "./adminBookinformation";

export function AdminBookPanel() {
  const [books, setBooks] = useState([])
  const [searchQuery,setSearchQuery] = useState('')

  const filteredBooks = books.filter((item) =>
    item.book_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    await axios.get("http://localhost:4500/books", {
      headers: {
        Authorization: localStorage.getItem("admin")
      }
    }).then((res) => {
      console.log(res.data);
      setBooks(res.data)
    })
  }

  return (
    <div className="container">
      <AdminHeader />
      <input className="booksearch" type="text" placeholder="enter book name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
      <div  className="book_container">

       

        <div className="books_list">
          {
            filteredBooks.map((item) => {
              const { book_id, book_name } = item;
              return (
                <div className="books" key={book_id}>
                  <AdminBookInformation
                    book_id={book_id}
                    book_name={book_name}
                  />

                </div>
              )
            })
          }
          <div className="addBook">   <Link className="addBookLink" to="/admin/books/addBook">Add Book</Link></div>
        </div>

      </div>
    </div>
  )
}