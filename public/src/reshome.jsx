import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
const HomePageR = () => {
  const { name } = useParams();
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get(`https://food-ordering-website-2lmb.onrender.com/homeres/${name}`) // Replace with your server endpoint
      .then((response) => {
        setData(response.data); // Store the fetched data in state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [name]);

  return (
    <>
      <div>
        <h1>Welcome {name} Restaurant manager</h1>
        <div className="w-20 h-30 mx-5 my-5 py-5 px-5">
          <button className="btn btn-default border w-9 bg-light rounded text-decoration-none">
            <Link to={`/additem`} className="btn btn-default ">
              Add item
            </Link>
          </button>
          <br />
          <br />
          <button className="btn btn-default border w-9 bg-light rounded text-decoration-none">
            <Link to={`/listitem/${name}`} className="btn ">
              List items
            </Link>
          </button>{" "}
          <br />
          <br />
          <button className="btn btn-default border w-9 bg-light rounded text-decoration-none">
            <Link to={`/orders/${name}`} className="btn ">
              My Orders
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePageR;
