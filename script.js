

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
    
    return { board, squareArr};
})();

const createPlayer = (name, figure) => {  
    return{ name, figure}

}



const game = (() => {

    const Player1 = createPlayer("You", "x");
    const Player2 = createPlayer("Player 2", "o");

    let round = 1;


    function displayBoard(){
        for(i = 0; i < gameBoard.squareArr.length; i++){
            const square = gameBoard.squareArr[i];  
            square.id = i;      
            square.textContent = gameBoard.board[i];
        }
    }

    // function turn(){



    // function randomAi(){

    // }
    let player1Moves = [];
    let player2Moves = [];

    function turn(){

        if(Player2.name === "Machine")
        {

        gameBoard.board.splice(this.id, 1, Player1.figure);
        this.disabled = true;

        let possibleMoves = [];
        for( let i = 0; i < gameBoard.board.length; i++){
            if(gameBoard.board[i] === ""){
                possibleMoves.push(i);
            }
        }
        let randomIndex = Math.floor(Math.random() * possibleMoves.length);
        if(player1Moves.length < 4){
            gameBoard.board.splice(possibleMoves[randomIndex], 1, Player2.figure);
            gameBoard.squareArr[possibleMoves[randomIndex]].disabled = true;
        }

        
        trackPlayerMoves();
        // console.log(player2Moves);
        // console.log(player1Moves);
        // console.log("Possible move" + " " + possibleMoves);
        // console.log("Chosen move" + " " + possibleMoves[randomIndex]);
        // console.log("player1" + " " + player1Moves);
        // console.log("player2" + " " + player2Moves);

        gameWinner();
        round++;
    }else {
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
}


//  track player moves

function trackPlayerMoves(){

    gameBoard.board.forEach((val, idx) => {
        if(val === "x" && !player1Moves.includes(idx)){
            player1Moves.push(idx);
            player1Moves.sort();
        }else if(val === "o" && !player2Moves.includes(idx)){
            player2Moves.push(idx);
            player2Moves.sort();
        }
    })    
    displayBoard();
}




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
                    [6, 7, 8],
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

    console.log(player1Moves);
    console.log(player2Moves);
    
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
    } else if(!(player2Win === true && player1Win === true ) && player1Moves.length > 3  || player2Moves.length > 3){
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
    if(player1Input.value !== ""){
        Player1.name = player1Input.value;
    }
});

// call setting btn

const settingsBtn = document.getElementById("settings")
settingsBtn.addEventListener('click', function(){
    closeModal(gameBoardContainer);
    modalSettings.style.display = "flex";
});

// player selection

const ai2Btn = document.getElementById("ai2");

const player1Input = document.getElementById('player1');
const player2Btn = document.getElementById('player2');


ai2Btn.addEventListener('click', active2Ai);
player2Btn.addEventListener('click', active2Player);

function active2Ai(){
    player2Btn.style.color = 'rgba(255, 255, 255, 0.905)';
    ai2Btn.style.color = 'rgb(73, 6, 6)';
    Player2.name = "Machine";
    console.log(Player2.name);
}

function active2Player(){
    player2Btn.style.color = 'rgb(73, 6, 6)';
    ai2Btn.style.color = 'rgba(255, 255, 255, 0.905)';
    Player2.name = "Player 2";
    console.log(Player2.name);
}

})();

