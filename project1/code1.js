"use strict";

window.onload = function () {
	
	let Btn = document.getElementById ("Btn");	
	let time = document.getElementById ("time");	
	let editA = document.getElementById ("editA");
	let editB = document.getElementById ("editB");
	let canva = document.getElementById ("canva");
	canva.height = 800;
	canva.width = 600;
	let holst=canva.getContext('2d');

	
	function drawFon () {
		holst.fillStyle = '#000000';
		holst.fillRect (0,0, 600, 800);
	}




	class bullet {
		
		constructor (x, y, t, speed){
			this.x=x;
			this.y=y;
			this.speed=speed;
			this.t=t;
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
		
		move () {
			this.x+=this.speed*Math.sin(this.t);
			this.y-=this.speed*Math.cos(this.t);
		}
		
	}
	
	class spaceShip {
		
		constructor (x=0,y=0){
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
		
		rotation () {
			if (a) this.t-=0.01;
			if (d) this.t+=0.01;
		}
		
	}
	
	class asteroid {
		
		constructor (x=0, y=0, speed=4){
			this.x=x;
			this.y=y;
			this.vecX=ship.x-x;
			this.vecY=ship.y-y;
			this.speed=speed;
			this.deleted = false;
			let c = Math.sqrt (this.vecX*this.vecX+this.vecY*this.vecY);
			this.vecX=this.vecX/c;
			this.vecY=this.vecY/c;
		}
		
		draw(){
			if (this.x<canva.width && this.x>0 && this.y<canva.height && this.y>0 && this.deleted === false){
				holst.beginPath ();
				holst.arc (this.x, this.y, 10, 0 , Math.PI*2, true);
				holst.closePath();
				holst.strokeStyle = '#FF0000';
				holst.stroke ();
			} else this.deleted=true;
		}
		
		move(){
			this.x+=this.vecX*this.speed;
			this.y+=this.vecY*this.speed;
		}
			
	}
	let ship = new spaceShip (200,200);
	let astros = [];
	
	

	
	let enemyOnMap = 8;
	function Population () {
		let l = astros.length;
		if (l<enemyOnMap){
			astros.push (new asteroid(10,10,2));
		}
	}
	
	let bullets = [];
	function Shoot (){
		if (w){
			bullets.push (new bullet (ship.x, ship.y, ship.t, 4));
		}
	}
	
	function deleteAsteroid (){
		let l = astros.length;
		for (let i  = 0 ; i<l ; i++){
			if (astros[i].deleted){
				astros.splice (i,1);
				i--;
				l--;
			}
		}
	}
	
	function deleteBullet (){
		let l = bullets.length;
		for (let i  = 0 ; i<l ; i++){
			if (bullets[i].deleted){
				bullets.splice (i,1);
				i--;
				l--;
			}
		}
	}
	
	function hit (){
		for (let j = 0 ; j<astros.length; j++){
			for (let i = 0; i<bullets.length; i++){
				if (Math.hypot((astros[j].x-bullets[i].x),(astros[j].y-bullets[i].y))<=9) {
					astros[j].deleted=true;
					bullets[i].deleted=true;
				}
			}
		}
	}
	
	function Logic (){
		hit();
		deleteAsteroid ();
		deleteBullet ();
		ship.rotation();
		for (let i = 0; i<astros.length; i++){
			astros[i].move();
		}
		for (let i = 0; i<bullets.length; i++){
			bullets[i].move();
		}
	}
	
		
	let t=0;
	function Redraw (){
		drawFon();
		ship.draw ();
		for (let i = 0; i<astros.length; i++){
			astros[i].draw();
		}
		for (let i = 0; i<bullets.length; i++){
			bullets[i].draw();
		}
	}
	
	function drawLine (x1,y1,x2,y2,xc,yc, t){
		let xn1 = (x1)*Math.cos(t)-(y1)*Math.sin(t);
		let yn1 = (x1)*Math.sin(t)+(y1)*Math.cos(t);
		let xn2 = (x2)*Math.cos(t)-(y2)*Math.sin(t);
		let yn2 = (x2)*Math.sin(t)+(y2)*Math.cos(t);
		holst.beginPath ();
		holst.moveTo (xn1+xc, yn1+yc);
		holst.lineTo (xn2+xc, yn2+yc);
		holst.closePath ();
		holst.stroke ();
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
		if (keyNumber === 87) w = true;	
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
	let timerBullet = setInterval (Shoot, 200);
}
