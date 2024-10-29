// script.js
const query = document.querySelector("#searchBar")
const apiKey = 'pk_live_3233d1d47c10c1659fa0dc70e5b1b88c';
const apiUrl = `https://partners.every.org/v0.2/browse/${query}?apiKey=${apiKey}`;
const blogPostsContainer = document.getElementById("blogPosts");
const paginationContainer = document.getElementById("pagination");
const searchBar = document.getElementById("searchBar");

let currentPage = 1;
const postsPerPage = 4;
let posts = [];
let filteredPosts = [];

// Fetch data from API
async function fetchPosts() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    posts = data.nonprofits;
    filteredPosts = posts;
    displayPosts();
    setupPagination();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Display posts on the page
function displayPosts() {
  blogPostsContainer.innerHTML = '';
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const currentPosts = filteredPosts.slice(start, end);

  if (currentPosts.length === 0) {
    blogPostsContainer.innerHTML = "<p>No posts found.</p>";
    return;
  }

  currentPosts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.classList.add("blog-post");
    postElement.innerHTML = `
      <h2>${post.name}</h2>
      <p>${post.description || 'No description available.'}</p>
      <div class="api_card_img"> 
        <img src=${post.coverImageUrl} alt=''/>
       
      </div>
      <a target="_blank" href=''> Read More</a>
    `;
    blogPostsContainer.appendChild(postElement);
  });
}

// Set up pagination controls
function setupPagination() {
  paginationContainer.innerHTML = '';
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.disabled = i === currentPage;
    button.addEventListener("click", () => {
      currentPage = i;
      displayPosts();
      setupPagination();
    });
    paginationContainer.appendChild(button);
  }
}

// Search functionality
searchBar.addEventListener("input", () => {
  const searchTerm = searchBar.value.toLowerCase();
  filteredPosts = posts.filter(post =>
    post.name.toLowerCase().includes(searchTerm) ||
    (post.description && post.description.toLowerCase().includes(searchTerm))
  );
  currentPage = 1;
  displayPosts();
  setupPagination();
});

// Initialize
fetchPosts();
