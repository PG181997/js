console.log('it works')
const video = document.querySelector(`.webcam`);

const canvas  = document.querySelector(`.video`);
const ctx = canvas.getContext(`2d`);


const faceCanvas  = document.querySelector(`.face`);
const faceCtx = faceCanvas.getContext(`2d`);

const SIZE = 10;
const SCALE = 1.2

const faceDetector = new window.FaceDetector();
// console.log(video, canvas, faceCanvas, faceDetector);

// write a function that will populate the users video

async function populateVideo(){
    const stream = await navigator.mediaDevices.getUserMedia({
        video : {width : 1280 ,height : 1080}
    });
    // console.log('stream', stream);
    video.srcObject = stream;
    await video.play();


// size the canvas to be same as the size of video
// console.log(video.videowidth, video.videoHeight)
canvas.width = video.videoWidth;
canvas.height = video.videoHeight;
faceCanvas.width = video.videoWidth;
faceCanvas.height = video.videoHeight;
}

//detect faces
async function detect(){
    const faces = await faceDetector.detect(video);
    // console.log(face.length);

    //ask browser the next animation fram is, and tell it to
    // run
    faces.forEach(drawFace);
    faces.forEach(censore);
    requestAnimationFrame(detect);
}

function drawFace(face){
    const {width, height, top, left} = face.boundingBox;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = `#4640ed`;
    ctx.lineWidth = 5;
    ctx.strokeRect(left, top, width, height);
    console.log({})
}

function censore({boundingBox:face}){
    console.log(face);
    faceCtx.imageSmoothingEnabled = false
    faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height)

    const width = face.width * SCALE
    const height = face.height * SCALE
    faceCtx.drawImage(
        // 5 src args
        video, //source
        face.x, //src starting pt
        face.y,
        face.width,
        face.height,

        //4draw args
        face.x, //x and y drawing location
        face.y,
        SIZE,
        SIZE 
        
    );
    //draw the small face back in scaled form
    faceCtx.drawImage(
        faceCanvas, //src
        face.x,
        face.y,
        SIZE,
        SIZE,

        //drawing
        face.x - (width - face.width) / 2, 
        face.y - (height - face.height) / 2,
        width, 
        height
    )

    //take that face out and draw that face back in normal size
}
populateVideo().then(detect);