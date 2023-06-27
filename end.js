const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value; // Can only save score if username field is filled in
})

saveHighScore = (e) => {
    //console.log("clickity clack");
    e.preventDefault(); // Prevents the form from changing the url

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    
    highScores.push(score); // Adding new score to our high score array
    highScores.sort( (a,b) => b.score - a.score ); // Sort has implicit return, so curly brackets and 'return' not needed
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem("highScores", JSON.stringify(highScores)); // Saving high scores to local storage

    window.location.assign("/highscores.html"); // Automatically going to highscore page upon saving score

//    console.log(highScores);
//    console.log(score);
}

// NOTES
// Local storage only uses key-value pairs with value being a string