import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Header from "../header/header";
import "./bookInfo.css"

export default function FullInfo() {
  const { id } = useParams();
  const [book, setBook] = useState([])


  useEffect(() => {
    fetchdata()
  }, [])



  const fetchdata = async () => {
    await axios.get(`http://localhost:4500/book/${id}`, {
      headers: {
        Authorization: localStorage.getItem("user")
      }
    }).then((res) => {
      console.log(res);
      setBook(res.data.data)

    })
  }
  console.log(book);

  return (
    <div style={{ backgroundColor: "black" }}>
      <Header />
      <div className="bookinfo">

        <div key={book.book_id} className="singlebook">
          <div className="img_part">
            <img src={book.title} />
          </div>
          <div className="text_part">
            <h2 className="book_name">{book.book_name}</h2>
            <p className="book_author">{book.author}</p>
            <p className="book_pages"><span>Sahifalar soni:</span>{book.pages}</p>
            <p className="book_year"><span>Chop etilgan:</span>{book.year}</p>
            <p className="book_category"><span>Janri: </span>{book.category_id}</p>
            <p className="book_description"><span>Description: </span>{book.description}</p>
            <button className="download_button"> <Link style={{textDecoration:"none"}} target="_blank" to={`http://localhost:4500/${book.book_pdf}`}> SEE BOOK and DOWNLOAD </Link></button>

          </div>

        </div>


      </div>
    </div>
  )
}