import './game.css';
import goblinImg from './img/goblin.png';

// создаём поле
const root = document.getElementById('game');

const board = document.createElement('div');
board.classList.add('board');
root.appendChild(board);

const cells = [];
const size = 4;

for (let i = 0; i < size * size; i += 1) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  board.appendChild(cell);
  cells.push(cell);
}

// создаём гоблина
const goblin = document.createElement('img');
goblin.src = goblinImg;
goblin.alt = 'Goblin';
goblin.classList.add('goblin');

let currentIndex = -1;

function moveGoblin() {
  let nextIndex = currentIndex;

  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * cells.length);
  }

  currentIndex = nextIndex;
  cells[currentIndex].appendChild(goblin);
}

// первый показ и интервал
moveGoblin();
setInterval(moveGoblin, 1000);
