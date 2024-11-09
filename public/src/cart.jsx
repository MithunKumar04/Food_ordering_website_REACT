import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartItem = () => {
  const { name } = useParams();
  const [data, setData] = useState([]);
  const [sum, setSum] = useState(0);
  const [dishNames, setDishNames] = useState([]);
  const [custName, setCustName] = useState(""); // To store Customer Name
  const [restName, setRestName] = useState(""); // To store Restaurant Name
  const [time, setTime] = useState(""); // To store Time
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/${name}/cart`)
      .then((response) => {
        const filtered = response.data.filter((item) => item.CustName === name);
        setData(filtered);

        // Calculate the initial sum
        const initialSum = filtered.reduce((acc, item) => acc + item.price, 0);
        setSum(initialSum);

        const dishes = filtered.map((item) => item.Dish);
        setDishNames(dishes);

        if (filtered.length > 0) {
          setCustName(filtered[0].CustName);
          setRestName(filtered[0].RestName);
        }
      })
      .catch((error) => console.error(error));
  }, [name]);

  const delItem = (id) => {
    axios
      .delete(`http://localhost:3000/user/${name}/cart`, { data: { id } })
      .then((response) => {
        console.log(response);
        // Optionally, refresh data or update state here
      })
      .catch((error) => console.error(error));
  };

  const confOrder = () => {
    // POST request to confirm the order
    if (time === "") {
      toast.error("Order Time is required.", toastOptions);
      return false;
    }

    axios
      .post(`http://localhost:3000/user/${name}/cart`, {
        CustName: custName,
        RestName: restName,
        Dishes: dishNames,
        Total: sum,
        Time: time || "00:00", // The time is already in HH:mm format
      })
      .then((response) => {
        console.log(response);
        toast.success("Order SuccesFull.", toastOptions);
        // You can show a success message here if needed
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
        <div className="mx-5">
        <h1 className="text-4xl font-extrabold text-black mb-4">Detail Page for {name}</h1>
        <h2 className="text-2xl text-black mb-8">Here are the items in your cart:</h2>
        </div>
        <div className="flex flex-wrap justify-center w-full max-w-5xl">
          {data.map((Rest) => (
            <div
              key={Rest.id}
              className="mx-5 bg-white rounded-lg shadow-lg p-5 transition-transform transform hover:scale-105"            >
              <p className="text-gray-800"><strong>Rest Name:</strong> {Rest.RestName}</p>
              <p className="text-gray-800"><strong>Customer Name:</strong> Rs. {Rest.CustName}</p>
              <p className="text-gray-800"><strong>Dish Name:</strong> {Rest.Dish}</p>
              <button 
                onClick={() => delItem(Rest.id)} 
                className="mt-2 bg-red-500 text-Black py-1 px-3 rounded hover:bg-red-600 transition duration-200"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <br />
        <div className="flex flex-col items-center">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mb-4 border border-gray-300 rounded p-2"
          />
          <label className="text-lg text-black mb-2">Total cost: Rs. {sum}</label>
          <button 
            onClick={confOrder} 
            className="bg-green-500 text-Black py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          >
            Confirm Order
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
  
};

export default CartItem;
