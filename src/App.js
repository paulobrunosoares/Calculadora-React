import React from "react";
import "./styles.css";
import Calculadora from "./components/calc/Calculadora";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Calculadora em React</h1>
        <Calculadora />
        <div className="footer">
          <span><strong>℗</strong>Direitos reservados!<br/>Desenvolvido por: Paulo Bruno Soares</span>
        </div>
      </div>
    </div>
  );
}
