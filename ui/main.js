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
     if (request.readyState === XMLHttpRequest.DONE) {
         //Take some action
         if (request.status === 200) {
            var counter = request.responseText;
            //Render the request result in the correct span
            var span = document.getElementById('count');
            span.innerHTML = counter.toString();
         }
     } 
    };
    //Make a request
    request.open('GET','http://cranishkumar.imad.hasura-app.io/counter', true);
    request.send(null);
};


var submit = document.getElementById('submit_btn');
submit.onclick = function () {
    //Capture a list f name and render it as a list 
    //var names = ['name1', 'name2', 'name3', 'name4'];
    var names = request.responseText;
    names = JSON.parse(names);
    var list = '';
    for (var i = 0; i<name.length; i++){
        list += '<li>' + names[i] + '</li>';
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
    //Make a request to the server and send the name
    
    //submit name
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    request.open('GET','http://cranishkumar.imad.hasura-app.io/submit-name?name=' + name, true);
    request.send(null);
    
};



