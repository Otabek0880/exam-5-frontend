import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpimg from "../../../images/SignUp.jpg"
import { Link } from "react-router-dom";
import "./signup.css"
import axios from "axios";
const SignUp = () => {
  const [data, setData] = useState([])
  const [firstname, setFirstname] = useState("")
  const [secondname, setSecondname] = useState("")
  const [phonenumber, setPhonenumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const signup = async (e) => {
    e.preventDefault()

    let data2 = {
      firstname: firstname,
      secondname: secondname,
      phonenumber: phonenumber,
      email: email,
      password: password

    }
    axios.post("http://localhost:4500/signup",data2).then((res) => {
      console.log(res.data.token);
     setData(data)
      if (res.status === 201) {
        
         localStorage.setItem("user", res.data.token)
         
        toast.success("Success", {
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
          navigate("/books");
        }, 2000);
      }
    }).catch((err) => {
      console.log(err);
      toast.error(err.response.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });

    
  }
  return (
    <div className="container">
      <ToastContainer />
      <div className="img-part">
        <img className="signUpimg" src={SignUpimg} alt="" />
      </div>
      <div className="signUp-part">
        <h2>Sign up</h2>
        <p>
          Already have an account?{" "}
          <Link style={{ textDecoration: "none" }} to="/login">
            Sign in
          </Link>
        </p>
        <input
          type="text"
          placeholder="First name"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last name"
          onChange={(e) => setSecondname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          onChange={(e) => setPhonenumber(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signup}>Next Step</button>
      </div>
    </div>
  )
}

export default SignUp