import { Link } from "react-router-dom"
import "./header.css"

const Header = ()=>{
    return (
        <div className="header_profile">
            <div className="home">
                <Link className="home_link" to="/books"><p>Home</p></Link>
            </div>
            <div className="account">
            <Link className="profile" to="/profile"> <p>1</p> <p>My account</p></Link>
            </div>
            <div className="security">
           <Link className="security2" to="/security"> <p>2</p> <p>Security</p></Link>
            </div>
        </div>
    )
}

export default Header