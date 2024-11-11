import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartItem = () => {
  const { name } = useParams();
  const [data, setData] = useState([]);
  const [val, setVal] = useState([]);
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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/${name}/order`)
      .then((response) => {
        let filtered = [];
        const value = response.data;
        for (let i = 0; i < value.length; i++) {
          if (value[i].CustName === name) filtered = [...filtered, value[i]];
        }

        setVal(filtered);
      })
      .catch((error) => console.error(error));
  }, [name]);

  const delItem = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:3000/user/${name}/cart/${id}`)
      .then((response) => {
        console.log(response);
        // Optionally, refresh data or update state here
      })
      .catch((error) => console.error(error));
  };

  const confOrder = () => {
    if (!dishNames || dishNames.length == 0) {
      toast.error("No Item in the cart", toastOptions);
      return false;
    }
    // POST request to confirm the order
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    // Define open and close hours (8 AM to 10 PM)
    const openHour = 8;
    const closeHour = 22;

    // Check if time is empty
    if (time === "") {
      toast.error("Order Time is required.", toastOptions);
      return false;
    }

    // Parse the order time (assuming `time` is in HH:mm format)
    const [orderHour, orderMinute] = time.split(":").map(Number);

    // Validate order time is within business hours and after the current time
    if (orderHour < openHour || orderHour >= closeHour) {
      toast.error(
        "The shop is closed. Please choose a time between 8 AM and 10 PM.",
        toastOptions
      );
      return false;
    } else if (
      orderHour < currentHour ||
      (orderHour === currentHour && orderMinute <= currentTime.getMinutes())
    ) {
      toast.error("Please select a future time for your order.", toastOptions);
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

    axios
      .delete(`http://localhost:3000/user/${name}/cart`)
      .then((response) => {
        console.log(response);
        // Optionally, refresh data or update state here
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
        <div className="mx-5">
          <h1 className="text-4xl font-extrabold text-black mb-4">Hi {name}</h1>
          <h2 className="text-2xl text-black mb-8">
            Here are the items in your cart:
          </h2>
        </div>
        <div className="flex flex-wrap justify-center w-full max-w-5xl">
          {data.map((Rest) => (
            <div
              key={Rest._id}
              className="mx-5 bg-white rounded-lg shadow-lg p-5 transition-transform transform hover:scale-105"
            >
              <p className="text-gray-800">
                <strong>Rest Name:</strong> {Rest.RestName}
              </p>
              <p className="text-gray-800">
                <strong>Customer Name:</strong> Rs. {Rest.CustName}
              </p>
              <p className="text-gray-800">
                <strong>Dish Name:</strong> {Rest.Dish}
              </p>
              <button
                onClick={() => delItem(Rest._id)}
                className="mt-2 bg-red-500 text-Black py-1 px-3 rounded hover:bg-red-600 transition duration-200"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <br />
        <div className="mx-5 flex flex-col items-center">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mb-4 border border-gray-300 rounded p-2mx-5"
          />
          <label className="text-lg text-black mb-2">
            Total cost: Rs. {sum}
          </label>
          <button
            onClick={confOrder}
            className="m-5 bg-green-500 text-Black py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          >
            Confirm Order
          </button>
        </div>

        <div>
          <h2 className="mx-5 text-2xl text-black mb-8"> Already ordered</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {val.length === 0 ? (
            <p className="text-center text-white py-6">No orders found.</p>
          ) : (
            val.map((Rest) => (
              <div
                key={Rest.id}
                className="mx-5 bg-white rounded-lg shadow-lg p-5 transition-transform transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-blue-600">
                  Rstaurant Name: {Rest.RestName}
                </h3>
                <p className="text-gray-800">Total Cost: Rs. {Rest.Total}</p>
                <p className="text-gray-800">Order Time: {Rest.Time}</p>
                <h4 className="font-medium text-blue-500 mt-2">Orders:</h4>
                <ul className="list-disc list-inside">
                  {Rest.Dishes.map((dish, index) => (
                    <li key={index} className="text-gray-700">
                      {dish}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default CartItem;
