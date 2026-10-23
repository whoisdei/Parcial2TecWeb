import { useState } from 'react'
import FormularioUsuario from '../components/FormularioUsuario.jsx'
import ListaUsuarios from '../components/ListaUsuarios.jsx'
import Mensaje from '../components/Mensaje.jsx'

// Los usuarios llegan por props desde App para que no se borren al cambiar de página
function Registro({ usuarios, setUsuarios }) {
  // Guarda el usuario que se está editando (null si se está registrando uno nuevo)
  const [usuarioEditando, setUsuarioEditando] = useState(null)
  // Mensaje en pantalla: { tipo: 'exito' | 'error', texto: '...' }
  const [mensaje, setMensaje] = useState(null)

  // Revisa los datos y devuelve un texto de error, o null si todo está bien
  function validar(datos) {
    const { identificacion, nombre, correo } = datos

    if (!identificacion.trim() || !nombre.trim() || !correo.trim()) {
      return 'Todos los campos son obligatorios'
    }
    if (!/^[0-9]+$/.test(identificacion.trim())) {
      return 'La identificación debe contener solo números'
    }
    if (!correo.includes('@')) {
      return 'El correo debe incluir @'
    }

    // Busca si otro usuario ya tiene esa identificación.
    // Al editar se ignora el propio usuario, así puede conservar la suya.
    const repetido = usuarios.some(
      (u) =>
        u.identificacion === identificacion.trim() &&
        (!usuarioEditando || u.identificacion !== usuarioEditando.identificacion)
    )
    if (repetido) {
      return `Ya existe un usuario con la identificación ${identificacion.trim()}`
    }
    return null
  }

  // Se ejecuta al enviar el formulario. Devuelve true si se guardó bien.
  function guardar(datos) {
    const error = validar(datos)
    if (error) {
      setMensaje({ tipo: 'error', texto: error })
      return false
    }

    // Se limpian los espacios sobrantes antes de guardar
    const usuario = {
      identificacion: datos.identificacion.trim(),
      nombre: datos.nombre.trim(),
      correo: datos.correo.trim(),
    }

    if (usuarioEditando) {
      // map reemplaza solo al usuario editado y deja los demás en su misma posición
      setUsuarios(
        usuarios.map((u) =>
          u.identificacion === usuarioEditando.identificacion ? usuario : u
        )
      )
      setUsuarioEditando(null)
      setMensaje({ tipo: 'exito', texto: 'Usuario actualizado correctamente' })
    } else {
      setUsuarios([...usuarios, usuario])
      setMensaje({ tipo: 'exito', texto: 'Usuario registrado correctamente' })
    }
    return true
  }

  function eliminar(usuario) {
    // confirm abre el cuadro de confirmación del navegador
    if (!window.confirm(`¿Eliminar a ${usuario.nombre}?`)) return

    setUsuarios(usuarios.filter((u) => u.identificacion !== usuario.identificacion))

    // Si justo se estaba editando ese usuario, se cancela la edición
    if (usuarioEditando && usuarioEditando.identificacion === usuario.identificacion) {
      setUsuarioEditando(null)
    }
    setMensaje({ tipo: 'exito', texto: 'Usuario eliminado correctamente' })
  }

  function cancelarEdicion() {
    setUsuarioEditando(null)
    setMensaje(null)
  }

  return (
    <section>
      <h2>Registro de usuarios</h2>
      <FormularioUsuario
        usuarioEditando={usuarioEditando}
        onGuardar={guardar}
        onCancelar={cancelarEdicion}
      />
      {mensaje && <Mensaje tipo={mensaje.tipo} texto={mensaje.texto} />}
      <ListaUsuarios
        usuarios={usuarios}
        onEditar={setUsuarioEditando}
        onEliminar={eliminar}
      />
    </section>
  )
}

export default Registro
