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




	function Logic (){
	
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
		
	}
	let ship = new spaceShip (200,200);
	let t=0;
	function Redraw (){
		drawFon();
		ship.draw ();
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

}
