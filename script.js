

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


    
    const Player1 = createPlayer("Player 1", "x");
    const Player2 = createPlayer("Player 2", "o");

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
            openModal(Player1.name);
            }
            else if(gameChecker(line, player2Moves).length === 3){
                player2Win = true;
                openModal(Player2.name);
            }else if(player1Moves.length > 4 && player2Moves.length > 3){
                tie = true;
                openModal();
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

// win message


const modalWin = document.getElementsByClassName("modalWin")[0];

function openModal(player){
    modalWin.style.display = 'block';
    const h3 = document.getElementById("winner");
    const p = document.getElementById("trophy");
    trophy = p.children[0];
    if(player2Win === true || player1Win === true){
        h3.textContent = `${player} won!`;
        trophy.className = "fas fa-trophy";
    } else{
        h3.textContent = "TIE!"
        trophy.className = "fas fa-equals";
    }
}


function closeModal(selectedModal){
    selectedModal.style.display = 'none';
}
function clickOutside(e){
    if(e.target == modalWin){
        modalWin.style.display = 'none';
    }
}



window.addEventListener('click', clickOutside);

const closeBtn = document.getElementById('closeBtn');
closeBtn.addEventListener('click', function(){
    closeModal(modalWin)
});

const tryAgainBtn = document.getElementById('tryagain');

tryAgainBtn.addEventListener('click', () =>{
    restartBoard();
    closeModal(modalWin);
});


// settings

function test(){
    console.log("test")
}
const modalSettings = document.getElementsByClassName("settings")[0];
const gameBoardContainer = document.getElementsByClassName("gameboard")[0];

const goBtn = document.getElementById('go');
goBtn.addEventListener('click', function(){
    closeModal(modalSettings);
    gameBoardContainer.style.display = "grid";
});

// call setting btn

const settingsBtn = document.getElementById("settings")
settingsBtn.addEventListener('click', function(){
    closeModal(gameBoardContainer);
    modalSettings.style.display = "flex";
});


})();

// for today:
// modal for winner
// modal for settings and player customization

