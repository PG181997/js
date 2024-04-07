console.log('etch a sketch works');
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');

const MOVE_AMOUNT = 50;
//setup our canvas for drawing
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

// const width = canvas.width;
// const height = canvas.height;


const{width, height} = canvas;  //make a var height and width from the same properties on our canvs
console.log(width, height)

let x = Math.floor(Math.random() * width)
let y = Math.floor(Math.random() * height)
//create a random x and y starting points on the canvas

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath();//start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

//write a draw function

function draw({key}){
    hue += 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    console.log(key);
    ctx.beginPath();
    ctx.moveTo(x, y);

    //move our x and y val depending upone what user did

    switch(key){
        case 'ArrowUp': y -= MOVE_AMOUNT;
        break;

        case 'ArrowRight': x += MOVE_AMOUNT;
        break;
        
        case 'ArrowDown': y += MOVE_AMOUNT;
        break;
        
        case 'ArrowLeft': x -= MOVE_AMOUNT;
        break; 
        

        default:break;
    }
    ctx.lineTo(x, y);
    ctx.stroke(); 
}

//write a handler for the keys
function handleKey(event){
    //event.preventDefault();
    if (event.key.includes('Arrow')){
        draw({key:event.key});
        // console.log(event.key);
        // console.log('HANDEL KEY');
    }
}

//clear .shke function
function clearCanvas(){
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener('animationend', function(){
        console.log('shake');
        canvas.classList.remove('shake');
    }, {once:true})
}

//listen for arrow keys
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas)