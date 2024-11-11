import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const HomePageU = () => {
  const [val, setVal] = useState([]);
  const navigate = useNavigate();
  const { name } = useParams();
  useEffect(() => {
    axios.get(`https://food-ordering-website-2lmb.onrender.com/homeuser/${name}`).then((result) => {
      setVal(result.data);
      console.log(result.data);
    });
  }, [name]);

  return (
    <>
      <div className="mx-5">
        <h1>Welcome {name}</h1>
        <h2>Here the list of Restaurants</h2>
        {
          <div key="xhcncj">
            {val.map((Rest) => (
              <Link to={`/restaurant/${name}/${Rest.name}`}>
                <button
                  className="mx-5 btn btn-default border w-9 bg-light rounded text-decoration-none"
                  key={Rest.id}
                  style={{
                    margin: "10px",
                    padding: "10px 20px",
                    cursor: "pointer",
                    height: "100px",
                    width: "250px",
                  }}
                >
                  {Rest.name}
                </button>
              </Link>
            ))}
          </div>
        }

        <div>
          <hr />
          <hr />
          <button className="mx-5 btn btn-default border w-9 bg-light rounded text-decoration-none">
            <Link to={`/user/${name}/cart`} className="btn btn-default">
              {" "}
              My cart
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePageU;
