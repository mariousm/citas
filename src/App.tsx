import React, { Fragment, useState } from "react";
import Formulario from "./components/Formulario";

function App() {
  // Creamos el state de citas
  const [citas, guardarCitas] = useState<any[]>([]);

  // Función que añada la nueva cita
  const crearCita = (cita: any) => {
    let allCitas = [...citas, cita];
    guardarCitas([...citas, cita]);
  };

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">2</div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
