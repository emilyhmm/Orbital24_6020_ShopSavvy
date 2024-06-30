import Order from "../Components/Order";
import NavBar from "../Components/Navbar";

function Orderpage({ cart }) {
    return (
      <div>
        <NavBar cart={cart} />
        <Order />
      </div>
    );
  }
  
  export default Orderpage;