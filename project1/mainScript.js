"use strict";


function addListenersToButtons(){
    elem("b4").addEventListener("click", function(){
        hideAllBoxes();
        elem("aboutCreator").hidden = false;
    });

    elem("b3").addEventListener("click", function(){
        hideAllBoxes();
        elem("aboutGame").hidden = false;
    });

    elem("b5").addEventListener("click", function(){
        hideAllBoxes();
        elem("mainMenu").hidden = false;
    });

    elem("b6").addEventListener("click", function(){
        hideAllBoxes();
        elem("mainMenu").hidden = false;
    });

    elem("b1").addEventListener("click", function(){
        hideAllBoxes();
        elem("mainMenu").hidden = false;
        elem("centerBox").hidden = true;
        elem("gameBox").hidden = false;
		elem("canva").hidden = false;
        pause=false;
    });
}

window.addEventListener("load", function () {
	elem("centerBox").hidden = false;
    addListenersToButtons();
});

