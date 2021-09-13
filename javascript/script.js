var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
const particleArray = [];

const mouse = {
    x:null,
    y: null,
}

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

})



class Particle{
    constructor(){
        this.type =  Math.floor(Math.random()*2+1);
        this.x = Math.random() * canvas.width ;
        this.y = Math.random() * canvas.height ;
        this.a =0;
        this.hspeed = Math.random()* 0.5 -0.5;
        this.vspeed = Math.random()* 0.5-0.5;
        this.rspeed = (Math.random()*4-2) /180 ;
   

    }
    update() {
        if(this.x > canvas.width || this.x < 0  ){
            this.hspeed= (this.hspeed*-1);
        }
        if(this.y > canvas.height || this.y < 0  ){
            this.vspeed =(this.vspeed*-1);
        }
        this.x += this.hspeed;
        this.y += this.vspeed;
        this.a +=this.rspeed;

    }
    draw(){

    if(this.type == 1){
       ctx.save()
       ctx.beginPath();
       ctx.translate(this.x,this.y)
       ctx.rotate(this.a);
       ctx.moveTo( 0, 0); ctx.lineTo(-40,25); ctx.lineTo(-40,-20);
       ctx.fillStyle = "orange";
       ctx.fill();
       ctx.restore()
    }else if(this.type == 2){
       ctx.save()
       ctx.translate(this.x,this.y)
       ctx.rotate(this.a);
       ctx.fillStyle = "grey";
       ctx.beginPath();
       ctx.arc(0,0, 20,0,Math.PI*2);
       ctx.fill();
       ctx.restore()
    }   
        

    }
}

function generateParticles(){
    for (let index = 0; index < canvas.width/80; index++) {
        particleArray.push(new Particle());
    }
}

function handleParticles(){
    for (let index = 0; index < particleArray.length; index++) {
        particleArray[index].update();
        particleArray[index].draw();
    }
  
}

window.addEventListener('load', ()=>{
    render();
    generateParticles();
})

function render(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleParticles();
    requestAnimationFrame(render);
}



/*Lazzy laod imgs */
function loadOnScroll(){

   var img = document.querySelector('img') 
        
        if(img.getBoundingClientRect().top < window.innerHeight){
          img.src =img.getAttribute('data-src');
        }

    let box =document.querySelector(".box");
    if(box.getBoundingClientRect().top < window.innerHeight){
        box.style.opacity ="100";
    }
}

document.addEventListener('scroll', loadOnScroll);

/*Horizontal Scroll */

var windowWidth = window.innerWidth;
var horizontalLenght = document.querySelector(".projContainer").scrollWidth;
var distFromTop = document.querySelector("#portifolio").offsetTop;

var scrollDistance =distFromTop +horizontalLenght+400 - windowWidth ;

document.querySelector('#portifolio').style.height = horizontalLenght + "px";

window.onscroll = function(){
    var scrollTop = window.scrollY;

    if(scrollTop >= distFromTop+100 && scrollTop <= scrollDistance){
        document.querySelector('.projContainer').style.transform ="translateX(-"+(scrollTop - distFromTop)+"px)";
    }
}

/* Footer */

var currentYear  = new Date().getFullYear()

document.querySelector('footer p').append(`©${currentYear} All Rights Reseverd `)

if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
  }