let navbar = false;
function toggleNav() {
  if (!navbar) {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("menu-toggle").classList.add('turnit');
    document.getElementById("main").style.marginRight = "250px";
    navbar = true;
  } else {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("menu-toggle").classList.remove('turnit');
    document.getElementById("main").style.marginRight = "0";
    navbar = false;
  }
}
let theme = false;
function toggleTheme() {

}
