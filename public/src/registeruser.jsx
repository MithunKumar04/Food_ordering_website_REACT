import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function RegisterU() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toastOptions = {position: "bottom-right",autoClose: 8000,pauseOnHover: true,draggable: true,theme: "dark",};


  function validateForm(name,email, password)
  {
    if (name === "") {toast.error("Name is required.", toastOptions);return false;}
  else if (email === "") {toast.error("Email is required.", toastOptions);return false;}
  else if (password === "") {toast.error("Password is required.", toastOptions);return false;}
  return true;
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateForm(name,email,password)){
    console.log(`${name}${email}${password}`);
    axios
      .post("http://localhost:3000/registeruser", { name, email, password })
      .then((result) => {
        if(result.data==="User Aleady Exist")
        {
            toast.error("User already Exist.", toastOptions);
        }
        else{
            console.log(result);
            navigate("/loginuser");
        }
      })
      .catch((error) => console.error(error));
    }
  };


  return (
    <>
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>User Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name </strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              id="name"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            Register
          </button>
          <p>Already have an account?</p>
          <Link
            to="/loginuser"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Restaurant?
          </Link>
        </form>
      </div>
    </div>
    <ToastContainer />
    </>
  );
}
export default RegisterU;
