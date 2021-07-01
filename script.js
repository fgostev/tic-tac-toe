
// For today:

// create an array object using factory function
// polish game board

// a board that returns game input

const gameBoard = (() => {
    let board = ["x", "o", "x", "o", "x", "o", "o", "x", "x"];
    const squares = document.getElementsByClassName("square");
    const squareArr = Array.from(squares);

    // add index and array to the grid
    for(i = 0; i < squareArr.length; i++){
        const square = squareArr[i];        
        const gameInput = document.createElement("span");
        gameInput.className = "gameInput";
        gameInput.id = i;
        square.appendChild(gameInput);

        gameInput.textContent = board[i];
    }

    

    // function test(){
    //     console.log('test');
    // }

    return { board };
})();

// display array





// pseudo on display logic!!! START HERE!!!
// function for displaying the correct value on the sqaures
// start with displaying an array

