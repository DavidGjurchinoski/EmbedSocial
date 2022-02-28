let postArray = [];
let displayedPostsArray = [];

let loadButton = document.getElementById("loadMoreButton");
let postsWrap = document.getElementsByClassName("wrap")[0];
let likeButton = document.getElementsByClassName("likeImg");

fetch("../assets/data.json")
  .then((data) => data.json())
  .then((data) => {
    for (let post of data) {
      post.isLiked = false;
      postArray.push(post);
    }
    displayFourPosts(postArray);
  })
  .catch((error) => {
    alert("data.json not found!");
  });

function displayFourPosts(posts) {
  for (let i = 0; i < 4; i++) {
    displayedPostsArray.push(posts[displayedPostsArray.length]);
  }
  if (posts.length <= displayedPostsArray.length)
    loadButton.style.display = "none";
  displayPosts(displayedPostsArray);
}

function displayPosts(posts) {
  postsWrap.innerHTML = "";
  for (let index in posts) {
    postsWrap.innerHTML += `
    <div class="card">
        <img
          src="${posts[index].profile_image}"
          alt="Profile Img"
          class="profileImg"
        />
        <h4 class="profileName">${posts[index].name}</h4>
        <p class="postDate">${posts[index].date}</p>
        <a class="igLogo" href="${posts[index].source_link}">
        <img src="${
          posts[index].source_type === "instagram"
            ? "../assets/instagram-logo.svg"
            : "../assets/facebook.svg"
        }" alt="Source Img" />
        </a>
        <img class="postImg" src="${posts[index].image}" alt="Post Img" />
        <p class="postDesc">
          ${posts[index].caption}
        </p>
        <div class="hr"></div>
        <img type="button" style="background-color: ${
          posts[index].isLiked ? "red" : "white"
        }" onclick="like(${index})" src="../assets/heart.svg" class="likeImg" alt="Like Img" />
        <p class="likeCounter">${posts[index].likes}</p>
      </div>
    `;
  }
}

loadButton.addEventListener("click", () => {
  displayFourPosts(postArray);
});

function like(indexOfPost) {
  if (postArray[indexOfPost].isLiked) {
    displayedPostsArray[indexOfPost].likes--;
  } else {
    displayedPostsArray[indexOfPost].likes++;
  }
  postArray[indexOfPost].isLiked = !postArray[indexOfPost].isLiked;
  displayPosts(displayedPostsArray);
}
