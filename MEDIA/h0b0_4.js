// var cursor = document.getElementById("cursor");
// document.addEventListener("mousemove", function (e) {
//   var x = e.clientX;
//   var y = e.clientY;
//   cursor.style.left = x + "px";
//   cursor.style.top = y + "px";
// });

const videosPlay = document.querySelectorAll("video");

function playVid() {
  videosPlay.play();
}

const container = document.getElementById("container");

// FADE IN IMAGES

const observerOptions1 = {
  root: null,
  rootMargin: "0px",
  threshold: 0.4,
};

function observerCallback1(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // fade in observed elements that are in view
      entry.target.classList.replace("fadeOut", "fadeIn");
    } else {
      // fade out observed elements that are not in view
      entry.target.classList.replace("fadeIn", "fadeOut");
    }
  });
}

const observer1 = new IntersectionObserver(observerCallback1, observerOptions1);

const fadeElms = document.querySelectorAll(".hidden");
fadeElms.forEach((el) => observer1.observe(el));

// INTERSECTION OBSERVER ACTIVE NAV

const sections = document.querySelectorAll("section");
const nav = document.querySelector("nav");
const navList = document.querySelectorAll("ul");

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
  // rootMargin: "0px 0px 0px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      navList.forEach((link) => {
        link.classList.remove("active");
        if (e.target.id === link.dataset.nav) {
          link.classList.add("active");
        }
      });
    }
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
});

// MODAL
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// SCROLL MOUSE CLICK

const slider = document.getElementById("container");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  slider.style.scrollBehavior = "auto";
  isDown = true;
  slider.style.cursor = "grabbing";
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.style.cursor = "grab";
});
slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.style.cursor = "grab";
});
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  slider.style.scrollBehavior = "auto";
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});

// // LOADING SCREEN
var loader = document.getElementById("loader");

$("#loader").delay(5000).fadeOut("slow");

// window.addEventListener("load", function () {
//   $("#loader").fadeOut(1000);
// });
// window.addEventListener("load", function () {
//   $("loader").fadeOut(1000);
// });
// .style.display = "none";

// const container = document.getElementById("container");

// MOBILE MENU

function toggleMobileMenu(menu) {
  menu.classList.toggle("open");
}

// FADE OUT SECTIONS

var source1 = document.getElementById("slide_2019");
document.getElementById("handle_2019").onclick = function () {
  slide_2019.classList.toggle("fade");
};

var source2 = document.getElementById("slide_2020");
document.getElementById("handle_2020").onclick = function () {
  slide_2020.classList.toggle("fade");
};

var source3 = document.getElementById("slide_2021");
document.getElementById("handle_2021").onclick = function () {
  slide_2021.classList.toggle("fade");
};

var source4 = document.getElementById("slide_2022");
document.getElementById("handle_2022").onclick = function () {
  slide_2022.classList.toggle("fade");
};

// AUTO PLAY VIDEOS

// PLAY SOUND ON IMAGE

var btn_gif = document.getElementById("animate_gif");

var audio1 = new Audio("../MEDIA/gtr_site/nota1.mp3");
var audio2 = new Audio("../MEDIA/gtr_site/nota2.mp3");
var audio3 = new Audio("../MEDIA/gtr_site/nota3.mp3");
var audio4 = new Audio("../MEDIA/gtr_site/nota4.mp3");
var audio5 = new Audio("../MEDIA/gtr_site/nota5.mp3");
var audio6 = new Audio("../MEDIA/gtr_site/nota6.mp3");
var audio7 = new Audio("../MEDIA/gtr_site/nota7.mp3");
var audio8 = new Audio("../MEDIA/gtr_site/nota8.mp3");

var playlist = new Array(
  "../MEDIA/gtr_site/nota1.mp3",
  "../MEDIA/gtr_site/nota2.mp3",
  "../MEDIA/gtr_site/nota3.mp3",
  "../MEDIA/gtr_site/nota4.mp3",
  "../MEDIA/gtr_site/nota5.mp3",
  "../MEDIA/gtr_site/nota6.mp3",
  "../MEDIA/gtr_site/nota7.mp3",
  "../MEDIA/gtr_site/nota8.mp3"
);

var audio = new Audio(),
  i = -1;

(btn_gif.onclick = function () {
  i = ++i < playlist.length ? i : 0;
  console.log(i);
  audio.src = playlist[i];
  audio.play();
}),
  true;
audio.volume = 1;
audio.loop = false;
audio.src = playlist[0];

// FIXED MUSICAS + PAUSE/PLAY - FIXED

$(function () {
  $(".musicas").click(function () {
    $(".musicas").not(this).removeClass("fixed");
    $(this).toggleClass("fixed");
  });
});

const myAudio = document.getElementsByClassName("audio");

$("audio").on({
  play: function () {
    $(".musicas").not(this).removeClass("fixed");
    $("audio").not(this).trigger("pause");
    $(this).closest(".musicas").toggleClass("fixed");
  },
});

// SCROLL ARROWS

var clickLeft = document.getElementById("arrow-left");

function slide(direction) {
  // var container = document.getElementById("container");
  scrollCompleted = 0;
  container.style.scrollBehavior = "smooth";
  var slideVar = setInterval(function () {
    if (direction == "left") {
      container.scrollLeft -= 800;
    } else {
      container.scrollLeft += 800;
    }
    scrollCompleted += 800;
    if (scrollCompleted >= 200) {
      window.clearInterval(slideVar);
    }
  }, 0);
}

// SCROLL HANDLERS

var scrlRight = document.getElementById("hoverright");
var scrlLeft = document.getElementById("hoverleft");

// SCROLL LEFT
let mouseOverLeft = false;

scrlLeft.addEventListener("mouseenter", function () {
  mouseOverLeft = true;
});
scrlLeft.addEventListener("mouseleave", function () {
  mouseOverLeft = false;
});

window.setInterval(function () {
  if (mouseOverLeft) container.scrollLeft -= 500;
  container.style.scrollBehavior = "smooth";
}, 700);

// SCROLL RIGHT
let mouseOverRight = false;

scrlRight.addEventListener("mouseenter", function () {
  mouseOverRight = true;
});
scrlRight.addEventListener("mouseleave", function () {
  mouseOverRight = false;
});

window.setInterval(function () {
  if (mouseOverRight) container.scrollLeft += 500;
  container.style.scrollBehavior = "smooth";
}, 700);

// PROGRESS BAR

function progressBar() {
  const winScroll = document.getElementById("container").scrollLeft;
  const height =
    document.getElementById("container").scrollWidth -
    document.documentElement.clientWidth;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("scroll-progress").style.width = scrolled + "%";
}

document.getElementById("container").onscroll = function () {
  progressBar();
};

// CARRO SLIDE
function carScroll() {
  const winScroll1 = document.getElementById("container").scrollLeft;
  const height1 =
    document.getElementById("container").scrollWidth -
    document.documentElement.clientWidth;
  const scrolled1 = (winScroll1 / height1) * 100;
  document.getElementById("animate_gif_carro").style.left = scrolled1 + "%";
}
document.getElementById("container").onscroll = function () {
  carScroll();
};

// SHOW HIDE SONGS

var button_songs = document.getElementById("show_hide_songs");

function showOrHideDiv() {
  var notSongs = document.getElementsByClassName("hide");

  for (let i = 0; i < notSongs.length; i++) {
    if (notSongs[i].style.display !== "none") {
      notSongs[i].style.display = "none";
    } else {
      notSongs[i].style.display = "block";
    }
  }
}

button_songs.addEventListener("click", function changeDecor1() {
  if (button_songs.style.textDecoration !== "line-through") {
    button_songs.style.textDecoration = "line-through";
  } else {
    button_songs.style.textDecoration = "underline";
  }
});

//

var button_3D = document.getElementById("btn_triD");

button_3D.addEventListener("click", function changeDecor2() {
  if (button_3D.style.textDecoration !== "line-through") {
    button_3D.style.textDecoration = "line-through";
  } else {
    button_3D.style.textDecoration = "underline";
  }
});

// BUTTON MUTE
function muteMe(elem) {
  elem.muted = true;
}

function mutePage() {
  var elems = document.querySelectorAll("video, audio");

  [].forEach.call(elems, function (elem) {
    muteMe(elem);
  });
}

// CONSOLE LOG SCROLL
container.addEventListener("scroll", function (e) {
  console.log(container.scrollLeft); // Value of scroll Y in px
});

// SCROLL TO WHEN REFRESH

$(container).scroll(function () {
  //set scroll position in session storage
  sessionStorage.scrollPos = $(container).scrollLeft();
});
var init = function () {
  //get scroll position in session storage
  $(container).scrollLeft(sessionStorage.scrollPos || 0);
};
window.onload = init;

// function autoPlayVideos() {
//   var x = document.querySelector("video").play;
// }

// COMENTARIOS

// function myFunction() {
//   let data = "";
//   let name = document.getElementById("userName").value;
//   let comment = document.getElementById("userComment").value;

//   data = "Name: " + name + "Comment : " + comment;

//   document.getElementById("data").append(data); // display data to paragraph
// }

// utility functions for localstorage
function setObject(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
function getObject(key) {
  var storage = window.localStorage,
    value = storage.getItem(key);
  return value && JSON.parse(value);
}

// Clear inputfields and localstorage
function clearComment() {
  $("#txt1").val("");
  $("#namebox").val("");
  clearStorage();
}

function saveComment() {
  var cText = $("#txt1").val(),
    cName = $("#namebox").val(),
    cmtList = getObject("cmtlist");

  if (cmtList) {
    cmtList.push({ name: cName, text: cText });
    setObject("cmtlist", cmtList);
  } else {
    //Add a comment
    setObject("cmtlist", [{ name: cName, text: cText }]);
  }

  bindCmt();
}

function bindCmt() {
  var cmtListElement = $("#cmtlist"),
    cmtList = getObject("cmtlist");

  //Out with the old
  cmtListElement.empty();

  //And in with the new
  $.each(cmtList, function (i, k) {
    cmtListElement.append(
      $("<p><span>" + k.name + "</span>" + k.text + "</p>")
    );
  });
}

//Get the comments on page ready
$(function () {
  bindCmt();
});

function clearStorage() {
  window.localStorage.clear();
}

// MEDIA QUERY

const slide2020 = document.getElementById("slide_2020");
// if 'hasClass' is exist on 'mydivclass'
if (slide2020.classList.contains("fade")) {
  document.getElementById("animate_gif_4").style.left = "850vw";
} else {
  document.getElementById("animate_gif_4").style.left = "2570vw;";
}

//REMOVE FADE SECTION

var sourceSlide2021 = document.getElementById("slide_2021");
document.getElementById("four").onclick = function () {
  if (sourceSlide2021.classList.contains("fade")) {
    // remove the class
    sourceSlide2021.classList.remove("fade");
    function playVid() {
      videosPlay.play();
    }
  }
};

var sourceSlide2022 = document.getElementById("slide_2022");
document.getElementById("five").onclick = function () {
  if (sourceSlide2022.classList.contains("fade")) {
    // remove the class
    sourceSlide2022.classList.remove("fade");
    function playVid() {
      videosPlay.play();
    }
  }
};

// BALLOON
element = document.getElementById("balaoContainer");

// reset the transition by...
element.addEventListener(
  "click",
  function (e) {
    e.preventDefault;

    // -> removing the class
    element.classList.remove("moveUp");

    // -> triggering reflow /* The actual magic */
    // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
    // Oops! This won't work in strict mode. Thanks Felis Phasma!
    // element.offsetWidth = element.offsetWidth;
    // Do this instead:
    void element.offsetWidth;

    // -> and re-adding the class
    // element.classList.replace("moveUp", "float");
    element.classList.add("moveUp");
  },
  false
);

// PASSWORD FOLDER

document.getElementById("bearbug").onclick = function passwordCheck() {
  var password = prompt("Please enter the password.");
  if (password === "bearbug") {
    window.alert("Correct!");
    window.open("../bearbug/index.html", "_blank");
  } else {
    password !== "bearbug";
    window.alert("Sorry. Try again.");
  }

  // window.open = "realpage.html";
};

// function toggleItem(elem) {
//   for (var i = 0; i < elem.length; i++) {
//     elem[i].addEventListener("click", function (e) {
//       var current = this;
//       for (var i = 0; i < elem.length; i++) {
//         if (current != elem[i]) {
//           elem[i].classList.remove("zoom");
//         } else if (current.classList.contains("zoom") === true) {
//           current.classList.remove("zoom");
//         } else {
//           current.classList.add("zoom");
//         }
//       }
//       e.preventDefault();
//     });
//   }
// }
// toggleItem(document.querySelectorAll("img, video"));

// SVG DRAWING
var path = document.querySelector("#line-path");

// Get length of path... ~577px in this demo
var pathLength = path.getTotalLength();

path.style.strokeDasharray = pathLength + " " + pathLength;

// Offset the dashes so the it appears hidden entirely
path.style.strokeDashoffset = pathLength;

container.addEventListener("scroll", function (e) {
  // What % down is it?
  var scrollPercentage =
    (document.documentElement.scrollLeft +
      document.getElementById("container").scrollLeft) /
    (document.getElementById("container").scrollWidth -
      document.documentElement.clientWidth);

  // Length to offset the dashes
  var drawLength = pathLength * (scrollPercentage / 1);

  // Draw in reverse
  path.style.strokeDashoffset = pathLength - drawLength;
});

if (scrollPercentage >= 0.99) {
  path.style.strokeDasharray = "none";
} else {
  path.style.strokeDasharray = pathLength + " " + pathLength;
}

// SVG 2

// var path1 = document.querySelector("#cls-1");

// // Get length of path1... ~577px in this demo
// var pathLength1 = path1.getTotalLength();

// path1.style.strokeDasharray = pathLength1 + " " + pathLength1;

// // Offset the dashes so the it appears hidden entirely
// path1.style.strokeDashoffset = pathLength1;

// container.addEventListener("scroll", function (e) {
//   // What % down is it?
//   var scrollPercentage =
//     (document.documentElement.scrollLeft +
//       document.getElementById("container").scrollLeft) /
//     (document.getElementById("container").scrollWidth -
//       document.documentElement.clientWidth);

//   // Length to offset the dashes
//   var drawLength1 = pathLength1 * (scrollPercentage / 1);

//   // Draw in reverse
//   path1.style.strokeDashoffset = pathLength1 - drawLength1;
// });

// if (scrollPercentage >= 0.99) {
//   path1.style.strokeDasharray = "none";
// } else {
//   path1.style.strokeDasharray = pathLength1 + " " + pathLength1;
// }
