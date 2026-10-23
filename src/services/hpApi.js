// Aquí van las funciones que hacen las peticiones a la API de Harry Potter
const URL_BASE = 'https://hp-api.onrender.com/api'

// Trae todos los personajes, o solo los de una casa si se le pasa el nombre
export async function obtenerPersonajes(casa) {
  const ruta = casa ? `/characters/house/${casa}` : '/characters'
  const respuesta = await fetch(URL_BASE + ruta)

  // fetch no lanza error si el servidor responde mal, por eso se revisa .ok
  if (!respuesta.ok) {
    throw new Error('No se pudo cargar la información')
  }
  return await respuesta.json()
}

// Trae un solo personaje por su id
export async function obtenerPersonaje(id) {
  const respuesta = await fetch(`${URL_BASE}/character/${id}`)
  if (!respuesta.ok) {
    throw new Error('No se pudo cargar el personaje')
  }
  const datos = await respuesta.json()
  // La API devuelve un arreglo con un solo elemento, por eso se toma la posición 0
  return datos[0] || null
}
