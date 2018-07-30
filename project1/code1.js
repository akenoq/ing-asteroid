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
		holst.clearRect (0,0, 600, 800);
	}
	let xx = 40;
	let yy=50;
	
	function Redraw (){
		drawFon();
		holst.fillRect (xx, yy, 100, 100);
	}
	let speedX=1;
	let speedY=1;
	
	function Move (){
		/*xx+=speedX;
		yy+=speedY;
		if (xx>=500) {
			speedX=-speedX;
		} else {
			if (xx<=0) {
				speedX=-speedX;
			}
		}
		if (yy>=700) {
			speedY=-speedY;
		} else {
			if (yy<=0) {
				speedY=-speedY;
			}
		}*/
		if (d) {xx+=speedX;} else {xx-=speedX;}
		if (s) {yy+=speedY;} else {yy-=speedY;}
		if (a) {xx-=speedX;} else {xx+=speedX;}
		if (w) {yy-=speedY;} else {yy+=speedY;}
		
		
		
	}
	//https://github.com/akenoq/ing-asteroid
	let a = false;
	let s =false;
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
	let timerMove = setInterval (Move, 20);

}