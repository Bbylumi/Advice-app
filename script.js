const adviceId = document.querySelector("#adviceid");
const adviceText = document.querySelector("#advicetext");
const btn = document.querySelector("#btn");

function getFact() {
  fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then((response) => response.json())
    .then((factData) => {
      
      adviceId.textContent = "Random Fact";
      adviceText.innerHTML = `<p>"${factData.text}"</p>`;
    })
    .catch((error) => {
      console.error("Error fetching random fact:", error);
      adviceText.innerHTML = `<p>Oops! Couldn't fetch a fact. Try again later.</p>`;
    });
}
 

btn.addEventListener("click", () => {
  getFact();
});
 

window.onload = () => {
  getFact();
};
