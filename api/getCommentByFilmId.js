export default async function getCommentByFilmId (filmId) {
    const res = await fetch("http://localhost:8000/comments/" + filmId);
    const json = await res.json()
    return json
}