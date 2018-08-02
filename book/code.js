"use strict";

window.onload = function() {
	let editA = document.getElementById("editA");
	let editB = document.getElementById("editB");
	let addBtn = document.getElementById("addBtn");
	
	let editC = document.getElementById("editC");
	let findBtn = document.getElementById("findBtn");
	
	if (localStorage.getItem("book") === null) {
		localStorage.setItem("book", JSON.stringify([]));
	}
	
	let result = document.getElementById("result");
	let error = document.getElementById("error");
	
	/////////////////////////////////////////////////////
	
	function getBookArray() {
		return JSON.parse(localStorage.getItem("book"));
	}
	
	function addRecord(record) {
		let book = getBookArray();
		book.push(record);
		
		localStorage.setItem("book", JSON.stringify(book));		
	}
	
	/////////////////////////////////////////////////////
	
	addBtn.onclick = function() {
		result.innerHTML = "";
		error.innerHTML = "";
		
		let record = {
			name: editA.value,
			number: editB.value
		};
		
		if (record.name === "" || record.number === "") {
			// alert("Заполните все поля");
			error.innerHTML = "Заполните все поля"
		}
		else {
			addRecord(record);
			
			// alert("Запись успешно добавлена");
			result.innerHTML = "Запись успешно добавлена";
			
			editA.value = "";
			editB.value = "";			
		}
	}
	
	/////////////////////////////////////////////////////
	
	findBtn.onclick = function() {
		
		result.innerHTML = "";
		error.innerHTML = "";
		
		let name = editC.value;
		
		if (name === "") {
			// alert("Заполните поле поиска");
			error.innerHTML = "Заполните поле поиска";
		}
		else {
			let number = "NNN";
			let book = getBookArray();
			
			for (let i = 0; i < book.length; i++) {
				if (book[i].name === name) {
					number = book[i].number;
					break;
				}			
			}
			
			if (number !== "NNN") {
				// alert(name + ": " + number);
				result.innerHTML = name + ": " + number;
				editC.value = "";
			}
			else {
				// alert("Запись не найдена");
				error.innerHTML = "Запись не найдена";
			}
		}
	}
}
















