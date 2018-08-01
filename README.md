### Астероид 

В папке project1 и project2 находятся программы с занятия. 


### Полезные ссылки

* Справочник HTML + CSS

    [htmlbook.ru](https://www.htmlbook.ru)


* Справочник JavaScript

    [learn.javascript.ru](learn.javascript.ru)

### ПРОГРАММИРОВАНИЕ:
https://learn.javascript.ru/ (выбираем Основы JavaScript, глава 12 и 15)



## ДЗ 1
1) Сделать калькулятор (A+B)/C , учесть деление на 0
2) Добавить к прямоугольнику, управляемому пользователем, круг, двигиющийся за ним.
Когда он его догоняет, переносится в некоторую точку на экране


## ДЗ 2 
1) Реализовать с помощью функции рандома случайные точки появления астероидов.
2) Создать класс снарядов, содержащий поля: координаты, вектор скорости, и методы: конструктор, движение, отрисовка. 

### Функция рандома
Как параметры получает минимум и максимум диапазона для рандома
    
        function getRandomNumber(min=0,max=1000) {
		    return parseInt(Math.random()*(max-min))+min;	
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
			for (let i=0; i<astros.length; i++){
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
				if ((d1+d2+d3)<(d4+d5+d6)){
					scoreLabel.innerHTML = true;
				} else scoreLabel.innerHTML = false;
			}	
		}
