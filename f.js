import "./style.css"
import getFilm from "./api/getFilm";
import getCommentByFilmId from "./api/getCommentByFilmId";
import postComment from "./api/postComment";
import Srand from 'seeded-rand'
import createFilmEle from "./components/createFilmEle";
import createCommentEle from "./components/createCommentEle";

const filmId = new URLSearchParams(window.location.search).get("id")
const filmContainer = document.getElementById("film-container");
const commentContainer = document.getElementById("comment__container")

if(!filmId) {
    window.location.replace("/")
}

const rnd = new Srand((+filmId)+432489231921+(+filmId));
const state = rnd.getState();

async function loadFilm(id) {
    const spinner = document.createElement("span")
    spinner.classList.add("loader")
    filmContainer.appendChild(spinner)

    const filmData = await getFilm(id)

    filmContainer.removeChild(spinner)
    createFilmEle(filmData)
}

async function loadComments(id, rnd) {
    const spinner = document.createElement("span")
    spinner.classList.add("loader")
    commentContainer.appendChild(spinner)

    const commentData = await getCommentByFilmId(id)

    commentContainer.removeChild(spinner)
    createCommentEle(commentData, rnd, () => sendComment(id), state)
}

async function sendComment (filmId) {
  const comment = document.getElementById('comment-val')
  const res = await postComment({comment: comment.value, filmId})
  if(!res.ok) {
    throw new Error("Error Post")
  }
  loadComments(filmId, rnd);
}

loadFilm(filmId);
loadComments(filmId, rnd);
