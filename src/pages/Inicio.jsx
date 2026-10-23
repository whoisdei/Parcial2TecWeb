import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <section className="inicio">
      <h1>Explorador del Mundo Mágico</h1>
      <p>
        Esta aplicación permite explorar los personajes de Harry Potter: buscarlos por
        nombre, filtrarlos por casa, ver su información completa y guardar tus favoritos.
      </p>
      <p>
        Los datos se obtienen de la HP-API, una API pública y gratuita con información
        de personajes, casas, varitas y más. Además, hay una sección para registrar usuarios.
      </p>
      <Link to="/lista" className="boton">Ver personajes</Link>
    </section>
  )
}

export default Inicio
