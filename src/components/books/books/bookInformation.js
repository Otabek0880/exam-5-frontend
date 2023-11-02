import React from "react";
import { Link } from "react-router-dom";
import "./bookInformation.css";
export default function Information({

    book_id,
    book_name,
    title,
    author
}) {
    return (
        <div className="book">
            <Link className="book_link" to={`/book/${book_id}`}>
                  
                <img src={title} alt="pic" className="images" />
                <p>{book_name}</p>
                <p>{author}</p>


            </Link>
        </div>

    );
}