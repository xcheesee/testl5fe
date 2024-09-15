export default async function postComment({ comment, filmId }) {
    const res = await fetch("http://localhost:8000/comments", {
        method: "POST",
        body: JSON.stringify({comment, film_id: filmId})
    })

    if(!res.ok) {
        throw new Error("Error Post");
    }

    return res;
}