import { useState, useEffect } from 'react'
import { obtenerPersonajes } from '../services/hpApi.js'
import Tarjeta from '../components/Tarjeta.jsx'
import Buscador from '../components/Buscador.jsx'
import Mensaje from '../components/Mensaje.jsx'

const POR_PAGINA = 12

function Lista({ favoritos, alternarFavorito }) {
  const [personajes, setPersonajes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [casa, setCasa] = useState('')
  const [visibles, setVisibles] = useState(POR_PAGINA)

  // Se vuelve a pedir la información a la API cada vez que cambia la casa del filtro
  useEffect(() => {
    async function cargar() {
      setCargando(true)
      setError(null)
      try {
        const datos = await obtenerPersonajes(casa)
        setPersonajes(datos)
      } catch (err) {
        setError('Ocurrió un error al cargar los personajes. Intenta de nuevo.')
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [casa])

  // Si el usuario busca o cambia el filtro, se vuelve a mostrar desde las primeras 12
  useEffect(() => {
    setVisibles(POR_PAGINA)
  }, [busqueda, casa])

  // La API no tiene búsqueda por texto, así que se filtra la lista ya cargada
  const filtrados = personajes.filter((p) =>
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <section>
      <h2>Personajes</h2>
      <div className="filtros">
        <Buscador valor={busqueda} onCambio={setBusqueda} />
        <select value={casa} onChange={(e) => setCasa(e.target.value)}>
          <option value="">Todas las casas</option>
          <option value="gryffindor">Gryffindor</option>
          <option value="slytherin">Slytherin</option>
          <option value="ravenclaw">Ravenclaw</option>
          <option value="hufflepuff">Hufflepuff</option>
        </select>
      </div>

      {cargando && <Mensaje tipo="info" texto="Cargando personajes... (la primera vez puede tardar)" />}
      {error && <Mensaje tipo="error" texto={error} />}
      {!cargando && !error && filtrados.length === 0 && (
        <Mensaje tipo="info" texto="No se encontraron resultados" />
      )}

      <div className="grilla">
        {/* slice muestra solo los primeros "visibles" elementos */}
        {filtrados.slice(0, visibles).map((p) => (
          <Tarjeta
            key={p.id}
            personaje={p}
            esFavorito={favoritos.some((f) => f.id === p.id)}
            onAlternar={alternarFavorito}
          />
        ))}
      </div>

      {/* El botón solo aparece si todavía quedan personajes por mostrar */}
      {!cargando && visibles < filtrados.length && (
        <div className="centrado">
          <button className="boton" onClick={() => setVisibles(visibles + POR_PAGINA)}>
            Cargar más
          </button>
        </div>
      )}
    </section>
  )
}

export default Lista
