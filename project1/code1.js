"use strict";

window.onload = function () {
	
	let scoreLabel = document.getElementById ("scoreLabel");
	let Btn = document.getElementById ("Btn");		
	let editA = document.getElementById ("editA");
	let editB = document.getElementById ("editB");
	let canva = document.getElementById ("canva");
	canva.height = 800;
	canva.width = 800;
	let holst=canva.getContext('2d');
	let score=0;
	let end = false;

	
	function drawFon () {
		holst.fillStyle = '#000000';
		holst.fillRect (0,0, 800, 800);
	}

	function drawLine (x1, y1, x2, y2, xc, yc, t=0.01) {
		let xn1 = (x1)*Math.cos(t)-(y1)*Math.sin(t);
		let yn1 = (x1)*Math.sin(t)+(y1)*Math.cos(t);
		let xn2 = (x2)*Math.cos(t)-(y2)*Math.sin(t);
		let yn2 = (x2)*Math.sin(t)+(y2)*Math.cos(t);
		holst.beginPath ();
		holst.moveTo (xn1+xc,yn1+yc);
		holst.lineTo (xn2+xc,yn2+yc);
		holst.closePath ();
		holst.stroke ();
	}
	
	function getRandomNumber(min=0,max=1000) {
		return parseInt(Math.random()*(max-min))+min;	
	}
	
	let enemyOnMap = 8;
	
	function Population() {
		let l = astros.length;
		if (l<enemyOnMap){
			let xx = getRandomNumber(0,800);
			let yy = getRandomNumber(700,800);
			astros[l]=new asteroid(xx,yy,4);
		}
	}
	
	class bullet {
			
		constructor (x, y, t, speed) {
			this.x=x;
			this.y=y;
			this.t=t;
			this.speed=speed;
			this.deleted = false;
		}
			
		draw () {
			if (this.x<canva.width && this.x>0 && this.y<canva.height && this.y>0 && this.deleted === false){
				holst.strokeStyle = '#dff442';
				drawLine (-2,4,2,4, this.x, this.y, this.t);
				drawLine (-2,-4,2,-4, this.x, this.y, this.t);
				drawLine (-2,4,-2,-4, this.x, this.y, this.t);
				drawLine (2,4,2,-4, this.x, this.y, this.t);
			} else {
				this.deleted= true;
			}
		}
		
		move (){
			this.x+=Math.sin(this.t)*this.speed;
			this.y+=-Math.cos(this.t)*this.speed;
		}
		
	}

	
	
	class asteroid {
	
		constructor (x=0,y=0,speed=4) {  
			this.x=x;
			this.y=y;
			this.vecX=ship.x-x+getRandomNumber(-200,200);
			this.vecY=ship.y-y+getRandomNumber(-200,200);
			this.speed=speed;
			let c =Math.sqrt (this.vecX*this.vecX+this.vecY*this.vecY);
			this.vecX=this.vecX/c;
			this.vecY=this.vecY/c;
			this.deleted = false;
		}
		
		draw (){
			if (this.x<canva.width && this.x>0 && this.y<canva.height && this.y>0 && this.deleted === false){
				holst.beginPath();
				holst.arc (this.x, this.y, 10, 0, 2*Math.PI, true);
				holst.closePath();
				holst.strokeStyle = '#FF0000';
				holst.stroke ();
			} else {
				this.deleted= true;
			}
		}
		
		move (){
			this.x+=this.vecX*this.speed;
			this.y+=this.vecY*this.speed;
		}
		
	}
	
	class spaceShip {
	
		constructor (x=0,y=0) {
			this.x=x;
			this.y=y;
			this.t=0;
		}
		
		draw () {
			holst.strokeStyle = '#FFFFFF';
			drawLine (0,-45,25,20, this.x, this.y, this.t);
			drawLine (0,-45,-25,20, this.x, this.y, this.t);
			drawLine (25,20,0,10, this.x, this.y, this.t);
			drawLine (-25,20,0,10, this.x, this.y, this.t);
		}
		
		rotate () {
			if (d) {this.t+=0.03;}
			if (a) {this.t-=0.03;} 
		}
		
		crush () {
			let x1 = (0)*Math.cos(this.t)-(-45)*Math.sin(this.t)+this.x;
			let y1 = (0)*Math.sin(this.t)+(-45)*Math.cos(this.t)+this.y;
			let x2 = (-25)*Math.cos(this.t)-(20)*Math.sin(this.t)+this.x;
			let y2 = (-25)*Math.sin(this.t)+(20)*Math.cos(this.t)+this.y;
			let x3 = (25)*Math.cos(this.t)-(20)*Math.sin(this.t)+this.x;
			let y3 = (25)*Math.sin(this.t)+(20)*Math.cos(this.t)+this.y;
			holst.beginPath ();
			holst.moveTo (x1,y1);
			holst.lineTo (x2,y2);
			holst.lineTo (x3,y3);
			holst.lineTo (x1,y1);
			holst.closePath ();
			holst.strokeStyle = '#00FF00';
			holst.stroke ();
			let l = astros.length;
			for (let i=0; i<l; i++){
				let dx1 = x1 - astros[i].x;
				let dx2 = x2 - astros[i].x;
				let dx3 = x3 - astros[i].x;
				let dy1 = y1 - astros[i].y;
				let dy2 = y2 - astros[i].y;
				let dy3 = y3 - astros[i].y;
				let d1 = Math.hypot(dx1, dy1);
				let d2 = Math.hypot(dx2, dy2);
				let d3 = Math.hypot(dx3, dy3);
				let d4 = Math.hypot(x1-x2, y1-y2);
				let d5 = Math.hypot(x2-x3, y2-y3);
				let d6 = Math.hypot(x3-x1, y3-y1);
				if ((d1+d2+d3)<=(d4+d5+d6)){
					score-=10;
					astros.splice (i,1);
					i--;
					l--;
				}
			}	
		}
		
	}
	scoreLabel.innerHTML = false;
	let ship = new spaceShip(400,400);
	let astros=[];
	let bullets = [];
	let bull=new bullet (200,200 , 0, 3);
	
	
	function deleteAstros (){
		let l = astros.length;
		for (let i = 0; i<l; i++){
			if (astros[i].deleted){
				astros.splice (i, 1);
				i--;
				l--;
			}
		}
	}
	
	function deleteBullet (){
		let l = bullets.length;
		for (let i = 0; i<l; i++){
			if (bullets[i].deleted){
				bullets.splice (i, 1);
				i--;
				l--;
			}
		}
	}
	
	function hit (){
		for (let j = 0 ; j<astros.length; j++){
			for (let i = 0; i<bullets.length; i++){
				if (Math.abs(astros[j].x-bullets[i].x)<=9 && Math.abs(astros[j].y-bullets[i].y)<=9) {
					astros[j].deleted=true;
					bullets[i].deleted=true;
					score+=2;
				}
			}
		}
	}
	
	function Logic (){
		if (end === false){
			hit ();
			deleteAstros ();
			deleteBullet ();
			for (let i= 0 ; i<bullets.length; i++){
				bullets[i].move();
			}
			ship.rotate();
			for (let i= 0 ; i<astros.length; i++){
				astros[i].move();
			}
		}
	}
	
	function Redraw (){
		if (end === false){
			scoreLabel.innerHTML = "Очки: "+score;
			drawFon();
			for (let i= 0 ; i<bullets.length; i++){
				bullets[i].draw();
			}
			ship.draw();
			ship.crush();
			for (let i= 0 ; i<astros.length; i++){
				astros[i].draw();
			}
			
			if (score<0){
				end = true;
				scoreLabel.innerHTML = "Ты проиграл. Набрано очков: "+score;
			}
		}

	}
	
	let a = false;
	let s = false;
	let d = false;
	let w = false;
	
	window.onkeydown = function (event) {
        let keyNumber = event.keyCode;
		console.log(keyNumber);
		if (keyNumber === 65) a = true;
		if (keyNumber === 83) s = true;
		if (keyNumber === 68) d = true;
		if (keyNumber === 87) {
			bullets.push (new bullet (ship.x, ship.y, ship.t, 2));
		}	
	}
	window.onkeyup = function (event) {
        let keyNumber = event.keyCode;
		console.log(keyNumber);
		if (keyNumber === 65) a = false;
		if (keyNumber === 83) s = false;
		if (keyNumber === 68) d = false;
		if (keyNumber === 87) w = false;
	}
	

	let timerDraw = setInterval (Redraw, 20);
	let timerLogic = setInterval (Logic, 20);
	let timerPopulation = setInterval (Population, 1000);

}
