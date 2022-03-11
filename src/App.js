import React from "react";
import "./styles.css";
import Calculadora from "./components/calc/Calculadora";
import logoReact from "./assets/react.png"

export default function App() {
  return (
    <div className="App">

        <div className="header"> 
          <h1>Calculadora em React</h1>
          <img src={logoReact} alt="logo" /> 
        </div>

        <div className="container">
          <Calculadora />
        </div>
        <div className="footer">
          <span><strong>℗</strong>Direitos reservados!<br/>Desenvolvido por: Paulo Bruno Soares</span>
        </div>
      
    </div>
  );
}
