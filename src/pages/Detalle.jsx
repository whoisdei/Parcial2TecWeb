import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { obtenerPersonaje } from '../services/hpApi.js'
import Mensaje from '../components/Mensaje.jsx'

function Detalle({ favoritos, alternarFavorito }) {
  // useParams lee el :id que viene en la URL
  const { id } = useParams()
  const navigate = useNavigate()

  const [personaje, setPersonaje] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Se carga el personaje cuando entra a la página y cada vez que cambia el id
  useEffect(() => {
    async function cargar() {
      setCargando(true)
      setError(null)
      try {
        const dato = await obtenerPersonaje(id)
        setPersonaje(dato)
      } catch (err) {
        setError('No se pudo cargar el personaje.')
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [id])

  if (cargando) return <Mensaje tipo="info" texto="Cargando personaje..." />
  if (error) return <Mensaje tipo="error" texto={error} />
  if (!personaje) return <Mensaje tipo="info" texto="Personaje no encontrado" />

  const esFavorito = favoritos.some((f) => f.id === personaje.id)

  return (
    <section className="detalle">
      {personaje.image ? (
        <img src={personaje.image} alt={personaje.name} />
      ) : (
        <div className="sin-imagen">Sin imagen</div>
      )}
      <div className="info">
        <h2>{personaje.name}</h2>
        <ul>
          <li><strong>Especie:</strong> {personaje.species || 'Desconocida'}</li>
          <li><strong>Género:</strong> {personaje.gender || 'Desconocido'}</li>
          <li><strong>Casa:</strong> {personaje.house || 'Desconocida'}</li>
          <li><strong>Nacimiento:</strong> {personaje.dateOfBirth || 'Desconocido'}</li>
          <li><strong>Ascendencia:</strong> {personaje.ancestry || 'Desconocida'}</li>
          <li><strong>Color de ojos:</strong> {personaje.eyeColour || 'Desconocido'}</li>
          <li><strong>Color de cabello:</strong> {personaje.hairColour || 'Desconocido'}</li>
          <li><strong>Patronus:</strong> {personaje.patronus || 'Ninguno'}</li>
          <li><strong>Actor:</strong> {personaje.actor || 'Desconocido'}</li>
        </ul>
        <div className="acciones">
          <button className="boton" onClick={() => alternarFavorito(personaje)}>
            {esFavorito ? '★ Quitar de favoritos' : '☆ Agregar a favoritos'}
          </button>
          <button className="boton secundario" onClick={() => navigate('/lista')}>
            Volver al listado
          </button>
        </div>
      </div>
    </section>
  )
}

export default Detalle
