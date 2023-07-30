// game constansts

let inputDir= {x:0 ,y:0}
let foodSound = new Audio('./utils/food.mp3');
let lastPaintTime = 0;
let speed = 7;
let score = 0;
let snakearr = [
    {
        x:13 , y:15
    }
]
let food = {x:7 ,y:5}



// game functions
function main(ctime){
  window.requestAnimationFrame(main);
  if((ctime - lastPaintTime)/1000<1/speed)
   {
    return ;
   }
  lastPaintTime = ctime;
  gameEngine();
//   console.log(ctime);


}

//highscore functionality
//  let hiscoreval;
// let hiscore = localStorage.getItem("hiscore");
// if(hiscore === null){
//      hiscore = 0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscore))
// }
// else{
//       hiscoreval = JSON.parse(hiscore);
//     highscoreBox.innerHTML = "HiScore: " + hiscore;
// }



function isCollide(snake){
//  if you bump into yourself
for(let i= 1;i<snakearr.length;i++)
{
   if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
   {
    
    return true;
   }
}
   if(snake[0].x >=18 ||snake[0].x <=0 || snake[0].y>=18 || snake[0].y<=0 )
   {
    return true;
   }
   return false;

}
function gameEngine(){
    // updating the snake arary and food
  if(isCollide(snakearr)){
    inputDir =  {x:0 ,y:0}
    alert("game over! please press any key to play again ");
    snakearr = [{x:13 ,y:15}];
    score = 0;
  }
  if(snakearr[0].x === food.x && snakearr[0].y === food.y)
  {
    foodSound.play();
    score+=1;
    // if(score>hiscoreval){
    //     let hiscoreval = score;
    //     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
    //     highscoreBox.innerHTML = "High Score: " + hiscoreval;
    // }
    scoreBox.innerHTML = " Score : "+score;
    snakearr.unshift({x: snakearr[0].x + inputDir.x , y: snakearr[0].y + inputDir.y});
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b-a)*Math.random()),y: Math.round(a + (b-a)*Math.random())};

  
  }
  for(let i =snakearr.length - 2; i>=0;i--)
  {
      snakearr[i+1] = {...snakearr[i]};
  }
  snakearr[0].x += inputDir.x;
  snakearr[0].y +=inputDir.y;








     


    // display food
    board.innerHTML = "";
    snakearr.forEach((e,index)=>{
        snakeElement  = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0)
        {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('snakefood');
    board.appendChild(foodElement);
}







// mainlogic
window.requestAnimationFrame(main);
window.addEventListener('keydown' , (e)=>{
      inputDir = {x: 0 ,y:1}
    switch(e.key)
    {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;

    }
})