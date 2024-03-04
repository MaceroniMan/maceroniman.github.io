var names = {
  "game$fightshow" : "Fight Show",
  "game$hurricane" : "Hurricane",
  "game$islandexplorer" : "Island Explorer",

  "proj$mirrior" : "Mirrior",
  "proj$libraries" : "Misc Modules",
  "proj$watchbox" : "WatchBox",
  "proj$mads" : "MaDS",
  "proj$obsidian" : "Obsidian Plugins",

  "aboutme" : "About Me",
  "aboutwebsite" : "About Website",
  "projects" : "Projects"
}

var themes = {
  "main" : {
    "background": "darkblue",
    "text-color": "grey",
    "accent-color": "yellow",
    "header-text-color": "black",
    "hover-text-color": "grey",
    "outline-color": "black",
    "secondary-accent": "black"
  },
  "hacker" : {
    "background": "black",
    "text-color": "green",
    "accent-color": "lightgreen",
    "header-text-color": "black",
    "hover-text-color": "green",
    "outline-color": "black",
    "secondary-accent": "green"
  },
  "greyscale" : {
    "background": "grey",
    "text-color": "black",
    "accent-color": "white",
    "header-text-color": "grey",
    "hover-text-color": "black",
    "outline-color": "grey",
    "secondary-accent": "black"
  }
}

var cscreen = "aboutme"
var ctheme = "main"

function load(title, name) {
  $.get("/src/" + name.replace("$", "/") + ".html", function(data) {
    document.getElementById("content").innerHTML = data
  }).done(function() {
    window.history.pushState("object or string", title, "?page=" + name);

    document.title = title;

    document.getElementById(cscreen + "btn").classList.remove("active");
    document.getElementById(name + "btn").classList.add("active");

    document.getElementById(cscreen + "mbl").classList.remove("active");
    document.getElementById(name + "mbl").classList.add("active");

    // if mobile menu is up
    mobile_header(false)

    cscreen = name;
  });
}

function doTheme(name) {
  var r = document.querySelector(':root');
  if (name in themes) {
    setCookie("theme", name)
    for (item in themes[name]) {
      r.style.setProperty("--" + item, themes[name][item]);
    }
    document.getElementById(ctheme + "theme").classList.remove("active");
    document.getElementById(name + "theme").classList.add("active");

    document.getElementById(ctheme + "themembl").classList.remove("active");
    document.getElementById(name + "themembl").classList.add("active");

    // if mobile menu is up
    theme_mobile_header(false)

    ctheme = name;
  }
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}

function page(screen) {
  if (screen in names) {
    load(names[screen], screen)
  }
}

function setCookie(cname,cvalue) {
  document.cookie = cname + "=" + cvalue + ";path=/";
}

function getCookie(cname,deflt) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return deflt;
}

function mobile_header(mode) {
  if (mode) {
    document.getElementById("mobile-header").style.display = "block";
    document.getElementById("mobile-btn").style.display = "none";
  } else {
    document.getElementById("mobile-header").style.display = "none";
    document.getElementById("mobile-btn").style.display = "block";
  }
}

function theme_mobile_header(mode) {
  if (mode) {
    document.getElementById("theme-mobile-header").style.display = "block";
    document.getElementById("mobile-btn").style.display = "none";
  } else {
    document.getElementById("theme-mobile-header").style.display = "none";
    document.getElementById("mobile-btn").style.display = "block";
  }
}