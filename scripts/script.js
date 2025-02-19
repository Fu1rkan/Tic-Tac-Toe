let fields = [
    null, null, null,
    null, null, null,
    null, null, null
];

let currentPlayer = 'circle';
let gameOver = false;

function render() {
    let html = '<table id="gameBoard">';
    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let value = fields[index];
            let content = '';

            if (value === 'circle') {
                content = generateCircleSVG();
            } else if (value === 'cross') {
                content = generateCrossSVG();
            }

            html += `<td onclick="handleClick(${index}, this)">${content}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    document.getElementById('content').innerHTML = html;
    updatePlayerIndicator();
}

function handleClick(index, element) {
    if (fields[index] !== null || gameOver) return;
    
    fields[index] = currentPlayer;
    element.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
    element.onclick = null;
    
    const winningCombination = checkWin();
    if (winningCombination) {
        gameOver = true;
        drawWinningLine(winningCombination);
        return;
    }
    
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    updatePlayerIndicator();
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return combination;
        }
    }
    return null;
}

function drawWinningLine(winningCombination) {
    const gameBoard = document.getElementById('gameBoard');
    const firstCell = gameBoard.rows[Math.floor(winningCombination[0] / 3)].cells[winningCombination[0] % 3];
    const lastCell = gameBoard.rows[Math.floor(winningCombination[2] / 3)].cells[winningCombination[2] % 3];
    const firstRect = firstCell.getBoundingClientRect();
    const lastRect = lastCell.getBoundingClientRect();
    
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.background = 'white';
    line.style.height = '5px';
    line.style.transformOrigin = 'left center';
    line.style.width = `${Math.sqrt((lastRect.x - firstRect.x) ** 2 + (lastRect.y - firstRect.y) ** 2)}px`;
    line.style.transform = `rotate(${Math.atan2(lastRect.y - firstRect.y, lastRect.x - firstRect.x)}rad)`;
    line.style.left = `${firstRect.x + firstRect.width / 2}px`;
    line.style.top = `${firstRect.y + firstRect.height / 2}px`;
    line.style.pointerEvents = 'none';
    
    document.body.appendChild(line);
}

function updatePlayerIndicator() {
    document.getElementById('circle-indicator').style.opacity = currentPlayer === 'circle' ? '1' : '0.3';
    document.getElementById('cross-indicator').style.opacity = currentPlayer === 'cross' ? '1' : '0.3';
}

function generateCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#00B0EF" stroke-width="8"
                    stroke-dasharray="251.2" stroke-dashoffset="251.2">
                <animate attributeName="stroke-dashoffset" from="251.2" to="0" dur="500ms" fill="freeze"/>
            </circle>
        </svg>
    `;
}

function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="20" x2="80" y2="80" stroke="red" stroke-width="8" stroke-dasharray="84.85" stroke-dashoffset="84.85">
                <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur="500ms" fill="freeze"/>
            </line>
            <line x1="80" y1="20" x2="20" y2="80" stroke="red" stroke-width="8" stroke-dasharray="84.85" stroke-dashoffset="84.85">
                <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur="500ms" fill="freeze"/>
            </line>
        </svg>
    `;
}

function resetGame() {
    fields = [
        null, null, null,
        null, null, null,
        null, null, null
    ];
    currentPlayer = 'circle';
    gameOver = false;
    document.querySelectorAll('div').forEach(div => {
        if (div.style.background === 'white') {
            div.remove();
        }
    });
    render();
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("button").onclick = resetGame;
    updatePlayerIndicator();
});

render();