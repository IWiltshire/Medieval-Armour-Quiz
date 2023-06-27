const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const noscores = document.getElementById("no-score");
const final = document.getElementById("finalScores");

if (highScores.length == 0) {
    noscores.classList.remove("hidden");
    final.classList.add("hidden");
};

highScoresList.innerHTML = 
    highScores.map( score => { // .map takes an array and converts it into another array
        return `<li class="high-score">${score.name}-${score.score}</li>`; // Writing html inside of javascript
    })
    .join(""); // Putting the array into a single string for use in html

// NOTES
// Local storage is not secure