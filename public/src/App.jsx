import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import RegisterR from './register.jsx'
import LoginR from "./login.jsx"
import RegisterU from './registeruser.jsx'
import LoginU from "./loginuser.jsx"
import HomeU from "./userhome.jsx"
import HomeR from "./reshome.jsx"
import Restaurant from "./restaurants.jsx"
import AddItem from './additem.jsx'
import ListItem from './listitem.jsx'
import CartItem from './cart.jsx'
import OrderItem from './orders.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegisterR/>}></Route>
        <Route path='/login' element={<LoginR/>}></Route>
        <Route path='/registeruser' element={<RegisterU/>}></Route>
        <Route path='/loginuser' element={<LoginU/>}></Route>
        <Route path='/homeuser/:name' element={<HomeU/>}></Route>
        <Route path='/homeres/:name' element={<HomeR/>}></Route>
        <Route path='/restaurant/:name1/:name' element={<Restaurant />} />
        <Route path='/additem' element={<AddItem />} />
        <Route path='/listitem/:name' element={<ListItem />} />
        <Route path='/user/:name/cart' element={<CartItem />} />
        <Route path='/orders/:name' element={<OrderItem />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
