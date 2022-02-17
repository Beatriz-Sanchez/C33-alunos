const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

var engine, world, bg, backgroundImg;
var caixa1, caixa2, porco1, tronco1;
var caixa3, caixa4, porco2, tronco2;
var caixa5, tronco3, tronco4;
var fundoImg, solo, plataforma;
var bird, estilingue;
var estado = "no estilingue";
var pontos = 0;

function preload() {
    getBackgroundImg();
    fundoImg = loadImage("sprites/base.png");
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    solo = new Solo(600,height,1200,20);
    plataforma = new Solo(150, 305, 300, 170);

    caixa1 = new Caixa(700,320,70,70);
    caixa2 = new Caixa(920,320,70,70);
    porco1 = new Porco(810, 350);
    tronco1 = new Tronco(810,260,300, PI/2);

    caixa3 = new Caixa(700,240,70,70);
    caixa4 = new Caixa(920,240,70,70);
    porco2 = new Porco(810, 220);

    tronco3 =  new Tronco(810,180,300, PI/2);

    caixa5 = new Caixa(810,160,70,70);
    tronco4 = new Tronco(760,120,150, PI/7);
    log5 = new Tronco(870,120,150, -PI/7);

    bird = new Passaro(200,50);

    estilingue = new Estilingue(bird.body,{x:200, y:50});
}

function draw(){
    if (backgroundImg){
        background(backgroundImg);
    } else {
        background(fundoImg);
    }

    noStroke();
    textSize(35);
    fill("white");
    text("Pontos: "+pontos, width-300, 50);

    Engine.update(engine);
    //strokeWeight(4);
    caixa1.display();
    caixa2.display();
    solo.display();
    porco1.display();
    porco1.score();
    tronco1.display();

    caixa3.display();
    caixa4.display();
    porco2.display();
    porco2.score();
    tronco3.display();

    caixa5.display();
    tronco4.display();
    log5.display();

    bird.display();
    plataforma.display();
    //log6.display();
    estilingue.display();    
}

function mouseDragged(){
    if (estado === "no estilingue"){
        Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
    
}

function mouseReleased(){
    estilingue.voar();
    estado = "lançado";
}

function keyPressed(){
    // if(keyCode === 32){
    //     estilingue.ligar();
    //     estado = "no estilingue";
    // }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/America/Sao_Paulo");
    console.log(response);
    var responseJSON = await response.json();
    console.log(responseJSON);

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if (hour >= 06 && hour <19){
        bg = "sprites/bg.png";
    } else{
        bg = "sprites/bg2.jpg";
    }
    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}