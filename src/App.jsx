import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Inicio from './pages/Inicio.jsx'
import Lista from './pages/Lista.jsx'
import Detalle from './pages/Detalle.jsx'
import Favoritos from './pages/Favoritos.jsx'
import Registro from './pages/Registro.jsx'
import NoEncontrado from './pages/NoEncontrado.jsx'

function App() {
  // Los favoritos se leen de localStorage al iniciar; si no hay nada, empieza vacío
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem('favoritos')
    return guardados ? JSON.parse(guardados) : []
  })

// Igual que los favoritos: se leen de localStorage al iniciar
const [usuarios, setUsuarios] = useState(() => {
  const guardados = localStorage.getItem('usuarios')
  return guardados ? JSON.parse(guardados) : []
})

  // Cada vez que cambian los favoritos, se guardan en localStorage
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos))
  }, [favoritos])

  // Cada vez que cambia la lista de usuarios, se guarda en localStorage
useEffect(() => {
  localStorage.setItem('usuarios', JSON.stringify(usuarios))
}, [usuarios])

  // Si el personaje ya es favorito lo quita, si no lo agrega
  function alternarFavorito(personaje) {
    const yaEsFavorito = favoritos.some((f) => f.id === personaje.id)
    if (yaEsFavorito) {
      setFavoritos(favoritos.filter((f) => f.id !== personaje.id))
    } else {
      setFavoritos([...favoritos, personaje])
    }
  }

  return (
    <>
      <Navbar totalFavoritos={favoritos.length} totalUsuarios={usuarios.length} />
      <main className="contenedor">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/lista"
            element={<Lista favoritos={favoritos} alternarFavorito={alternarFavorito} />}
          />
          <Route
            path="/detalle/:id"
            element={<Detalle favoritos={favoritos} alternarFavorito={alternarFavorito} />}
          />
          <Route
            path="/favoritos"
            element={<Favoritos favoritos={favoritos} alternarFavorito={alternarFavorito} />}
          />
          <Route
            path="/registro"
            element={<Registro usuarios={usuarios} setUsuarios={setUsuarios} />}
          />
          {/* El asterisco atrapa cualquier ruta que no exista */}
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App