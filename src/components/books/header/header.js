import "./header.css"
import usericon from "../../../images/usericon2.png"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="header">
            <div className="header-left">
                <Link style={{textDecoration:"none"}} to="/books">   <h2>BADIIYAT</h2></Link>

            </div>
            <div className="header-right">
                <div className="links">
                    <Link className="signup" to="/" onClick={()=>{localStorage.clear()}}>Sign up</Link>
                    <Link className="login" to="/login" onClick={()=>{localStorage.clear()}}>Log out</Link>
                </div>
                <div className="profile">
                    <Link className="profile" to="/profile"><img className="usericon" src={usericon} /> <p className="profile2">my profile</p></Link>
                </div>
            </div>
        </div>
    )
}

export default Header