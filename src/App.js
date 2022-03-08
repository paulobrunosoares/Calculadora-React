import React from "react";
import "./styles.css";
import Calculadora from "./components/calc/Calculadora";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Calc React</h1>
        <Calculadora />
      </div>
    </div>
  );
}
