import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  // Citas en LocalStorage
  let citasIniciales: any = localStorage.getItem("citas");
  citasIniciales = JSON.parse(citasIniciales);
  if (citasIniciales === null) {
    citasIniciales = [];
  }

  // Creamos el state de citas
  const [citas, guardarCitas] = useState<any[]>(citasIniciales);

  // Uso de useEffect para ciertas operaciones cuando el state cambia
  // Se ejecuta cuando el componente está listo y cuando hay cambios en el componente
  // Para asegurarnos que solo se ejecute una vez, y por ejemplo cuando consultamos una API no se vuelva a ejectuar tenermos que pasarle []
  // Al pasarle [citas], a esto se le llama dependcencias y solo se ejecuta cuando el componente está listo y cuando hay un cambio de estado en las citas
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
    // eslint-disable-next-line
  }, [citas]);

  // Función que añada la nueva cita
  const crearCita = (cita: any) => {
    guardarCitas([...citas, cita]);
  };

  // Función que elimina una cita por su id
  const eliminarCita = (id: string) => {
    guardarCitas(citas.filter((cita) => cita.id !== id));
  };

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>Administrar Citas</h2>
            {citas.length !== 0 ? (
              citas.map((cita) => {
                return (
                  <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
                );
              })
            ) : (
              <p className="alerta-error">Añade una nueva cita</p>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
