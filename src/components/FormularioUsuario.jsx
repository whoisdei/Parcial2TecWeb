import { useState, useEffect } from 'react'

const vacio = { identificacion: '', nombre: '', correo: '' }

// Formulario controlado para registrar o editar un usuario
function FormularioUsuario({ usuarioEditando, onGuardar, onCancelar }) {
  const [datos, setDatos] = useState(vacio)

  // Cuando se pulsa "Editar" llega un usuario y sus datos se cargan en el formulario;
  // cuando no hay usuario en edición, el formulario se limpia
  useEffect(() => {
    setDatos(usuarioEditando || vacio)
  }, [usuarioEditando])

  // Un solo manejador para los tres campos, usando el "name" de cada input
  function manejarCambio(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function manejarEnvio(e) {
    e.preventDefault() // evita que la página se recargue
    const exito = onGuardar(datos)
    if (exito) setDatos(vacio) // solo se limpia si la validación pasó
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio}>
      <input
        name="identificacion"
        placeholder="Identificación"
        value={datos.identificacion}
        onChange={manejarCambio}
      />
      <input
        name="nombre"
        placeholder="Nombre"
        value={datos.nombre}
        onChange={manejarCambio}
      />
      <input
        name="correo"
        placeholder="Correo"
        value={datos.correo}
        onChange={manejarCambio}
      />
      <div className="acciones">
        <button type="submit" className="boton">
          {usuarioEditando ? 'Guardar cambios' : 'Registrar'}
        </button>
        {usuarioEditando && (
          <button type="button" className="boton secundario" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default FormularioUsuario
