// Input controlado: su valor viene del estado del padre y avisa con onChange
function Buscador({ valor, onCambio }) {
  return (
    <input
      type="text"
      className="buscador"
      placeholder="Buscar personaje por nombre..."
      value={valor}
      onChange={(e) => onCambio(e.target.value)}
    />
  )
}

export default Buscador
