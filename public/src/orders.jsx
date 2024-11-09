import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const OrderItem = () => {
  const { name } = useParams();
  const [val, setVal] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://fow-backend.onrender.com/orders/${name}`).then((response) => {
      let filtered = [];
      const value = response.data;
      for (let i = 0; i < value.length; i++) {
        if (value[i].RestName === name) filtered = [...filtered, value[i]];
      }

      setVal(filtered);
    });
  }, [name]);

  return (
    <>
      <div className="flex flex-col items-center p-6  min-h-screen">
        <div className="mx-5">
        <h1 className="text-4xl font-extrabold text-Black mb-4">Welcome {name}</h1>
        <h2 className="text-2xl text-Black mb-8">Here is the list of the dishes:</h2>
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
                <h3 className="text-xl font-semibold text-blue-600">Recipient Name: {Rest.CustName}</h3>
                <p className="text-gray-800">Total Cost: Rs. {Rest.Total}</p>
                <p className="text-gray-800">Order Time: {Rest.Time}</p>
                <h4 className="font-medium text-blue-500 mt-2">Orders:</h4>
                <ul className="list-disc list-inside">
                  {Rest.Dishes.map((dish, index) => (
                    <li key={index} className="text-gray-700">{dish}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default OrderItem;
