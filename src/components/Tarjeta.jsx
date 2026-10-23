import { Link } from 'react-router-dom'

// Tarjeta de un personaje. Recibe los datos y las funciones por props
function Tarjeta({ personaje, esFavorito, onAlternar }) {
  return (
    <div className="tarjeta">
      {/* Algunos personajes no traen imagen, en ese caso se muestra un cuadro vacío */}
      {personaje.image ? (
        <img src={personaje.image} alt={personaje.name} />
      ) : (
        <div className="sin-imagen">Sin imagen</div>
      )}
      <h3>{personaje.name}</h3>
      <p>Casa: {personaje.house || 'Desconocida'}</p>
      <div className="acciones">
        <Link to={`/detalle/${personaje.id}`} className="boton">Ver detalle</Link>
        <button className="boton secundario" onClick={() => onAlternar(personaje)}>
          {esFavorito ? '★ Quitar' : '☆ Favorito'}
        </button>
      </div>
    </div>
  )
}

export default Tarjeta
