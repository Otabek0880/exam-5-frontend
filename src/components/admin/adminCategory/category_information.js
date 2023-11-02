import { Link } from "react-router-dom";
import "./categoryinformation.css"

export default function CategoryInformation({
    category_id,
    category_name

} ){
    return (
        <div className="category">
            <Link className="category_link" to={`/category/${category_id}`}>
                <p>{category_id}</p>
                <p>{category_name}</p>
            </Link>
        </div>
    )
}