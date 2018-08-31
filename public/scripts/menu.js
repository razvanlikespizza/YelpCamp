// MENU INTERACTIVITY
document.getElementsByClassName("navbar-burger")[0].addEventListener("click", function(){
  this.classList.toggle("is-active");
  document.getElementsByClassName("navbar-menu")[0].classList.toggle("is-active");
});