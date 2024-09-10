import "./style.css"

const searchParams = new URLSearchParams(window.location.search);
const filmContainer = document.getElementById("film-container");
const episodeRoman = ["I", "II", "III", "IV", "V", "VI"]

async function getFilm(id) {
  const spinner = document.createElement("span")
  spinner.classList.add("loader")
  filmContainer.appendChild(spinner)

  const res = await fetch(`http://localhost:8000/films/${id}`)
  const filmData = await res.json()
  const film = document.createElement("div")
  const cast = document.createElement("div")
  const castRes = await Promise.all(filmData.characters.map((character) => fetch(character)))
  const castJson = await Promise.all(castRes.map((res) => res.json()))
  cast.innerHTML = castJson.reduce((curr, role) => (curr + `<span>${role.name}</span>` ), "" )

  film.innerHTML = `
  <div class="film__title">
    <div class="film__title--text"> ${filmData.title} </div>
    <span class="film__title--ep">Episode ${episodeRoman[filmData.episode_id + 1]}</span>
    <span>•</span>
    <span class="film__title--release">${new Intl.DateTimeFormat('pt-BR').format( new Date(filmData.release_date) )}</span>
  </div>

  <div class="film__crawl">
    <div class="film__crawl--title">Sinopse</div>
    <div>${filmData.opening_crawl}</div>
  </div>

  <div class="film__people">
    <div><span class="film__people--header">Diretor:</span> ${filmData.director}</div>
    <div><span class="film__people--header">Produtor(es):</span> ${filmData.producer}</div>
    <div class="film__people--cast">
    <span class="film__people--header">Personagens:</span> <span class="cast--span">${cast.innerHTML}</span>
    </div>
  </div>
  `

  filmContainer.removeChild(spinner)
  filmContainer.innerHTML = film.innerHTML
}

getFilm(searchParams.get("id"));