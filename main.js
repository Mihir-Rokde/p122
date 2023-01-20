x=0;
y=0;
draw_img="";
img="";
screen_width=0;
screen_height=0;
speak_data="";
to_number=0;
function preload(){
    img=loadImage("img.png");
}
var SpeechRecognition=window.webkitSpeechRecognition;
var recognition=new SpeechRecognition();
function start(){
    document.getElementById("status").innerHTML="system is listening please speak";
    recognition.start();
}
recognition.onresult=function(event){
    console.log(event);
    var content=event.results[0][0].transcript;
    document.getElementById("status").innerHTML="the speech has been recognized as :  "+content;
    to_number=Number(content);
    if(Number.isInteger(to_number))
    {
        
        document.getElementById("status").innerHTML="started drawing image";
        draw_img="set";
    }
    else
    {
        document.getElementById("status").innerHTML="speech is not recognized as a number";
    }
}
function setup(){
    screen_width=window.innerWidth;
    screen_height=window.innerHeight;
    canvas=createCanvas(screen_width,screen_height-150);
    canvas.position(0,150);
}
function draw(){
    if(draw_img=="set")
    {
      for(var i=1;i<=to_number;i++)
      {
        x=Math.floor(Math.random()*700);
        y=Math.floor(Math.random()*400);
        image(img,x,y,50,50);
      }
      document.getElementById("status").innerHTML=to_number+"image is drawn.";
      speak_data=to_number+"image drawn";
      speak();
      draw_img=""
    }
}
function speak(){
  var  synth=window.speechSynthesis;
  var utterthis=new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterthis);
  speak_data="";
}