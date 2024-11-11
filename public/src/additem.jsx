import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddItem() {
  const [name, setRes] = useState("");
  const [itname, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  function validateForm(name, itname, price, ratings, desc) {
    if (name === "") {
      toast.error("Restaurant Name is required.", toastOptions);
      return false;
    } else if (itname === "") {
      toast.error("Dish Name is required.", toastOptions);
      return false;
    } else if (price === 0) {
      toast.error("Price of Dish is required.", toastOptions);
      return false;
    } else if (ratings === 0) {
      toast.error("Ratings is required.", toastOptions);
      return false;
    } else if (desc === "") {
      toast.error("Description for the Dish is required.", toastOptions);
      return false;
    }
    return true;
  }
  const BackButton = () => {
    navigate(-1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(name, itname, price, ratings, desc)) {
      console.log(`${name} ${itname} ${price} ${ratings} ${desc}`);
      axios
        .post(`https://food-ordering-website-2lmb.onrender.com/additem`, {
          ResName: name,
          itname: itname,
          price: price,
          ratings: ratings,
          description: desc,
        })
        .then((result) => {
          console.log(result.data);
          navigate(-1);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2>Add new dish</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              <strong>Restaurant</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Restarant name"
              autoComplete="off"
              id="name"
              name="name"
              className="form-control rounded-0"
              onChange={(e) => setRes(e.target.value)}
            />
            <div className="mb-3">
              <label htmlFor="text">
                <strong>Dish Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Dish name"
                autoComplete="off"
                id="text"
                name="text"
                className="form-control rounded-0"
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="price">
                <strong>Price</strong>
              </label>
              <input
                type="price"
                placeholder="Enter Price"
                autoComplete="off"
                id="price"
                name="price"
                className="form-control rounded-0"
                onChange={(e) => setPrice(e.target.value)}
              />
              <label htmlFor="ratings">
                <strong>Ratings</strong>
              </label>
              <input
                type="number"
                placeholder="Enter ratings"
                id="ratings"
                name="ratings"
                className="form-control rounded-0"
                onChange={(e) => setRatings(e.target.value)}
              />
              <label htmlFor="Description">
                <strong>Description</strong>
              </label>
              <textarea
                placeholder="Enter Description"
                id="Description"
                name="Description"
                className="form-control rounded-0"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-success w-100 rounded-0"
            >
              Create the dish
            </button>
            <p></p>
            <div>
              <button
                onClick={BackButton}
                className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
              >
                close
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
export default AddItem;
