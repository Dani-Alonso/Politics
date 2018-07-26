var button = document.getElementById("button");

button.addEventListener("click", function(){
    
    if(button.textContent=="Read More"){
        button.textContent="Read Less"}
    else{button.textContent="Read More"}
});