import './style.css'
import { episodeRoman } from './constants.js'
import getFilms from './api/getFilms.js'


async function populateFilmsDiv() {
  const filmContainer = document.getElementById('list-container')

  const spinner = document.createElement("span")
  spinner.classList.add("loader")
  filmContainer.appendChild(spinner)

  const films = await getFilms()
  const filmsDiv = films.map((film, i) => createFilmDiv(film, i))

  filmContainer.removeChild(spinner)

  filmsDiv.forEach((film) => {
    filmContainer.appendChild(film)
  })
}

function createFilmDiv(film, index) {
  const ele = document.createElement('div')
  ele.classList.add("movie")
  ele.innerHTML = `
    <a class="movie__title" href="/film?id=${index + 1}">${film.title}</a>
    <span class="movie__ep">Episode ${episodeRoman[film.episode_id - 1]}</span>
    <span class="movie__release">${new Intl.DateTimeFormat('pt-BR').format(new Date(film.release_date))}</span>
  `
  return ele

}

populateFilmsDiv()