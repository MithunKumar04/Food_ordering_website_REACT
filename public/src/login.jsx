import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function LoginR() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toastOptions = {position: "bottom-right",autoClose: 8000,pauseOnHover: true,draggable: true,theme: "dark",};

  function validateForm(email, password)
  {
  if (email === "") {toast.error("Email and Password is required.", toastOptions);return false;}
  else if (password === "") {toast.error("Email and Password is required.", toastOptions);return false;}
  return true;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateForm(email,password))
    {console.log(`${email}${password}`);
    axios
      .post("http://localhost:3000/login",{ email, password })
      .then((result) => {
        console.log(result.data);
        if(result.data === "Incorrect password")
        {
            toast.error("The password is incorrect.", toastOptions);
        }
        else if(result.data==='User doesnot exist')
        {
            toast.error("User does not exist.", toastOptions)
        }
        else
        {
            navigate(`/homeres/${result.data.name}`)
        }
      })
      .catch((error) => console.error(error));
    }
  };

  return (
    <>
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Restaurant Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              id="email"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              id="password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
          <p>New to the website?</p>
          <Link
            to="/register"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Register
          </Link>
          <Link
            to="/registeruser"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            User?
          </Link>
        </form>
      </div>
    </div>
    <ToastContainer />
    </>
  );
}
export default LoginR;