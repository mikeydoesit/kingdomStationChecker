var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    direction: 'vertical',
    initialSlide: 1,
    grabCursor: false,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows : true,
    },
  });

  var canvas, ctx, center_x, center_y, radius, bars, x_end, y_end, bar_height, bar_width, frequency_array, slider, streamURL, visualizer;
 
bars = 200;
bar_width = 2;
slider = document.querySelector('.console');
visualizer = document.querySelector('.visualizer');

// slide variables

var sunyaniSlide = document.querySelector('.sunyani');
var nkawkawSlide = document.querySelector('.nkawkaw');
var mankesimSlide = document.querySelector('.mankesim');
var capeSlide = document.querySelector('.cape');
var ktownSlide = document.querySelector('.ktown');
var hoSlide = document.querySelector('.ho');
var kumasiSlide = document.querySelector('.kumasi');
var accraSlide = document.querySelector('.accra');
var taadiSlide = document.querySelector('.taadi');
var exitButton = document.querySelector('.fa-angle-left');


// Event Listeners
sunyaniSlide.addEventListener('click', (event) => {
  streamURL = 'https://cors-anywhere.herokuapp.com/http://stream.zeno.fm/4ubxxdtnthruv';

  initVisualizer(streamURL);
});
nkawkawSlide.addEventListener('click', (event) => {
  streamURL = 'https://cors-anywhere.herokuapp.com/http://stream.zeno.fm/qnze9xqga9quv';

  initVisualizer(streamURL);
});
mankesimSlide.addEventListener('click', (event) => {
  streamURL = 'https://cors-anywhere.herokuapp.com/http://stream.zeno.fm/9181r4rnthruv';

  initVisualizer(streamURL);
});
capeSlide.addEventListener('click', (event) => {
  streamURL = 'https://cors-anywhere.herokuapp.com/http://stream.zeno.fm/4ubxxdtnthruv';

  initVisualizer(streamURL);
});
ktownSlide.addEventListener('click', (event) => {
  streamURL = 'https://cors-anywhere.herokuapp.com/http://stream.zeno.fm/07ng84qmthruv';

  initVisualizer(streamURL);
});
hoSlide.addEventListener('click', (event) => {
  streamURL = 'https://cors-anywhere.herokuapp.com/http://stream.zeno.fm/yr3cdmykzmruv';

  initVisualizer(streamURL);
});
kumasiSlide.addEventListener('click', (event) => {
  streamURL = 'https://cors-anywhere.herokuapp.com/http://stream.zenolive.fm/2x4gnn6x7druv';

  initVisualizer(streamURL);
});
accraSlide.addEventListener('click', (event) => {
  streamURL = 'https://cors-anywhere.herokuapp.com/http://stream.zeno.fm/bu8bhkqga9quv';

  initVisualizer(streamURL);
});
taadiSlide.addEventListener('click', (event) => {
  streamURL = 'https://cors-anywhere.herokuapp.com/http://stream.zeno.fm/9de7v7rnthruv';

  initVisualizer(streamURL);
});

exitButton.addEventListener('click', (event) => {
  reset();
})
console.log(slider);
function initVisualizer(x){
console.log(slider);

    slider.style.display = 'none';
    visualizer.style.display = 'block';
    
    audio = new Audio();
    audio.crossOrigin = "anonymous";
    context = new (window.AudioContext || window.webkitAudioContext)();
    analyser = context.createAnalyser();
    
    audio.src = x; // the source path
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
 
    
    frequency_array = new Uint8Array(analyser.frequencyBinCount);
    
    audio.play();
    animationLooper();
}
 
function animationLooper(){
    
    // set to the size of device
    canvas = document.getElementById("renderer");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    
    // find the center of the window
    center_x = canvas.width / 2;
    center_y = canvas.height / 2;
    radius = 20;
    
    // style the background
    var gradient = ctx.createLinearGradient(0,0,0,canvas.height);
    gradient.addColorStop(0,"rgba(35, 7, 77, 1)");
    gradient.addColorStop(1,"rgba(204, 83, 51, 1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    //draw a circle
    ctx.beginPath();
    ctx.arc(center_x,center_y,radius,0,2*Math.PI);
    ctx.stroke();
    
    analyser.getByteFrequencyData(frequency_array);
    for(var i = 0; i < bars; i++){
        
        //divide a circle into equal parts
        rads = Math.PI * 2 / bars;
        
        bar_height = frequency_array[i]*0.7;
        
        // set coordinates
        x = center_x + Math.cos(rads * i) * (radius);
	y = center_y + Math.sin(rads * i) * (radius);
        x_end = center_x + Math.cos(rads * i)*(radius + bar_height);
        y_end = center_y + Math.sin(rads * i)*(radius + bar_height);
        
        //draw a bar
        drawBar(x, y, x_end, y_end, bar_width,frequency_array[i]);
    
    }
    window.requestAnimationFrame(animationLooper);
}
 
// for drawing a bar
function drawBar(x1, y1, x2, y2, width,frequency){
    
    var lineColor = "rgb(" + frequency + ", " + frequency + ", " + 205 + ")";
    
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}

function reset() {
  slider.style.display = 'block';
  visualizer.style.display = 'none';
  audio.pause();
}