const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole;
let score = 0;
let timeUp = false;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes){
    const idx= Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if(hole===lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep(){
    const time = randomTime(500,1500);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(()=>{hole.classList.remove('up');if(!timeUp){peep()}},time);
}

function startGame() {
    scoreBoard.textContent =0;
    timeUp=false;
    score=0;
    peep();
    setTimeout(()=>{timeUp=true},20000);
}

function whack(e){
  if(!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent=score;
}

moles.forEach(mole=>mole.addEventListener('click',whack))
