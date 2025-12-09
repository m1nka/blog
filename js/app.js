// particle.js

particlesJS.load('particles-js', '/js/particles.json', () => {
  // console.log('callback - particles.js config loaded');
  if (getTheme() === 'dark') {
    setParticleDarkTheme();
  }
});

// dark theme toggle
function toggleTheme() {
  if (!getTheme()) {
    setTheme('dark'); // Default to dark theme
  }
  if (getTheme() === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    setTheme('light');
    setParticleLightTheme();
  } else if (getTheme() === 'light') {
    document.documentElement.setAttribute('data-theme', 'dark');
    setTheme('dark');
    setParticleDarkTheme();
  }
}

function setParticleLightTheme() {
  window.pJSDom[0].pJS.particles.shape.stroke.color = "#000000";
  window.pJSDom[0].pJS.particles.color.value = "#000000";
  window.pJSDom[0].pJS.particles.line_linked.color = "#000000";
  window.pJSDom[0].pJS.fn.particlesRefresh();
}

function setParticleDarkTheme() {
  window.pJSDom[0].pJS.particles.shape.stroke.color = "#fff";
  window.pJSDom[0].pJS.particles.color.value = "#fff";
  window.pJSDom[0].pJS.particles.line_linked.color = "#fff";
  window.pJSDom[0].pJS.fn.particlesRefresh();
}

function getTheme() {
  return localStorage.getItem('theme');
}
function setTheme(t) {
  localStorage.setItem('theme', t);
}

// nav bar toggle
let navbar = false;
function toggleNav() {
  if (!navbar) {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("menu-toggle").classList.add('turnit');
    document.getElementById("main").classList.add('menu-open');
    navbar = true;
    document.getElementById("typer-text-container").classList.add('fix-typer-width');
  } else {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("menu-toggle").classList.remove('turnit');
    document.getElementById("main").classList.remove('menu-open');
    navbar = false;
    document.getElementById("typer-text-container").classList.remove('fix-typer-width');
  }
}

// typer

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 150 ;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 600;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

// Add copy buttons as soon as DOM is ready (before images/disqus load)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addCopyButtons);
} else {
  addCopyButtons();
}

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  // css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

function addCopyButtons() {
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach(function(codeBlock) {
    // Skip if already wrapped
    if (codeBlock.parentElement.classList.contains('code-block-wrapper')) {
      return;
    }

    const code = codeBlock.querySelector('code');
    const textToCopy = code ? code.textContent : codeBlock.textContent;

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);

    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-btn';
    copyButton.textContent = 'Copy';

    copyButton.onclick = function() {
      navigator.clipboard.writeText(textToCopy).then(function() {
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');
        setTimeout(function() {
          copyButton.textContent = 'Copy';
          copyButton.classList.remove('copied');
        }, 2000);
      }).catch(function() {
        copyButton.textContent = 'Failed';
        setTimeout(function() {
          copyButton.textContent = 'Copy';
        }, 2000);
      });
    };

    wrapper.appendChild(copyButton);
  });
}