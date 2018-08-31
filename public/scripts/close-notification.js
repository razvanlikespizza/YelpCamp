// make close flash message work
var mess= document.querySelector(".message .delete");
if (mess) {
  mess.addEventListener("click", function(){
    var message = this.parentElement.parentElement;
    message.remove();
  });
}