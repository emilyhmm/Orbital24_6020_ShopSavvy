import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./Contexts/AuthContext";
import { CartProvider } from "./Contexts/CartContext";
import { QuizProvider } from "./Contexts/QuizContext";
import { ProductProvider } from "./Contexts/ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // disable strict mode for testing
  //<React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <QuizProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </QuizProvider>
      </CartProvider>
    </AuthProvider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
