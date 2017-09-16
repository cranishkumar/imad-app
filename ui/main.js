console.log('Loaded!');

//change the text of the main text division
var element = document.getElementById('main-text');

element.innerHTML = 'New Value';
//Move the image littele right

var img = document.getElementById('img');

img.onclick = function(){
    var interval = setInterval(mioveLeft, 100);
};