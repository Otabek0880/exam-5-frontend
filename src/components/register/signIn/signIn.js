import React, { useState } from "react";
import "./signin.css";
import SignInimg from "../../../images/SignIn.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const signIn = (e) => {
    e.preventDefault();

    let data2 = {
      email: email,
      password: password

    }

    axios.post("http://localhost:4500/login", data2).then((res) => {
       
        console.log(res.data.data.isAdmin);

        if (res.status === 200) {
         
          toast.success(res.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          if(res.data.data.isAdmin === true){
            localStorage.setItem("admin", res.data.token);
            setTimeout(()=>{
              navigate("/admin/books")
            },2000)
          }else{
            setTimeout(() => {
              localStorage.setItem("user", res.data.token);
              navigate("/books");
            }, 2000);
          }
        }
      })
      .catch((err) => {
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
  };
  return (
    <div className="container">
      <ToastContainer />
      <div className="img-part">
        <img className="signUpimg" src={SignInimg} alt="" />
      </div>
      <div className="signUp-part">
        <h2>Sign in</h2>
        <p>
          Do not you have an account?{" "}
          <Link style={{ textDecoration: "none" }} to="/">
            Sign up
          </Link>
        </p>
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
        <button  onClick={signIn}>Next Step</button>
      </div>
    </div>
  );
};

export default SignIn;
