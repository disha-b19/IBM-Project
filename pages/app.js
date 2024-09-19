// Function to load HTML content into a specified element
function loadHTML(url, elementId) {
  fetch(`pages/${url}`) // Adjusted path
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok for ${url}: ${response.statusText}`
        );
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
      if (elementId === "header") {
        setupMenuToggle(); // Ensure toggle function is initialized after header is loaded
      }
    })
    .catch((error) =>
      console.error(`Error loading HTML for ${elementId}:`, error)
    );
}

// Initialize header and footer once the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header.html", "header");
  loadHTML("footer.html", "footer");

  // Fetch tools template
  fetch("pages/tool.html") // Corrected the path
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok for tool.html: ${response.statusText}`
        );
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("tool").innerHTML = data;
    })
    .catch((error) => console.error("Error fetching tool template:", error));
});

// Function to set up menu toggle
function setupMenuToggle() {
  const menuToggle = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
}
