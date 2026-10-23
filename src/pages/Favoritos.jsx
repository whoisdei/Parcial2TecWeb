import Tarjeta from '../components/Tarjeta.jsx'
import Mensaje from '../components/Mensaje.jsx'

function Favoritos({ favoritos, alternarFavorito }) {
  return (
    <section>
      <h2>Mis favoritos</h2>
      {favoritos.length === 0 ? (
        <Mensaje tipo="info" texto="Todavía no has guardado ningún favorito" />
      ) : (
        <div className="grilla">
          {favoritos.map((p) => (
            <Tarjeta
              key={p.id}
              personaje={p}
              esFavorito={true}
              onAlternar={alternarFavorito}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Favoritos
