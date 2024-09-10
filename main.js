import './style.css'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

const episodeRoman = ["I", "II", "III", "IV", "V", "VI"]

async function getFilms () {
  const filmContainer = document.getElementById('list-container')
  const spinner = document.createElement("span")
  spinner.classList.add("loader")
  filmContainer.appendChild(spinner)
  const res = await fetch('http://localhost:8000/films')
  const json = await res.json()
  const films = json.results.map((film, i) => {
    const ele = document.createElement('div')
    ele.classList.add("movie")
    ele.innerHTML = `
    <a class="movie__title" href="/film?id=${i+1}">${film.title}</a>
    <span class="movie__ep">Episode ${episodeRoman[film.episode_id - 1]}</span>
    <span class="movie__release">${new Intl.DateTimeFormat('pt-BR').format( new Date(film.release_date) )}</span>
    `
    return ele
  })
  filmContainer.removeChild(spinner)
  films.forEach((film) => {
    filmContainer.appendChild(film)
  })
}

getFilms()