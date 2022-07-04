quick_draw_data_set=["apple","clock","table","bat"]


var random_no = Math.floor((Math.random()*quick_draw_data_set.length)+1);
console.log(quick_draw_data_set[random_no]);

var sketch_name=quick_draw_data_set[random_no];

document.getElementById("drawn").innerHTML="Sketch to be drawn :"+ sketch_name;

var timer_check="";
var timer_counter=0;
var drawn_sketch="";
var answer_holder="";
var score=0;

function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
}

function setup(){
    var canvas=createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    
}
function draw(){
    check_sketch();

    strokeWeight(13);
    stroke("black");

    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }


    if(drawn_sketch==sketch_name){
        answer_holder="set"
        score=score+1;
        document.getElementById("score").innerHTML="Score :"+score;
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
      console.error(error);
    }
    else{
        console.log(results);
        drawn_sketch=results[0].label;
        document.getElementById('your_sketch').innerHTML = 'Your Sketch : ' + drawn_sketch;
        document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';
    }
    
  }
  

function check_sketch(){
    if(drawn_sketch==sketch_name){
        timer_counter=timer_counter+1;
        document.getElementById("timer").innerHTML="Timer :"+timer_counter;
        console.log(timer_counter);
    }
    if(timer_counter>400){
        timer_counter=0;
        timer_check="completed";
    }
    if(timer_check=="completed" || answer_holder=="set"){
        timer_check="";
        answer_holder="";
        updateCanvas()
    }
}

function updateCanvas(){
    background("white");

    random_no = Math.floor((Math.random()*quick_draw_data_set.length)+1);
    console.log(quick_draw_data_set[random_no]);

    sketch_name=quick_draw_data_set[random_no];
    document.getElementById("drawn").innerHTML="Sketch to be drawn :"+ sketch_name;

}