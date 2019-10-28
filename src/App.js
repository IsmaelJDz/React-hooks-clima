import React, { useState } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Error from "./components/Error";

function App() {
  const [ciudad, guardarCiudad] = useState("");
  const [pais, guardaPais] = useState("");
  const [error, guardaError] = useState(false);

  const datosConsulta = datos => {
    //validar que campos esten
    if (datos.ciudad === "" || datos.pais === "") {
      //error
      guardaError(true);
      return;
    }

    guardarCiudad(datos.ciudad);
    guardarCiudad(datos.pais);
    guardaError(false);
  };

  //Cargar un componente condicionalmente

  let componente;
  if (error) {
    //hay un error, mostrarlo
    componente = <Error mensaje="Ambos campos son obligatorios" />;
  } else {
    componente = null;
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
