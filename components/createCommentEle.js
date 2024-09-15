import { starWarsCharacters } from "../constants"
export default function createCommentEle(commentData, rnd, send, state) {
    const commentContainer = document.getElementById("comment__container")

    commentContainer.innerHTML = createCommentDiv(commentData, rnd, state)
    const sendBtn = document.getElementById("send-comment")
    sendBtn.addEventListener('click', send)

}

function createCommentDiv(commentData, rnd, state) {
  let comentarios;
  rnd.setState(state)
  if(!commentData || commentData.length == 0) {
    comentarios = "<div>Nenhum Comentario</div>"
  } else {
  comentarios = commentData?.reduce((curr, comment) => ( curr + `
      <div class="comment__text-container">
        <div class="comment__text">
          <div class="comment__text-user"><span style="font-weight:600;">${starWarsCharacters[rnd.intInRange(1, 58)]}</span> disse:</div>
          <p>${comment.comment}</p>
        </div>
      </div>
    `), "")
  }
  const commentHTML = `
    <div class="comment__title">Comentarios</div>
    ${comentarios}
    <div style="display:grid;gap:8px;">
      <div>Escrever Comentario:</div>
      <textarea id="comment-val" style="width:100%;resize:none;"></textarea>
      <button id="send-comment" style="width: 100%;">Enviar</button>
    </div>
  `

  return commentHTML
}