import { Link } from "react-router-dom";
import "./adminBookinformation.css"

export default function AdminBookInformation({

    book_id,
    book_name,
    
}) {
    return (
        <div className="books">
            <Link className="book_link" to={`/info/book/${book_id}`}>
                  
                <p>book id:<span>{book_id}</span></p>
                <p>book name:<span>{book_name}</span></p>
                


            </Link>
        </div>

    );
}