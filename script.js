

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


    let player1Moves = [];
    let player2Moves = [];

    // FIGURE OUT HOW TO COMPARE THE MOVES TO THE WINS!!!

    function turn(){

        if(round % 2 === 0){
            this.textContent = Player2.figure;
            gameBoard.board.splice(this.id, 1, Player2.figure);
            this.disabled = true;
            player2Moves.push(this.id);
            player2Moves.sort();
        }
        else{
            this.textContent = Player1.figure;
            gameBoard.board.splice(this.id, 1, Player1.figure);
            this.disabled = true;
            player1Moves.push(this.id);
            player1Moves.sort();
        }

        round++;

            console.log("x" + " " + player1Moves);
            console.log("o" + " " + player2Moves);
        // indexCountTest();
    }


    gameBoard.squareArr.forEach(square => {
        square.addEventListener("click", turn)
    })


})();


// function testArr(){

//     const winningLines = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [5, 6, 7],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6]
//     ]

//     let countTrue = 0;
//     let arr2 = [0,1,2];

//     winningLines.forEach(line =>{

//         // console.log(line);

//         line.forEach(ele =>{f
//             if(line[ele] === arr2[ele]){
//                         countTrue++;
//                     }
//         })
//     })

//     console.log(countTrue);

// }
// testArr();

// check every

// if for array first element doesn't equals second array and length is longer - remove first index


let win = null;

// function to compare arrays



// function testArr(){

//         const winningLines = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [5, 6, 7],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6]
//     ]

//     // if winning line is less then the players length add "" and sort both of them so they match?
//     // how to check if number doesn't matches?

 
//     let b = [2, 4, 6]; 
//     let newArr = [];


//         winningLines.forEach((line) => {

//             if(equals(line, b))
//                 console.log(true);
//         })
//     };

// // figure out a way to check arrays longer then 3.

// // Try to remove not matching numbers to get the same length?


function brainStorm(){
    const a = [0, 2, 4];
    const b = [0, 2, 4];

    // this is the representation of gameboard array
    const c = [0, 1, 2];

    // representation of the possible win result
    let newArr = [];


const equals = (array1, array2) =>
    array1.every((v, i) => v === array2[i]);    

        c.forEach(valC =>{
            
            a.forEach(valA => {
                if(valC === valA){
                    newArr.push(valC);
                }else{
                    return newArr;
                }
            })
        })
    // console.log(newArr);
        return {newArr};
    console.log(equals(a, newArr))
}





// const equals = (array1, array2) =>
//     array1.length === array2.length && array1.every((v, i) => v === array2[i]);