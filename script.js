

// a board that returns game input

const gameBoard = (() => {
    let board = ["","","","","","","","",""];
    const squares = document.getElementsByClassName("square");
    const squareArr = Array.from(squares);


    // add index and array to the grid
    
    for(i = 0; i < squareArr.length; i++){
        const square = squareArr[i];  
        square.id = i;      
        square.textContent = board[i];
    }


    return { board, squareArr };
})();

const createPlayer = (name, figure) => {  
    return{ name, figure}

}



const game = (() => {


    
    const Player1 = createPlayer("Player1", "x");
    const Player2 = createPlayer("Player2", "o");

    let round = 1;

    function turn(){

        if(round % 2 === 0){
            this.textContent = Player2.figure;
            gameBoard.board.splice(this.id, 1, Player2.figure);
            this.disabled = true;
            player2Moves.push(parseInt(this.id));
            player2Moves.sort();
        }
        else{
            this.textContent = Player1.figure;
            gameBoard.board.splice(this.id, 1, Player1.figure);
            this.disabled = true;
            player1Moves.push(parseInt(this.id));
            player1Moves.sort();
        }
        gameWinner();
        round++;

            console.log("x" + " " + player1Moves);
            console.log("o" + " " + player2Moves);
        // indexCountTest();
    }


let player1Moves = [];
let player2Moves = [];

// array from player moves to compare with the win results

    function gameChecker(array1, array2){

        let newArr = [];
    
            array2.forEach(array2Val =>{
                
                array1.forEach(array1Val => {
                    if(array2Val === array1Val){
                        newArr.push(array2Val);
                    }else{
                        return newArr;
                    }
                })
            })
            return newArr;
    }

    // determine the winner
    
    let player1Win = false;
    let player2Win = false;
    let tie = false;
    
    function gameWinner(){

    const winner = document.getElementById("winner");
    
        const winningLines = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [5, 6, 7],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6]
                ]
    
        winningLines.forEach(line =>{
           if(gameChecker(line, player1Moves).length === 3){
            player1Win = true;
            winner.textContent = "Player 1 WIN!"
            }
            else if(gameChecker(line, player2Moves).length === 3){
                player2Win = true;
                winner.textContent = "Player 2 WIN!"
            }else if(player1Moves.length > 4 && player2Moves.length > 3){
                tie = true;
                winner.textContent = "TIE!"
            }

    })

}

// restart button

const restart = document.getElementById("restart");

function restartBoard(){
    console.log("test");
    gameBoard.board = ["","","","","","","","",""];
    player1Moves = [];
    player2Moves = [];
    player1Win = false;
    player2Win = false;
    tie = false;
    round = 1;

    gameBoard.squareArr.forEach(square =>{
        square.textContent = "";
        square.disabled = false;
    })
}

restart.addEventListener('click', restartBoard);

    gameBoard.squareArr.forEach(square => {
        square.addEventListener("click", turn)
    })


})();

// for today:
// restart button
// modal for winner
// modal for settings and player customization

