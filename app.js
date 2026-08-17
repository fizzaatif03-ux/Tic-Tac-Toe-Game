let blocks = document.querySelectorAll(".block");
let resetbtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-game"); 
let msgContainer = document.querySelector(".msg_container"); 
let msg = document.querySelector(".msg_container p"); 

let turnO = true;

const winPatterns = [
  [0, 1, 2], [0, 3, 6], [0, 4, 8],
  [1, 4, 7], [2, 5, 8], [2, 4, 6],
  [3, 4, 5], [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  blocks.forEach((block) => {
    block.innerText = "";
    block.disabled = false;
    block.style.color = "black";
  });
  
  // 1. Winner message ko hide karega
  msgContainer.classList.add("hidden"); 

  // 2. Screen ko automatic smooth scroll karke top par le jayega
  window.scrollTo({
    top: 0,
    behavior: "smooth" // Isse jhatke se nahi, smoothly scroll up hoga
  });
};

const showwinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hidden");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = blocks[pattern[0]].innerText;
    let pos2 = blocks[pattern[1]].innerText;
    let pos3 = blocks[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showwinner(pos1);
        blocks.forEach((block) => (block.disabled = true));
        return;
      }
    }
  }
};

blocks.forEach((block) => {
  block.addEventListener("click", () => {
    if (block.innerText !== "") return;

    if (turnO) {
      block.innerText = "O";
      block.style.color = "white"; 
      turnO = false;
    } else {
      block.innerText = "X";
      block.style.color = "yellow"; 
      turnO = true;
    }

    block.style.fontSize = "40px";
    block.disabled = true;

    checkWinner();
  });
});

resetbtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);