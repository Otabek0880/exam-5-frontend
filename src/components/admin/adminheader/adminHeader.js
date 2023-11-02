import { Link } from "react-router-dom"
import "./adminHeader.css"
import usericon from "../../../images/usericon2.png"
export function AdminHeader() {
    return (
        <div className="adminheader">
            <div className="admin">
                <h1>Admin</h1>
            </div>
            <div className="admin_links">
                <Link className="signup" to="/" onClick={()=>{localStorage.clear()}}>Sign up</Link>
                <Link className="login" to="/login" onClick={()=>{localStorage.clear()}} >Log out</Link>
                <Link className="link_1" style={{ textDecoration: "none" }} to="/admin/books">Books</Link>
                <Link className="link_2" style={{ textDecoration: "none" }} to="/admin/categories">Categories</Link>
                <Link style={{ textDecoration: "none" }} className="profile" to="/admin/profile"><img className="usericon" src={usericon} /> <p className="profile2">my profile</p></Link>
            </div>
        </div>
    )
}