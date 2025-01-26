const adviceId = document.querySelector("#adviceid");
const adviceText = document.querySelector("#advicetext");
const btn = document.querySelector("#btn");
const stars = document.querySelectorAll('.star');
const ratingText = document.querySelector('.rating-text');

let currentFactId = null; // Track the current fact's ID

// Fetch a random fact
function getFact() {
  // Add rolling animation to the dice button
  btn.classList.add('rolling');

  fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then((response) => response.json())
    .then((factData) => {
      // Update the fact text and ID
      adviceId.textContent = "Random Fact";
      adviceText.innerHTML = `<p>"${factData.text}"</p>`;

      // Reset the rating stars
      resetStars();

      // Remove the rolling animation after the fact is fetched
      setTimeout(() => {
        btn.classList.remove('rolling');
      }, 500); // Match this duration with the animation duration
    })
    .catch((error) => {
      console.error("Error fetching random fact:", error);
      adviceText.innerHTML = `<p>Oops! Couldn't fetch a fact. Try again later.</p>`;
      btn.classList.remove('rolling'); // Stop the animation if there's an error
    });
}

// Add event listeners to stars for rating
stars.forEach((star) => {
  star.addEventListener('click', () => {
    const value = star.getAttribute('data-value');
    rateFact(currentFactId, value); // Rate the current fact
    highlightStars(value); // Highlight stars up to the selected one
  });
});

// Function to highlight stars
function highlightStars(value) {
  stars.forEach((star) => {
    if (star.getAttribute('data-value') <= value) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

// Function to rate a fact
function rateFact(factId, rating) {
  // Store the rating (e.g., in local storage or send to a backend)
  const ratings = JSON.parse(localStorage.getItem('ratings')) || {};
  ratings[factId] = rating;
  localStorage.setItem('ratings', JSON.stringify(ratings));

  // Update the rating text
  ratingText.textContent = `You rated this fact: ${rating} star(s)`;
}

// Function to reset stars
function resetStars() {
  stars.forEach((star) => star.classList.remove('active'));
  ratingText.textContent = 'Rate this fact:';
}

// Fetch a new fact when the dice button is clicked
btn.addEventListener("click", () => {
  getFact();
});

// Fetch a fact when the page loads
window.onload = () => {
  getFact();
};
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check for saved user preference in localStorage
const savedMode = localStorage.getItem('theme');
if (savedMode === 'white') {
    body.classList.add('white');
    darkModeToggle.textContent = '🌙'; // Moon icon for white mode
} else {
    body.classList.remove('white');
    darkModeToggle.textContent = '☀️'; // Sun icon for dark mode
}

// Toggle between dark and white modes
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('white');
    const isWhiteMode = body.classList.contains('white');

    // Save user preference in localStorage
    if (isWhiteMode) {
        localStorage.setItem('theme', 'white');
        darkModeToggle.textContent = '🌙'; // Moon icon for white mode
    } else {
        localStorage.setItem('theme', 'dark');
        darkModeToggle.textContent = '☀️'; // Sun icon for dark mode
    }
});
