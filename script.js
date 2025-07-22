const board = document.getElementById('board');

function makeRow() {
    const row = document.createElement('tr');

    for (let i = 0; i < 50; i++) {
        const newElement = document.createElement('td');
        row.appendChild(newElement);
    }
    board.appendChild(row)
}

function makeBoard(){
    for(let i = 0; i < 35; i++){
        makeRow();
    }
} 

makeBoard();