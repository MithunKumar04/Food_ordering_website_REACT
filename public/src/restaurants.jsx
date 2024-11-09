import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Restaurant = () => {
  const { name } = useParams(); 
  const { name1 } = useParams(); 
  const [data, setData] = useState([]); 

  
  useEffect(() => {
    axios
      .get(`http://localhost:3000/restaurant/${name1}/${name}`) // Replace with your server endpoint
      .then((response) => {
        let filtered=[]
        console.log(response.data)
        const val=response.data;
        console.log(name)
        for(let i=0;i<val.length;i++)
        {
          if(val[i].ResName===name)
          filtered = [...filtered, val[i]]
        }

        setData(filtered); // Store the fetched data in state
      })
      .catch((error) => {
        console.error(error);
      });
  }, [name]); 

  function addFunc(value,price)
  { 
    axios.post(`http://localhost:3000/${name1}/${name}`,{"CustName":name1,"RestName":name,"Dish":value,"price":price})
    .then((response) => {
      console.log("Added");
    })
    .catch((error) => {
      console.error(error);
    });

  };
  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
      <div className='mx-5'>
      <h1 className="text-4xl font-extrabold text-black mb-4">Detail Page for {name}</h1>
      <h2 className="text-2xl text-black mb-8">Here is the list of the dishes:</h2>
      </div>
      <div className="flex flex-wrap justify-center w-full max-w-5xl">
        {data.map((Rest) => (
          <div
            key={Rest.id}
            className="mx-5 bg-white rounded-lg shadow-lg p-5 transition-transform transform hover:scale-105"            
          >
            <h3 className="text-xl font-semibold text-blue-600">Dish Name: {Rest.itname}</h3>
            <p className="text-gray-800">Dish Price: Rs. {Rest.price}</p>
            <p className="text-gray-800">Dish Ratings: {Rest.ratings}/5</p>
            <p className="text-gray-800">Dish Description: {Rest.description}</p>
            <button 
              onClick={() => addFunc(Rest.itname, Rest.price)} 
              className="mt-4 bg-blue-500 text-Black py-2 px-4 rounded hover:bg-blue-600 transition duration-200" // Button styling
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Restaurant;