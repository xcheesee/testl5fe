import { episodeBGPoster, episodePoster, episodeRoman, episodeTrailer } from "../constants"
import toggleVideoPlaybackPopup from "../utils/toggleVideoPlaybackPopup"
export default function createFilmEle(filmData) {

    const filmContainer = document.getElementById("film-container");
    filmContainer.innerHTML = createFilmDiv(filmData)
    const videoBtn =  document.getElementById("video__button")
    const videoContainer = document.getElementById("v-container")
    const closeBtn = document.getElementById("c-btn")
    const video = document.getElementById("vid")
    videoBtn?.addEventListener('click', () => {
      toggleVideoPlaybackPopup(videoContainer)
    })
    closeBtn?.addEventListener('click', () => {
      const videoSrc = video.src;
      video.src = videoSrc;
      toggleVideoPlaybackPopup(videoContainer)
    })
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
                  <button id="video__button">
                    <div style="font-size:1rem;">Assistir Trailer</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.14v14l11-7z"/></svg>
                  </button/></div>
                <div>
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

        <div id="v-container" class="video__container video__container-hidden">
          <div style="justify-self:end;padding:4px 8px;display:flex;justify-content:center;">
            <button class="close-btn" id="c-btn"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>
            </button>
          </div>
          <iframe 
            id="vid"
            style="position:relative;width:80%;height:80%;" 
            src="${episodeTrailer[filmData.episode_id - 1]}" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
    `


    return filmHTML

}