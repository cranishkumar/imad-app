//console.log('Loaded!');

//change the text of the main text division
//var element = document.getElementById('main-text');

//element.innerHTML = 'New Value';

/* Move the image littele right
var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function() {
    var interval = setInterval(moveRight, 50);
};
*/

//counter code

var counter = 0;
var button = document.getElementById('counter');
button.onclick = function(){
    couner = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
}