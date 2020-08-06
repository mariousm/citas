import React, { Fragment, useState } from "react";
import * as uuid from "uuid";
import PropTypes from "prop-types";

const Formulario = ({ crearCita }: any) => {
  // Crear el state de cita
  const [cita, actualizarCita] = useState({
    id: "",
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  // Crear state para los errores del formulario
  const [error, actualizarError] = useState(false);

  // Extraer valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // Función que se ejecuta cuando el usuario cambia algo en los inputs
  const actualizarState = (e: any) => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  // Función que se ejecuta cuando el usuario envía el formulario
  const submitCita = (e: any) => {
    e.preventDefault();

    // Validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      actualizarError(true);
      return;
    }

    // Eliminamos el mensaje de error
    actualizarError(false);

    // Asignamos el id
    cita.id = uuid.v4();

    // Creamos la cita
    crearCita(cita);

    // Reiniciamos el form
    actualizarCita({
      id: "",
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>

      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}

      <form onSubmit={submitCita}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño"
          onChange={actualizarState}
          value={propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />

        <label>Síntomas</label>
        <textarea
          name="sintomas"
          className="u-full-width"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default Formulario;
