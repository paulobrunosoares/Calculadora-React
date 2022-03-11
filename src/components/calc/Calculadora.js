import React, { useState, useEffect, useRef } from "react";
import "./calculadora-c.css";

export default function Calculadora() {
  const [result, setResult] = useState("");
  const [resultMemory, setResultMemory] = useState("");
  const [isOperador, setIsOperador] = useState(false);
  const [isCalc, setCalc] = useState(false);
  const [countOP, setCountOP] = useState(0);
  const inputBtn = useRef(null)

  useEffect( ()=>{
    document.addEventListener('keydown', addEvent)
    
    return ()=>{
      document.removeEventListener('keydown', addEvent)
    } 
  }, [])

  function addEvent(ev){
      // console.log(ev.key)
      inputBtn.current.querySelectorAll('button')
        .forEach( (btn) => {
          if(btn.title == ev.key){
            btn.click()
          } 
        })
  }

  const backspace = () =>{
    setResult(result.substring(0, result.length -1))
  }

  const addItem = (item) => {
    // console.log(item.target.title);

    const isOP = item.target.value === "operador";

    // Tratamento para subistuir operador
    if (isOP && isOperador) {
      setResult(result.slice(0, result.length - 1) + item.target.title);
    } else if (isOP && countOP == 1) {
      // console.log("Count: ", countoperador);
      const soma = eval(result).toString().slice(0, 5);
      setResult(soma + item.target.title);
      setResultMemory(result + " = " + soma);
      setIsOperador(isOP);
      setCalc(false);
    } else if (result.length !== "") {
      isCalc
        ? !isOP
          ? setResult(item.target.title)
          : setResult(result + item.target.title)
        : setResult(result + item.target.title);
      isOP && setCountOP(1);
      setIsOperador(isOP);
      setCalc(false);
    }
  };

  const clear = () => {
    setResult("");
    setCountOP(0);
    setCalc(false)
  };

  const calc = () => {
    if(Number(result) !== eval(result) && result.length > 0){
      try {
        const calculo = eval(result).toString().slice(0, 5);
        // console.log(calculo);
        if(!isNaN(calculo)){
          setResult(calculo);
          setResultMemory(result + " = " + calculo)
          setCalc(true)
       }else{
         setResult('0');
         setResultMemory("A divisão por zero não é definida")
       }
        setCalc(true);
      } catch (error) {
        alert("Calculo invalido");
      }
    }else{
      consloe.log('ok')
    }
  };

  const calcPorcentagem = () => {
    const element = result.split(/[-|*|+|\/]/g);
    const operador = result.replace(/\d/g, "").replace(".", "");
    try {
      const calc =
        operador != "*"
          ? eval(
              `${element[0]} ${operador} (${element[0]} * (${element[1]} / 100))`
            )
          : eval(`${element[0]} * (${element[1]} / 100)`);

      setResult(calc.toFixed(2).toString().slice(0, 5));
      setResultMemory(result + "% = " + calc.toFixed(2).toString().slice(0, 5));

      setCalc(true);
      setCountOP(0);
    } catch (error) {
      alert("Calculo invalido");
    }
  };

  const raiz = () => {
    if(result.length > 0){
      const raiz = Math.sqrt(result);
      if(isNaN(raiz)){
        alert("Calculo invalido")
      }else{
        setResult(raiz.toString().slice(0, 10));
        setResultMemory("raiz " + result + " = " + raiz.toFixed(2).toString().slice(0, 5));
      }
 
    }

  };
  return (
    <div className="container-calc">
      <label className="resultMemory">{resultMemory}</label>
      <input type="text" className="result" value={result} />
      <div className="content" ref={inputBtn}>
        <div className="content-btn-number">
          <button className="btnNumber" title="7" onClick={addItem}>
            7
          </button>
          <button className="btnNumber" title="8" onClick={addItem}>
            8
          </button>
          <button className="btnNumber" title="9" onClick={addItem}>
            9
          </button>
          <button className="btnNumber" title="4" onClick={addItem}>
            4
          </button>
          <button className="btnNumber" title="5" onClick={addItem}>
            5
          </button>
          <button className="btnNumber" title="6" onClick={addItem}>
            6
          </button>
          <button className="btnNumber" title="1" onClick={addItem}>
            1
          </button>
          <button className="btnNumber" title="2" onClick={addItem}>
            2
          </button>
          <button className="btnNumber" title="3" onClick={addItem}>
            3
          </button>
          <button className="btnNumber" title="0" onClick={addItem}>
            0
          </button>
          <button className="btnNumber" title="." onClick={addItem}>
            .
          </button>
          <button className="btnCalcule" title="Enter" onClick={calc}>
            =
          </button>
        </div>
        <div className="content-btn-operation">
          <button className="btnOperation op-A" title="Escape" onClick={clear}>
            CE
          </button>
          <button className="btnOperation op-A" title="r" onClick={raiz}>
            R
          </button>
          <button
            className="btnOperation op-P"
            title="%"
            onClick={calcPorcentagem}
          >
            <p>%</p>
          </button>
          <button
            className="btnOperation op-D"
            value="operador"
            title="/"
            onClick={addItem}
          >
            /
          </button>
          <button
            className="btnOperation op-M"
            value="operador"
            title="*"
            onClick={addItem}
          >
            X
          </button>
          <button
            className="btnOperation op-S"
            value="operador"
            title="-"
            onClick={addItem}
          >
            -
          </button>
          <button
            className="btnOperation op-Ad"
            value="operador"
            title="+"
            onClick={addItem}
          >
            +
          </button>
          <button
            className="btnOperation op-Ad"
            value="operador"
            title="Backspace"
            onClick={backspace}
            hidden="true"
          ></button>

        </div>
      </div>
    </div>
  );
}
