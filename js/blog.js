const apiKey = 'pk_live_3233d1d47c10c1659fa0dc70e5b1b88c';
const blogPostsContainer = document.getElementById("blogPosts");
const latestPostsContainer = document.getElementById("latestPostsContainer");
const trendingPostsContainer = document.getElementById("trendingPostsContainer");
const paginationContainer = document.getElementById("pagination");
const searchBar = document.getElementById("searchBar");

let currentPage = 1;
const postsPerPage = 4;
let posts = [];

// Fetch data from API with optional query parameter
async function fetchPosts(query = "animals") {
  const apiUrl = `https://partners.every.org/v0.2/${query ? 'search/' + query : 'browse/animals'}?apiKey=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    posts = data.nonprofits || [];
    displayPosts();
    setupPagination();
  } catch (error) {
    console.error("Error fetching data:", error);
    blogPostsContainer.innerHTML = "<p>Error fetching posts. Please try again.</p>";
  }
}

// Fetch latest posts (optional query for category)
async function fetchLatestPosts(query = "animals") {
  try {
    const response = await fetch(`https://partners.every.org/v0.2/search/${query}?apiKey=${apiKey}`);
    const data = await response.json();
    displayLatestPosts(data.nonprofits || []);
  } catch (error) {
    console.error("Error fetching latest posts:", error);
  }
}

// Fetch trending posts (mocked as most recent in this case)
async function fetchTrendingPosts(query = "animals") {
  try {
    const response = await fetch(`https://partners.every.org/v0.2/search/${query}?apiKey=${apiKey}`);
    const data = await response.json();
    displayTrendingPosts(data.nonprofits || []);
  } catch (error) {
    console.error("Error fetching trending posts:", error);
  }
}

// Display main blog posts
function displayPosts() {
  blogPostsContainer.innerHTML = '';
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const currentPosts = posts.slice(start, end);

  if (currentPosts.length === 0) {
    blogPostsContainer.innerHTML = "<p>No posts found.</p>";
    return;
  }

  currentPosts.forEach(post => createPostElement(post, blogPostsContainer));
}

// Display latest posts
function displayLatestPosts(latestPosts) {
  latestPostsContainer.innerHTML = '';
  latestPosts.slice(0, 3).forEach(post => createPostElement(post, latestPostsContainer));
}

// Display trending posts
function displayTrendingPosts(trendingPosts) {
  trendingPostsContainer.innerHTML = '';
  trendingPosts.slice(0, 3).forEach(post => createPostElement(post, trendingPostsContainer));
}

// Helper function to create post elements
function createPostElement(post, container) {
  const postElement = document.createElement("div");
  postElement.classList.add("blog-post");
  postElement.innerHTML = `
    <h2>${post.name}</h2>
    <p>${post.description || 'No description available.'}</p>
    <div class="api_card_img"> 
      <img src="${post.coverImageUrl}" alt="${post.name}"/>
    </div>
    <a target="_blank" href="${post.url || '#'}">Read More</a>
  `;
  container.appendChild(postElement);
}

// Set up pagination controls
function setupPagination() {
  paginationContainer.innerHTML = '';
  const totalPages = Math.ceil(posts.length / postsPerPage);

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
  const searchTerm = searchBar.value.trim();
  currentPage = 1;
  fetchPosts(searchTerm);
});

// Initialize default data
fetchPosts();
fetchLatestPosts();
fetchTrendingPosts();
