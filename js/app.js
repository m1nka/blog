// dark theme toggle
function toggleTheme() {
  if (!getTheme) {
    setTheme('light');
  }
  if (getTheme() === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    setTheme('light');
    console.log('Set theme: light');
  } else if (getTheme() === 'light') {
    document.documentElement.setAttribute('data-theme', 'dark');
    setTheme('dark');
    console.log('Set theme: dark');
  }
}

function getTheme() {
  return window.localStorage.getItem('theme');
}
function setTheme(t) {
  window.localStorage.setItem('theme', t);
}


// nav bar toggle
let navbar = false;
function toggleNav() {
  if (!navbar) {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("menu-toggle").classList.add('turnit');
    document.getElementById("main").classList.add('menu-open');
    navbar = true;
  } else {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("menu-toggle").classList.remove('turnit');
    document.getElementById("main").classList.remove('menu-open');
    navbar = false;
  }
}