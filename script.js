

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

    // let round = 1;

    // gameBoard.squareArr.forEach(square => {
    //     square.addEventListener("click", () =>{
    //         Player1.turn();
    //     })
    // })
    let round = 1;


    function turn(){

        if(round % 2 === 0){
            this.textContent = Player1.figure;
            gameBoard.board.splice(this.id, 1, Player1.figure);
            this.disabled = true;
        }
        else{
            this.textContent = Player2.figure;
            gameBoard.board.splice(this.id, 1, Player2.figure);
            this.disabled = true;
        }

        console.log(gameBoard.board);
        console.log(this)

        round++;
        console.log(round);
    }


    gameBoard.squareArr.forEach(square => {
        square.addEventListener("click", turn)
    })


    // function test(){
    //     Player1.turn();
    // }


})();