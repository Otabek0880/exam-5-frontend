import axios from "axios";
import "./books.css"
import { useEffect, useState } from "react";
import Header from "../header/header";
import Information from "./bookInformation";
const SeeBooks = () => {
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('2')
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = books.filter((item) =>
    item.book_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(filteredBooks);

  const fetchCategory = async () => {
    await axios.get("http://localhost:4500/categories", {
      headers: {
        Authorization: localStorage.getItem("user")
      }
    }).then((res) => {
      setCategories(res.data.data)

    })
  }



  const handleChangeCategory = (e) => {
    setCategory(e.target.value)

  }
  console.log(category);

  const fetchdata = async () => {

    await axios.get(`http://localhost:4500/category/${category}`, {
      headers: {
        Authorization: localStorage.getItem("user")
      }
    }).then((res) => {
      setBooks(res.data.books)
      console.log(books);
    })
  }

  useEffect(() => {
    fetchdata()
    fetchCategory()
  }, [category])


  return (
    <div style={{ backgroundColor: "black" }}>

      <Header />
      <div className="container_books">
        <div className="bookmenu_img"></div>
        <div className="search_part">
          <div className="search">
            <input type="text" placeholder="" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

            <button className="search_button">Search</button>
            <select onChange={(e) => handleChangeCategory(e)} value={category}>
              {categories.map((c) => (
                <option key={c.category_id} value={c.category_id}>{c.category_name}  </option>

              ))}
            </select>
          </div>
        </div>

        <div className="books_list">
          {
            filteredBooks.map((item) => {
              const { book_id, title, book_name, author } = item;

              return (
                <div className="book" key={book_id}>
                  <Information
                    book_id={book_id}
                    title={title}
                    book_name={book_name}
                    author={author}
                  />

                </div>
              )
            })}

        </div>
      </div>
    </div>
  )
}

export default SeeBooks