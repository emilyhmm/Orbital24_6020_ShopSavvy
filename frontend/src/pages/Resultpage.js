import NavBar from "../Components/Navbar";
import Productlist from "../Components/Productlist";
import Quizbar from "../Components/Quizbar"

function Resultpage({ setCart }) {
    return ( 
        <div>
            <NavBar />
            <Quizbar />
            <Productlist setCart={setCart} />
        </div>
     );
}

export default Resultpage;