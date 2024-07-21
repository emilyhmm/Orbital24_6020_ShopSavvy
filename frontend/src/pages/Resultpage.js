import { useContext } from 'react';
import NavBar from "../Components/Navbar";
import Productlist from "../Components/Productlist";
import Quizbar from "../Components/Quizbar"
import { AuthContext } from "../Contexts/AuthContext";

function Resultpage({ setCart }) {
    const { isLoggedIn } = useContext(AuthContext);
    return ( 
        <div>
            <NavBar />
            {isLoggedIn && (
                <Quizbar />
            )}
            <Productlist setCart={setCart} />
        </div>
     );
}

export default Resultpage;