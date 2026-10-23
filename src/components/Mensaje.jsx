// Componente para mostrar mensajes: cargando, error, vacío, éxito...
// El "tipo" cambia el color con una clase de CSS
function Mensaje({ tipo, texto }) {
  return <p className={`mensaje ${tipo}`}>{texto}</p>
}

export default Mensaje
