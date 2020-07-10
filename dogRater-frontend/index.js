const formButton = document.getElementById("new-dog");
const form = document.querySelector(".form-container");
let addPost = false;
const postForm = document.querySelector(".post-container");
const likebutton = document.querySelector(".far fa-heart");

function fetchPosts() {
  fetch("http://localhost:3000/posts")
    .then((resp) => resp.json())
    .then((postsData) => createPostDivs(postsData))
    .catch((err) => console.log(err));
}
function createPostDivs(postsData) {
  postsData.forEach((postData) => createPostDiv(postData));
}
function createPostDiv(postData) {
  const comments = postData.comments
    .map((comment) => {
      return `<li>${comment.caption}</li>`;
    })
    .join("");

  const postContainer = document.querySelector(".post-container");
  const div = `
      <div class="post-container">
      <div class="post-card"> 
      <! -- this is the inner post section -->
      <div class="username-container">
        <! -- this is the username,icon section -->
        <p>
          <img
            id="icon"
            src="https://i.pinimg.com/originals/31/6b/d3/316bd38c20cb95f7bc51f0670a0b6309.jpg"
          />
          fake user
        </p>
      </div>
      <img
        id="image"
        src=${postData.img_url}
      />
      <p>${postData.caption}</p>
      <div class="likes-section">
        <! -- this is like section -->
        <button class="like-button"><i class="far fa-heart"data-id=${postData.id}></i></button>
        <span data-id=${postData.likes} class="likes">${postData.likes}</span>
      </div>
      <div class="comment-section">
        <! -- this is comments section -->
        <hr />
        <form class="comment-form">
          <input
            class="comment-input"
            type="text"
            name="comment"
            placeholder=""
          />
          <button class="comment-button">
            <i class="far fa-comment"></i>
          </button>
        </form>
        <ul >
        ${comments}
        </ul>
      </div>
      </div>
      </div>
      `;
  postContainer.innerHTML += div;
}

fetchPosts();
function toggleForm() {
  addPost = !addPost;
  form.style.display = addPost ? "block" : "none";
}
//////////////////////////////////////////////NEW POST
function submitNewPost() {
  event.preventDefault();
  const caption = event.target.caption.value;
  const img_url = event.target.img_url.value;
  newPost(caption, img_url);
  event.target.reset();
}
function newPost(caption, img_url) {
  fetch("http://localhost:3000/posts", postObj(caption, img_url))
    .then((resp) => resp.json())
    .then((postData) => createPostDiv(postData))
    .catch((err) => console.log(err));
}

function postObj(caption, img_url) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      caption: caption,
      img_url: img_url,
    }),
  };
}

function toggleForm() {
  addPost = !addPost;
  form.style.display = addPost ? "none" : "block";
}

formButton.addEventListener("click", toggleForm);
form.addEventListener("submit", submitNewPost);

///////////////////////////////////////LIKE

function renderNewLike() {
  if (event.target.tagName === "I") {
    likePostFrontend();
    likePostBackend();
  }
}
function likePostFrontend() {
  const likes = event.target.parentElement.parentElement.children[1];
  const likesNum = parseInt(likes.innerHTML);
  likes.innerHTML = `${likesNum + 1}`;
}
function likePostBackend() {
  fetch("http://localhost:3000/posts", patchObj())
    .then((resp) => resp.json())
    .then((postData) => console.log(postData))
    .catch((err) => console.log(err));
}

function patchObj() {
  const likesString = event.target.parentElement.parentElement.children[1];
  const likes = parseInt(likesString.innerHTML);
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: likes,
    }),
  };
}

postForm.addEventListener("click", renderNewLike);
