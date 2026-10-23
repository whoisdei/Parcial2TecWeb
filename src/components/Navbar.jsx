import { NavLink } from 'react-router-dom'

// Barra de navegación. NavLink le agrega la clase "active" al enlace de la ruta actual
function Navbar({ totalFavoritos, totalUsuarios }) {
  return (
    <header className="navbar">
      <span className="logo">⚡ Mundo Mágico</span>
      <nav className="enlaces">
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/lista">Lista</NavLink>
        <NavLink to="/favoritos">Favoritos ({totalFavoritos})</NavLink>
        <NavLink to="/registro">Registro ({totalUsuarios})</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
