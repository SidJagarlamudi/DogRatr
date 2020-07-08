function main() {
  function fetchPosts() {
    fetch("http://localhost:3000/posts")
      .then((resp) => resp.json())
      .then((posts) => console.log(posts));
  }
  fetchPosts();
}

main();
