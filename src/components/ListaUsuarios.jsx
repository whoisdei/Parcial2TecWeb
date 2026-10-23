// Lista de usuarios registrados con botones para editar y eliminar
function ListaUsuarios({ usuarios, onEditar, onEliminar }) {
  // Renderizado condicional: si el arreglo está vacío se muestra un aviso
  if (usuarios.length === 0) {
    return <p className="mensaje info">Aún no hay usuarios registrados</p>
  }

  return (
    <div>
      <p><strong>Total registrados: {usuarios.length}</strong></p>
      <ul className="lista-usuarios">
        {usuarios.map((u) => (
          // La identificación es única, por eso sirve como key
          <li key={u.identificacion}>
            <div>
              <strong>{u.nombre}</strong>
              <br />
              <small>ID: {u.identificacion} · {u.correo}</small>
            </div>
            <div className="acciones">
              <button className="boton" onClick={() => onEditar(u)}>Editar</button>
              <button className="boton peligro" onClick={() => onEliminar(u)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListaUsuarios
