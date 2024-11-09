
import { useEffect, useState } from 'react';
import { Link, useNavigate,useParams } from 'react-router-dom';
import axios from "axios";
const HomePageU = () => {
  const [val,setVal]=useState([])
  const navigate = useNavigate();
  const { name } = useParams(); 
  useEffect(()=>
  {
    axios.get(`http://localhost:3000/homeuser/${name}`)
    .then((result)=>
    {
      setVal(result.data);
      console.log(result.data);
    })
  },[name])

  return (
    <>
    <div>
      <h1>Welcome User</h1>
      <h2>Here the list of Restaurants</h2>
      {<div key="xhcncj">
      {val.map((Rest) => (
        <Link to={`/restaurant/${name}/${Rest.name}`}>
        <button
          key={Rest.id}
          
          style={{ margin: '10px', padding: '10px 20px', cursor: 'pointer' }}
        >
          {Rest.name}
        </button>
        </Link>
      ))}
      </div>}

      <div>
        <button><Link to={`/user/${name}/cart`} className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        > My cart</Link></button>
      </div>
    </div>
    </>
  );
};

export default HomePageU;