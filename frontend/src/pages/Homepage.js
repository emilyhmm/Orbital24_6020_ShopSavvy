import React from "react";
import NavBar from "../Components/Navbar";

function Homepage({ cart }) {
  return (
    <div>
      <NavBar cart={cart} />
    </div>
  );
}

export default Homepage;
