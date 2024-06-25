// LOADING SCREEN
var loader = document.getElementById("loader");

window.addEventListener("load", function () {
  loader.style.display = "none";
});

const container = document.getElementById("container");

function toggleMobileMenu(menu) {
  menu.classList.toggle("open");
}

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

const videosPlay = document.querySelectorAll("video");

function playVid() {
  videosPlay.play();
}

// function toggleMute(element) {
//   element.muted = true;
//   element.play();
// }

// window.addEventListener("load", () => {
//   setTimeout(() => {
//     toggleMute(document.querySelector("video"));
//   }, 1000);
// });

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
  behavior: "smooth";
}, 500);

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
  behavior: "smooth";
}, 500);

// PROGRESS BAR

function progressBar() {
  const winScroll = document.getElementById("container").scrollTop;
  const height =
    document.getElementById("container").scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("scroll-progress").style.width = scrolled + "%";
}

document.getElementById("container").onscroll = function () {
  progressBar();
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

// ACTIVE MENU

var welcomenav = document.getElementById("one");
var slide_2019nav = document.getElementById("two");
var slide_2020nav = document.getElementById("three");
var slide_2021nav = document.getElementById("four");
var slide_2022nav = document.getElementById("five");
var contactsnav = document.getElementById("six");

//use window.scrollY
var scrollpos = container.scrollLeft;

function add_class_on_scroll0() {
  welcomenav.classList.add("active");
}

function remove_class_on_scroll0() {
  welcomenav.classList.remove("active");
}

container.addEventListener("scroll", function () {
  //Here you forgot to update the value
  scrollpos = container.scrollLeft;

  if (scrollpos >= 0) {
    add_class_on_scroll0();
  } else {
    remove_class_on_scroll0();
  }
  console.log(scrollpos);
});

// 2019 ACTIVE

function add_class_on_scroll1() {
  slide_2019nav.classList.add("active");
}

function remove_class_on_scroll1() {
  slide_2019nav.classList.remove("active");
}

container.addEventListener("scroll", function () {
  //Here you forgot to update the value
  scrollpos = container.scrollLeft;

  if (scrollpos > 1266) {
    add_class_on_scroll1();
  } else {
    remove_class_on_scroll1();
  }
  console.log(scrollpos);
});

// 2020 ACTIVE

function add_class_on_scroll2() {
  slide_2020nav.classList.add("active");
}

function remove_class_on_scroll2() {
  slide_2020nav.classList.remove("active");
}

container.addEventListener("scroll", function () {
  //Here you forgot to update the value
  scrollpos = container.scrollLeft;

  if (scrollpos > 15400) {
    add_class_on_scroll2();
  } else {
    remove_class_on_scroll2();
  }
  console.log(scrollpos);
});

// 2021 ACTIVE

function add_class_on_scroll3() {
  slide_2021nav.classList.add("active");
}

function remove_class_on_scroll3() {
  slide_2021nav.classList.remove("active");
}

container.addEventListener("scroll", function () {
  //Here you forgot to update the value
  scrollpos = container.scrollLeft;

  if (scrollpos > 66000) {
    add_class_on_scroll3();
  } else {
    remove_class_on_scroll3();
  }
  console.log(scrollpos);
});

// 2022 ACTIVE

function add_class_on_scroll4() {
  slide_2022nav.classList.add("active");
}

function remove_class_on_scroll4() {
  slide_2022nav.classList.remove("active");
}

container.addEventListener("scroll", function () {
  //Here you forgot to update the value
  scrollpos = container.scrollLeft;

  if (scrollpos > 175700) {
    add_class_on_scroll4();
  } else {
    remove_class_on_scroll4();
  }
  console.log(scrollpos);
});

// CONTACTSnav ACTIVE

function add_class_on_scroll5() {
  contactsnav.classList.add("active");
}

function remove_class_on_scroll5() {
  contactsnav.classList.remove("active");
}

container.addEventListener("scroll", function () {
  //Here you forgot to update the value
  scrollpos = container.scrollLeft;

  if (scrollpos > 278000) {
    add_class_on_scroll5();
  } else {
    remove_class_on_scroll5();
  }
  console.log(scrollpos);
});

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

var path1 = document.querySelector("#cls-1");

// Get length of path1... ~577px in this demo
var pathLength1 = path1.getTotalLength();

path1.style.strokeDasharray = pathLength1 + " " + pathLength1;

// Offset the dashes so the it appears hidden entirely
path1.style.strokeDashoffset = pathLength1;

container.addEventListener("scroll", function (e) {
  // What % down is it?
  var scrollPercentage =
    (document.documentElement.scrollLeft +
      document.getElementById("container").scrollLeft) /
    (document.getElementById("container").scrollWidth -
      document.documentElement.clientWidth);

  // Length to offset the dashes
  var drawLength1 = pathLength1 * (scrollPercentage / 1);

  // Draw in reverse
  path1.style.strokeDashoffset = pathLength1 - drawLength1;
});

if (scrollPercentage >= 0.99) {
  path1.style.strokeDasharray = "none";
} else {
  path1.style.strokeDasharray = pathLength1 + " " + pathLength1;
}

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
