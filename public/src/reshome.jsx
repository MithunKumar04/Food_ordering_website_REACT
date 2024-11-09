import { useState ,useEffect} from "react";
import { useNavigate,useParams, Link } from 'react-router-dom';
import axios from 'axios';
const HomePageR = () => {
  const { name } = useParams(); 
  const [data, setData] = useState(null); 

  
  useEffect(() => {
    axios
      .get(`http://localhost:3000/homeres/${name}`) // Replace with your server endpoint
      .then((response) => {
        setData(response.data); // Store the fetched data in state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [name]); 

  return (
    <>
      <div>
      <h1>Detail Page for {name}</h1>
      
      <button>
        <Link
            to={`/additem`}
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
           Add item
          </Link>
        </button>

        <button>
        <Link
            to={`/listitem/${name}`}
            className="btn btn-default border w-200 bg-light rounded-0 text-decoration-none"
          >
           List items
          </Link>
        </button>

        <button>
        <Link
            to={`/orders/${name}`}
            className="btn btn-default border w-200 bg-light rounded-0 text-decoration-none"
          >
           My Orders
          </Link>
        </button>
    </div>
    </>
  );
};

export default HomePageR;