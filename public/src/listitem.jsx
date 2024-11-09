
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
const ListItem = () => {
    const { name } = useParams();
  const [val,setVal]=useState([])
  const navigate = useNavigate();

  useEffect(()=>
  {
    axios.get(`http://localhost:3000/listitem/${name}`)
    .then((response)=>
    {
      let filtered=[]
        console.log(response.data)
        const value=response.data;
        console.log(name)
        for(let i=0;i<value.length;i++)
        {
          if(value[i].ResName===name)
          filtered = [...filtered, value[i]]
        }

      setVal(filtered);
      console.log(filtered);
    })
  },[name])

  return (
      <>
        <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
          <div className='mx-5'>
          <h1 className="text-4xl font-extrabold text-black mb-4">Welcome {name}</h1>
          <h2 className="text-2xl text-black mb-8">Here is the list of the dishes:</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {val.length === 0 ? (
              <p className="text-center text-white py-6">No orders found.</p>
            ) : (
              <div className="flex flex-wrap justify-center">
                {val.map((Rest) => (
                  <div
                    key={Rest.id}
                    className="bg-white rounded-lg shadow-lg p-5 transition-transform transform hover:scale-105 mx-5 "
                     // Small rectangular box
                  >
                    <h3 className="text-xl font-semibold text-blue-600">Dish Name: {Rest.itname}</h3>
                    <p className="text-gray-800">Dish Price: Rs. {Rest.price}</p>
                    <p className="text-gray-800">Dish Ratings: {Rest.ratings}/5</p>
                    <p className="text-gray-800">Dish Description: {Rest.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    );
    
};

export default ListItem;