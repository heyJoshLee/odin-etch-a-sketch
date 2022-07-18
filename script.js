const container = document.querySelector('#container');
const DEFAULT_NUMBER_OF_SQAURES_TO_MAKE = 16;
const SIZE_OF_BOARD = 960;
let squares;

function setUpSquares (numSquares) {
    for (i = 1; i <= numSquares; i++) {
        let newRow = document.createElement('div');
        container.append(newRow);

        const squareSize = Math.floor(SIZE_OF_BOARD / numSquares);
        for (j = 1; j <= numSquares; j++) {
            let newSquare = document.createElement('div');
            newSquare.classList.add('square');
            
            newSquare.style.width = `${squareSize}px`;
            newSquare.style.height = `${squareSize}px`;
            newSquare.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            newRow.append(newSquare);
        }
    }
}

function getSquares() {
    return (document.querySelectorAll('.square'));
}

function getUserChoice() {
    let sideLength = +prompt('How many sqares per side?');
    sideLength = sideLength.toFixed(0);
    while (sideLength > 100 || sideLength < 5 || isNaN(sideLength)) {
        sideLength = prompt('Please enter a number between 5 and 100');
    }
    return sideLength;
}

function addEventListenersToSquares() {
    squares = getSquares();
    squares.forEach(square => {
        square.addEventListener('mouseover', () => {
            let oldAlpha = getCurrentBackgroundAlphaChannel(square);
            // If the color is already black, don't do anything
            if (oldAlpha !== 1) {
                let newAlpha = oldAlpha += 0.10;
                let newBackgroundColor = `rgba(0, 0, 0, ${newAlpha})`;
                square.style.backgroundColor = newBackgroundColor;
            }
        });
    })
}

function getCurrentBackgroundAlphaChannel(square) {
    const currentBackgroundColor = square.style.backgroundColor;
    if (currentBackgroundColor === 'rgb(0, 0, 0)') { return 1; }
    let alphaChannel = currentBackgroundColor.split('rgba(0, 0, 0, ')[1].split('');
    alphaChannel.pop();
    alphaChannel = +(alphaChannel.join(''));
    return alphaChannel;
}

function clearBoard() {
    container.replaceChildren();
}

function setUpBoard() {
    clearBoard();
    setUpSquares(getUserChoice());
    addEventListenersToSquares();
}

function initialSetUp() {
    clearBoard();
    setUpSquares(DEFAULT_NUMBER_OF_SQAURES_TO_MAKE);
    addEventListenersToSquares();
    document.querySelector('#new-board-button').addEventListener('click', setUpBoard);
}

initialSetUp(); 