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

    //create a request object
    var request = new XMLHttpRequest();

    //Capture the response and store it in a variable
    request.onreadystatechange = function () {
     if (request.readyState === XMLHTTPRequest.DONE) {
         //Take some action
         if (request.status === 200) {
            var counter = request.responseText;
            //Render the request result in the correct span
            var span = document.getElementById('count');
            span.innerHTML = counter.toString();
         }
     } 
    }
    //Make a request
    request.open = ('GET','http://cranishkumar.imad.hasura-app.io/counter', true);
    request.send(null);
}