import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Error from "./components/Error";
import Clima from "./components/Clima";

function App() {
  const [ciudad, guardarCiudad] = useState("");
  const [pais, guardaPais] = useState("");
  const [error, guardaError] = useState(false);
  const [resultado, guardaResultado] = useState({})

  useEffect(() => {
    
    //prevenir ejecucion
    if(ciudad === '') return;

    const consultarAPI = async () => {

      const appId = 'd931b49d74e4dce233ab711eb41fa6ad'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
  
      //consultar url
  
      const respuesta = await fetch(url);
      const resultadoJSON = await respuesta.json();
      
      guardaResultado(resultadoJSON)
  
    }

    consultarAPI();
  }, [ciudad, pais])

  const datosConsulta = datos => {
    //validar que campos esten
    if (datos.ciudad === "" || datos.pais === "") {
      //error
      guardaError(true);
      return;
    }

    guardarCiudad(datos.ciudad);
    guardaPais(datos.pais);
    guardaError(false);
  };

  //Cargar un componente condicionalmente
  let componente;
  if (error) {
    //hay un error, mostrarlo
    componente = <Error mensaje="Ambos campos son obligatorios" />;
  } 
  else if(resultado.cod === '404'){
    componente = <Error mensaje="La ciudad no existe en nuestro registro" />
  } 
  else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <div className="App">
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario datosConsulta={datosConsulta} />
            </div>
            <div className="col s12 m6">{componente}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
