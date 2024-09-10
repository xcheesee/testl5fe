export default async function getFilms() {
    const res = await fetch('http://localhost:8000/films')
    const json = await res.json()
    return json.results
}