const cells = Array.from(document.querySelectorAll(".cell"));
const enemyCells = cells.slice(0, 30);
const playerCells = cells.slice(30);
const scoreDisplay = document.querySelector(".score");
const highScoreDisplay = document.querySelector(".high-score");

let highScore = 0

let dropCount, speed, score;

reset();

document.addEventListener("keydown", e => {
    if (!dropCount) {
        startGame();
    }

    const player = document.querySelector(".player");

    if (e.key === "ArrowRight" && playerCells.includes(player.parentElement.nextElementSibling)) {
        player.parentElement.nextElementSibling.appendChild(player);
    }

    if (e.key === "ArrowLeft" && playerCells.includes(player.parentElement.previousElementSibling)) {
        player.parentElement.previousElementSibling.appendChild(player);
    }
});

function reset() {
    dropCount = 0;
    speed = 1000;
    score = 0;
    scoreDisplay.innerHTML = "0";
    highScoreDisplay.innerHTML = highScore || 0;
    

    cells.forEach(cell => cell.innerHTML = "");
    playerCells[1].innerHTML = '<div class="player"></div>';
}

function startGame() {
    reset();
    loop();
    console.log(highScore);
}

function loop() {
    let stopGame = false;

    for (let i = enemyCells.length - 1; i >= 0; i--) {
        const cell = enemyCells[i];
        const nextCell = cells[i + 3];
        const enemy = cell.children[0];

        if (!enemy) {
            continue;
        }

        nextCell.appendChild(enemy);

        if (playerCells.includes(nextCell)) {
            if (nextCell.querySelector(".player")) {
                stopGame = true;
            } else {
                score++;
                speed = Math.max(100, speed - 25);
                scoreDisplay.innerHTML = score;
                enemy.remove();
            }
        }
    }

    // Even drop count, add new enemy
    if (dropCount % 2 === 0) {
        const position = Math.floor(Math.random() * 3);

        enemyCells[position].innerHTML = '<div class="enemy"></div>';
    }

    if (stopGame) {
        if (score > highScore) {
            updateHighScore(score);
            alert("New high score! You scored " + score + ". Close this window to play again.");
        } else {
            alert("You scored " + score + ". Close this window to play again.");
        }
        reset();
    } else {
        dropCount++;
        setTimeout(loop, speed);
    }

    function updateHighScore(score) {
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.innerHTML = highScore;
            //saveHighScore();
        }
    }

    function saveHighScore() {
        localStorage.setItem("highScore", highScore);
    };

}