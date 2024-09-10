export default async function getFilm(id) {
    const res = await fetch(`http://localhost:8000/films/${id}`)
    const filmData = await res.json()
    const castRes = await Promise.all(filmData.characters.map((character) => fetch(character)))
    const castJson = await Promise.all(castRes.map((res) => res.json()))
    return { ...filmData, cast: castJson }
}