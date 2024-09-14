import "./style.css"
import { episodeRoman, episodePoster, episodeBGPoster } from "./constants";
import getFilm from "./api/getFilm";

const searchParams = new URLSearchParams(window.location.search);
const filmContainer = document.getElementById("film-container");

if(!searchParams.get("id")) {
    window.location.replace("/")
}

async function populateFilmDiv(id) {
    const spinner = document.createElement("span")
    spinner.classList.add("loader")
    filmContainer.appendChild(spinner)

    const filmData = await getFilm(id)

    filmContainer.removeChild(spinner)
    filmContainer.innerHTML = createFilmDiv(filmData)
}

function createFilmDiv(filmData) {
    const cast = document.createElement("div")

    cast.innerHTML = filmData.cast.reduce((curr, role) => (curr + `<span>${role.name}</span>`), "")
    const filmHTML = `
        <div style="position:relative;">
            <div class="main-content__bg">
                <img src="${episodeBGPoster[filmData.episode_id - 1]}" class="bg__poster">
            </div>
            <div class="main-content">
                <div class="poster-container poster-container__main"><img src="${episodePoster[filmData.episode_id - 1]}" class="poster"> </div>
                <div class="film__title">
                  <div class="film__title--text"> ${filmData.title} </div>
                  <div style="padding: 0 8px;">
                    <span class="film__title--ep">Episode ${episodeRoman[filmData.episode_id - 1]}</span>
                    <span>•</span>
                    <span class="film__title--release">${new Intl.DateTimeFormat('pt-BR').format(new Date(filmData.release_date))}</span>
                  </div>
                </div>
            </div>
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

        <div class="video__container">
          <iframe 
            style="position:relative;width:100%;height:100%;" 
            src="https://www.youtube.com/embed/vZ734NWnAHA?si=g4z38zdWYoYPcsQp" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
    `

    return filmHTML

}

populateFilmDiv(searchParams.get("id"));