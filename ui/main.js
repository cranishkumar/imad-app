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

//submit username, password to login

var submit = document.getElementById('submit_btn');
submit.onclick = function () {
    //Capture a list f name and render it as a list 
    //var names = ['name1', 'name2', 'name3', 'name4'];
    //create a request object
    var request = new XMLHttpRequest();

    //Capture the response and store it in a variable
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
         //Take some action
         if (request.status === 200) {
             alert("Logged in successfully");
         } else if (request.status === 403) {
             alert("Wrong credentials");
         } else if (request.status === 500) {
             alert("something went wrong");
      }
    }
};
    //Make a request to the server and send the name
    
    //submit name
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','http://cranishkumar.imad.hasura-app.io/login=' + name, true);
    request.set.RequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
};



