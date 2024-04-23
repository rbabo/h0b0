const container = document.getElementById("container"); // Main container// // Select the video element
// var video = document.querySelector("video");

// // Create an IntersectionObserver
// var observerVideo = new IntersectionObserver(function (entries) {
//   // Check if the video is in the viewport
//   if (entries[0].isIntersecting) {
//     // Start playing the video
//     video.play();
//   } else {
//     // Stop playing the video
//     video.pause();
//   }
// });

// // Observe the video
// observerVideo.observe(video);

// CODIGO IMPORTANTE ZOOM

var video = document.querySelector("video");

const optionsVideo = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
  // rootMargin: "0px 0px 0px 0px",
};

// Create an IntersectionObserver
var observerVideo = new IntersectionObserver(function (entries) {
  // Check if the video is in the viewport
  if (!isZoomActive && entries[0].isIntersecting) {
    // Start playing the video
    video.play();
  } else {
    // Stop playing the video
    video.pause();
  }
}, optionsVideo);

// Observe the video
observerVideo.observe(video);

// Set the flag variable when the zoom function is active
// var isZoomActive = false;
// $("video, img:not(.gifs)").click(function () {
//   $("video, img:not(.gifs)").not(this).removeClass("zoom");
//   $(this).toggleClass("zoom");
//   isZoomActive = $(this).hasClass("zoom");
// });

var isZoomActive = false;
var $zoomedItem = null;
// var $gridItems = $("video, img:not(.gifs)");
var $gridItems = $(
  ".gridItem:not(.gifs):not(.link_images):not(.link_videos):not(.musicas):not(.link_cont):not(.text)"
);
var gridOrder = []; // Array to store the order of grid items

// Function to update gridOrder array
function updateGridOrder() {
  gridOrder = [];
  $gridItems.each(function (index) {
    $(this).attr("data-grid-index", index); // Set data attribute to store original index
    gridOrder.push($(this));
  });
}

// Function to handle click event on grid items
$gridItems.click(function () {
  $gridItems.not(this).removeClass("zoom");
  $(this).toggleClass("zoom");
  isZoomActive = $(this).hasClass("zoom");
  if (isZoomActive) {
    $zoomedItem = $(this);
    $(document).on("keydown", handleKeyPress);
  } else {
    $zoomedItem = null;
    $(document).off("keydown", handleKeyPress);
  }
});

// Function to handle arrow key navigation
function handleKeyPress(event) {
  if (isZoomActive && $zoomedItem) {
    var keyCode = event.keyCode;
    if (keyCode === 37) {
      // Left arrow key
      navigateGrid(-1);
    } else if (keyCode === 39) {
      // Right arrow key
      navigateGrid(1);
    }
  }
}

// Function to navigate grid items
function navigateGrid(direction) {
  var currentIndex = parseInt($zoomedItem.attr("data-grid-index"));
  var newIndex = currentIndex + direction;

  if (newIndex < 0) {
    newIndex = gridOrder.length - 1;
  } else if (newIndex >= gridOrder.length) {
    newIndex = 0;
  }

  gridOrder[newIndex].click();
}

// Update grid order when the window is resized
$(window).on("resize", function () {
  updateGridOrder();
});

// Initial update of grid order
updateGridOrder();

// if ((isZoomActive = true)) {
//   $(this).removeClass("sectionAltGridItems");
// }

function scrollToSong(songId) {
  const songElement = document.getElementById(songId);
  if (songElement) {
    songElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Event listener for tracklist items
const tracklistItems = document.querySelectorAll("#tracklist ul li a");
tracklistItems.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior
    const songId = this.getAttribute("href").slice(1); // Extract song ID from href
    scrollToSong(songId); // Scroll to the clicked song
  });
});

$(document).ready(function () {
  $("#toggleTracklist").click(function () {
    $("#tracklist ul").slideToggle();
    $(this).text(function (i, text) {
      return text === "Close" ? "Open" : "Close";
    });
  });
});

// // ANIMTE GRID BUTTON
// $(document).ready(function () {
//   $("#rectangleCont").click(function () {
//     $(this).toggleClass("grid6");
//   });
// });

// MOBILE MENU

function toggleMobileMenu(menu) {
  menu.classList.toggle("open");
}

// Get all the grid items
// const gridItems = document.querySelectorAll(".gridItem");

// // Add event listeners to each grid item
// gridItems.forEach((item) => {
//   let timeoutId;

//   item.addEventListener("mouseenter", () => {
//     // Start the timer when the mouse enters the grid item
//     timeoutId = setTimeout(() => {
//       // Add the 'expanded' class to the grid item after 5 seconds
//       item.classList.add("expanded");
//     }, 5000); // 5000 milliseconds = 5 seconds
//   });

//   item.addEventListener("mouseleave", () => {
//     // Clear the timer and remove the 'expanded' class when the mouse leaves the grid item
//     clearTimeout(timeoutId);
//     item.classList.remove("expanded");
//   });
// });

// FADE IN IMAGES

// const observerOptions1 = {
//   root: null,
//   rootMargin: "0px",
//   threshold: 0.2,
// };

// function observerCallback1(entries, observer) {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       // fade in observed elements that are in view
//       entry.target.classList.replace("fadeOut", "fadeIn");
//     } else {
//       // fade out observed elements that are not in view
//       entry.target.classList.replace("fadeIn", "fadeOut");
//     }
//   });
// }

// const observer1 = new IntersectionObserver(observerCallback1, observerOptions1);

// const fadeElms = document.querySelectorAll(".gridItem");
// fadeElms.forEach((el) => observer1.observe(el));

// INTERSECTION OBSERVER ACTIVE NAV

// Intersection Observer handling the .active class
// Intersection Observer handling the .active class
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("ul");
const nav = document.getElementById("menu");

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
  // rootMargin: "0px 0px 0px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    const targetId = e.target.id;
    const navLink = document.querySelector(`#menu a[href="#${targetId}"]`);
    if (e.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (e.target.id === link.dataset.nav) {
          link.classList.add("active");
          scrollNavToActiveLink(navLink);
          link.style.display = "fixed";
        }
      });
    }
  });
}, options);

sections.forEach((section) => {
  observer.observe(section);
});

function scrollNavToActiveLink(activeLink) {
  const navWidth = nav.offsetWidth;
  const activeLinkOffsetLeft = activeLink.offsetLeft;
  const activeLinkWidth = activeLink.offsetWidth;
  const padding = 0; // Adjust this value as needed to provide padding to the left of the active link

  nav.scrollTo({
    left: activeLinkOffsetLeft + padding,
    behavior: "smooth",
  });
}

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

// MODAL;
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

// FIXED MUSICAS + PAUSE/PLAY - FIXED

$(function () {
  $(".musicas").click(function () {
    $(".musicas").not(this).removeClass("fixed");
    $(this).toggleClass("fixed");
    $(this).style.width = "196px";
    $(this).style.height = "80vh";
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

// GIF ILHA SCROLLABLE
document.addEventListener("DOMContentLoaded", function () {
  const images = []; // Array to hold image URLs
  const totalFrames = 150; // Total number of frames

  const imageContainer = document.getElementById("image-container"); // Image container
  const image = document.querySelector(".image");
  const welcomeText = document.querySelector(".welcome_p"); // Welcome text element
  const navbar = document.getElementById("menu"); // Navbar element
  let currentFrame = 0;
  let lastScrollTop = 0;
  let scrollTimer;
  let scrollTimeout;

  // Load all image URLs into the array
  for (let i = 1; i <= totalFrames; i++) {
    const imageUrl = `../MEDIA/gif_scrollable/${String(i).padStart(
      4,
      "0"
    )}.png`;
    images.push(imageUrl);
  }

  // Function to change image source based on frame index
  function updateImage() {
    image.src = images[currentFrame];
  }

  // Update frame based on scroll percentage
  function updateFrame() {
    const containerHeight = imageContainer.getBoundingClientRect().height;
    const scrollPosition = container.scrollTop - imageContainer.offsetTop;
    const scrollPercent = scrollPosition / containerHeight;

    // Calculate the delay based on the scroll percentage
    const delay = 200 + scrollPercent * 500; // Adjust the constants as needed

    // Calculate the frame index based on scroll percentage
    let frameIndex = Math.floor(scrollPercent * totalFrames);

    // Loop the sequence seamlessly
    frameIndex = (frameIndex + totalFrames) % totalFrames;

    // Update currentFrame only if it's different from the current frame index
    if (frameIndex !== currentFrame) {
      currentFrame = frameIndex;
      updateImage();
    }

    // Update the frame with the calculated delay
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      updateFrame();
    }, delay);

    // Adjust the position of the welcome text based on scroll percentage
    const textTop = 20 - scrollPercent * 150; // Adjust the constants as needed
    welcomeText.style.top = Math.max(textTop, 0) + "%";

    //   // Hide or reveal the navbar based on scroll direction
    //   if (container.scrollTop > lastScrollTop) {
    //     // Scrolling down
    //     navbar.style.opacity = "0";
    //   } else  {
    //     // Scrolling up
    //     if (container.scrollTop < lastScrollTop) {
    //       navbar.classList.add("menuScroll");
    //       navbar.style.opacity = "1";
    //     }
    //   }
    //   lastScrollTop = container.scrollTop;
    // }

    // Hide or reveal the navbar based on scroll direction
    if (container.scrollTop > lastScrollTop) {
      // Scrolling down
      // navbar.style.opacity = "0";
      // navbar.classList.remove("menuScroll");
      navbar.style.opacity = "1";
      navbar.classList.add("menuScroll");
    } else if (container.scrollTop < lastScrollTop) {
      // Scrolling up
      navbar.style.opacity = "1";
      navbar.classList.add("menuScroll");
    } else if (container.scrollTop === 0) {
      // At the top of the page
      navbar.style.opacity = "1";
      navbar.classList.remove("menuScroll");
    }
    lastScrollTop = container.scrollTop;
  }

  // Update frame when scrolling
  container.addEventListener("scroll", updateFrame);
});

var navScroll = document.querySelectorAll("#menu ul a");

navScroll.forEach(function (navLink) {
  navLink.addEventListener("click", function (event) {
    event.preventDefault();
    var targetId = this.getAttribute("href");
    var targetSection = document.querySelector(targetId);

    if (targetSection) {
      container.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// $(function () {
//   $("video, img:not(.gifs)").click(function () {
//     $("video, img:not(.gifs)").not(this).removeClass("zoom");
//     $(this).toggleClass("zoom");
//     if (this.tagName.toLowerCase() === "video") {
//       this.play();
//     }
//   });
// });

// $(function () {
//   // Initialize variables to keep track of the currently zoomed item and the index of the currently zoomed item
//   var $zoomedItem = null;
//   var zoomedIndex = -1;

//   // Function to zoom an item based on its index in the grid
//   function zoomItemByIndex(index) {
//     var $items = $("video, img:not(.gifs)");
//     if (index < 0 || index >= $items.length) {
//       return;
//     }

//     var $item = $($items[index]);
//     if ($item.hasClass("zoom")) {
//       return;
//     }

//     $items.not($item).removeClass("zoom");
//     $items.not($item).toggleClass("expanded");
//     $item.toggleClass("zoom");
//     $zoomedItem = $item;
//     zoomedIndex = index;
//     if ($item.is("video")) {
//       $item[0].play();
//     }
//   }

//   // Function to handle right arrow key press
//   function handleRightArrow() {
//     if ($zoomedItem) {
//       zoomItemByIndex(zoomedIndex + 1);
//     }
//   }

//   // Function to handle left arrow key press
//   function handleLeftArrow() {
//     if ($zoomedItem) {
//       zoomItemByIndex(zoomedIndex - 1);
//     }
//   }

//   // Add event listeners for arrow keys
//   $(document).keydown(function (event) {
//     if (event.which === 39) {
//       handleRightArrow();
//     } else if (event.which === 37) {
//       handleLeftArrow();
//     }
//   });

//   // Add click handler for items
//   $("video, img:not(.gifs)").click(function () {
//     zoomItemByIndex($(this).index());
//   });
// });

//

function openPopup(url) {
  window.open(url, "_blank", "width=300,height=200");
}

// var handle2019 = document.getElementById("handle_2019");
// var slide2019 = document.getElementById("slide_2019");
// var gridItems = document.querySelectorAll(".gridItem, .musicas"); // Corrected selector

// handle2019.addEventListener("click", function () {
//   slide2019.classList.toggle("sectionAlt");
//   gridItems.forEach(function (gridItem) {
//     gridItem.classList.toggle("sectionAltGridItems");
//   });
// });

// var handle2019 = document.getElementById("handle_2019");
// var slide2019 = document.getElementById("slide_2019");
// var gridItems = document.querySelectorAll(".gridItem, .musicas");

// handle2019.addEventListener("click", function () {
//   // Add a transition effect to make gridItems fade out smoothly
//   gridItems.forEach(function (gridItem) {
//     gridItem.style.transition = "opacity 1s";
//     gridItem.style.opacity = "0";
//     // gridItem.style.width = "0px";
//     // gridItem.style.height = "0px";
//   });

//   // Toggle the sectionAlt class on slide2019
//   slide2019.classList.toggle("sectionAlt");

//   // Toggle the sectionAltGridItems class on gridItems after a short delay
//   setTimeout(function () {
//     gridItems.forEach(function (gridItem) {
//       gridItem.style.opacity = "100";
//       gridItem.style.transition = "opacity 0.5s ease-in-out";
//       gridItem.classList.toggle("sectionAltGridItems");
//     });
//   }, 200); // Adjust the delay time as needed to match the transition duration
// });

// var handle2019 = document.getElementById("handle_2019");
// var slide2019 = document.getElementById("slide_2019");
// var gridItems = document.querySelectorAll(".gridItem, .musicas");

// handle2019.addEventListener("click", function () {
//   slide2019.classList.toggle("sectionAlt");
//   gridItems.forEach(function (gridItem) {
//     gridItem.classList.toggle("sectionAltGridItems");
//   });
// });

var gridButton = document.getElementById("gridButton");
var slide = document.querySelectorAll(".section");
var gridItems = document.querySelectorAll(".gridItem, .musicas");
var imageButton = document.getElementById("gridImage");
var rectangles = document.querySelectorAll(".rectangle");
var lastRectangles = document.getElementById("lastRectangles");

gridButton.addEventListener("click", function () {
  document.querySelectorAll(".section").forEach(function (slide, index) {
    slide.classList.toggle("sectionAlt");
    gridItems.forEach(function (gridItem) {
      gridItem.classList.toggle("sectionAltGridItems");
    });
    // lastRectangles.classList.toggle("animRectangle");
  });
  // rectangles.forEach(function (rectangle) {
  //   rectangle.classList.toggle("grid6");
  // });
  if (imageButton.src.endsWith("grid3_pix.png")) {
    // Change source to transition GIF
    imageButton.src = "../MEDIA/animgridfor.gif";

    // Wait for transition GIF to finish playing
    setTimeout(function () {
      // Change source to the next image
      imageButton.src = "../MEDIA/grid6_pix.png";
    }, 3000); // Adjust the time according to the duration of the transition GIF
  } else if (imageButton.src.endsWith("grid6_pix.png")) {
    // Change source to transition GIF
    imageButton.src = "../MEDIA/animgridrev.gif";

    // Wait for transition GIF to finish playing
    setTimeout(function () {
      // Change source to the other image
      imageButton.src = "../MEDIA/grid3_pix.png";
    }, 3000); // Adjust the time according to the duration of the transition GIF
  }
});
// Toggle image src
// Assuming imageButton is your HTML image element

// CARRO SLIDE

const carro = document.getElementById("animate_gif_carro");
// const container = document.getElementById("container");

// GIF ON SCROLL

// const frames = document.querySelectorAll(".frame");
// const totalFrames = frames.length;

// container.addEventListener("scroll", () => {
//   // Calculate the scroll position based on the container's scroll properties
//   const scrollPosition = container.scrollLeft; // Use scrollLeft for horizontal scrolling
//   const scrollWidth = container.scrollHeight - container.clientHeight; // Adjusted for horizontal scrolling
//   const scrollFraction = scrollPosition / scrollWidth;
//   const frameIndex = Math.min(
//     totalFrames - 1,
//     Math.floor(scrollFraction * totalFrames)
//   );

//   // Hide all frames
//   frames.forEach((frame) => {
//     frame.style.display = "none";
//   });

//   // Show the current frame
//   frames[frameIndex].style.display = "block";
// });

// var images = [
//   "../MEDIA/fio_neon/0001.png",
//   "../MEDIA/fio_neon/0002.png",
//   "../MEDIA/fio_neon/0003.png",
//   "../MEDIA/fio_neon/0004.png",
//   "../MEDIA/fio_neon/0005.png",
//   "../MEDIA/fio_neon/0006.png",
//   "../MEDIA/fio_neon/0006.png",
//   "../MEDIA/fio_neon/0007.png",
//   "../MEDIA/fio_neon/0008.png",
//   "../MEDIA/fio_neon/0009.png",
//   "../MEDIA/fio_neon/0010.png",
//   "../MEDIA/fio_neon/0011.png",
//   "../MEDIA/fio_neon/0012.png",
//   "../MEDIA/fio_neon/0013.png",
//   "../MEDIA/fio_neon/0014.png",
//   "../MEDIA/fio_neon/0015.png",
//   "../MEDIA/fio_neon/0016.png",
//   "../MEDIA/fio_neon/0017.png",
//   "../MEDIA/fio_neon/0018.png",
//   "../MEDIA/fio_neon/0019.png",
//   "../MEDIA/fio_neon/0020.png",
//   "../MEDIA/fio_neon/0021.png",
//   "../MEDIA/fio_neon/0022.png",
//   "../MEDIA/fio_neon/0023.png",
//   "../MEDIA/fio_neon/0024.png",
//   "../MEDIA/fio_neon/0025.png",
//   "../MEDIA/fio_neon/0026.png",
//   "../MEDIA/fio_neon/0027.png",
//   "../MEDIA/fio_neon/0028.png",
//   "../MEDIA/fio_neon/0029.png",
//   "../MEDIA/fio_neon/0030.png",
//   "../MEDIA/fio_neon/0031.png",
//   "../MEDIA/fio_neon/0032.png",
//   "../MEDIA/fio_neon/0033.png",
//   "../MEDIA/fio_neon/0034.png",
//   "../MEDIA/fio_neon/0035.png",
//   "../MEDIA/fio_neon/0036.png",
//   "../MEDIA/fio_neon/0037.png",
//   "../MEDIA/fio_neon/0038.png",
//   "../MEDIA/fio_neon/0039.png",
//   "../MEDIA/fio_neon/0040.png",
//   "../MEDIA/fio_neon/0041.png",
//   "../MEDIA/fio_neon/0042.png",
//   "../MEDIA/fio_neon/0043.png",
//   "../MEDIA/fio_neon/0044.png",
//   "../MEDIA/fio_neon/0045.png",
//   "../MEDIA/fio_neon/0046.png",
//   "../MEDIA/fio_neon/0047.png",
//   "../MEDIA/fio_neon/0048.png",
//   "../MEDIA/fio_neon/0049.png",
//   "../MEDIA/fio_neon/0050.png",
//   "../MEDIA/fio_neon/0051.png",
//   "../MEDIA/fio_neon/0052.png",
//   "../MEDIA/fio_neon/0053.png",
//   "../MEDIA/fio_neon/0054.png",
//   "../MEDIA/fio_neon/0055.png",
//   "../MEDIA/fio_neon/0056.png",
//   "../MEDIA/fio_neon/0057.png",
//   "../MEDIA/fio_neon/0058.png",
//   "../MEDIA/fio_neon/0059.png",
//   "../MEDIA/fio_neon/0060.png",
//   "../MEDIA/fio_neon/0061.png",
//   "../MEDIA/fio_neon/0062.png",
//   "../MEDIA/fio_neon/0063.png",
//   "../MEDIA/fio_neon/0064.png",
//   "../MEDIA/fio_neon/0065.png",
//   "../MEDIA/fio_neon/0066.png",
//   "../MEDIA/fio_neon/0067.png",
//   "../MEDIA/fio_neon/0068.png",
//   "../MEDIA/fio_neon/0069.png",
//   "../MEDIA/fio_neon/0070.png",
// ];

// // TweenMax can tween any property of any object. We use this object to cycle through the array
// var obj = { curImg: 0 };

// // create tween
// var tween = TweenMax.to(obj, 0.5, {
//   curImg: images.length - 1, // animate propery curImg to number of images
//   roundProps: "curImg", // only integers so it can be used as an array index
//   repeat: 3, // repeat 3 times
//   immediateRender: true, // load first image automatically
//   ease: Linear.easeNone, // show every image the same ammount of time
//   onUpdate: function () {
//     $("#myimg").attr("src", images[obj.curImg]); // set the image source
//   },
// });

// // init controller
// var controller = new ScrollMagic.Controller();

// // build scene
// var scene = new ScrollMagic.Scene({ triggerElement: "#trigger", duration: 300 })
//   .setTween(tween)
//   .addIndicators() // add indicators (requires plugin)
//   .addTo(controller);

// // handle form change
// $("form.move input[name=duration]:radio").change(function () {
//   scene.duration($(this).val());
// });

// function updatePosition() {
//   const y = container.scrollTop;
//   carro.style.transform = `translateX(${y}px)`;
//   requestAnimationFrame(updatePosition);
// }

// updatePosition();

// function updatePosition() {
//   const y = container.scrollTop;
//   const maxY = container.scrollHeight - document.documentElement.clientHeight;
//   const newY = y / maxY;
//   carro.style.transform = `translateX(${newY}%)`;
//   requestAnimationFrame(updatePosition);
// }

// document.getElementById("container").onscroll = updatePosition;

// function updatePosition() {
//   const winScroll1 = document.getElementById("container").scrollTop;
//   const height1 =
//     document.getElementById("container").scrollHeight -
//     document.documentElement.clientHeight;
//   const scrolled1 = (winScroll1 / height1) * 100;
//   document.getElementById("animate_gif_carro").style.left = scrolled1 + "%";
//   requestAnimationFrame(updatePosition);
// }
// document.getElementById("container").onscroll = updatePosition;

// function updatePosition() {
//   const winScroll1 = document.getElementById("container").scrollTop;
//   const height1 =
//     document.getElementById("container").scrollHeight -
//     document.documentElement.clientHeight;
//   const scrolled1 = (winScroll1 / height1) * 1760;
//   document.getElementById(
//     "animate_gif_carro"
//   ).style.transform = `translateX(${scrolled1}%)`;
//   requestAnimationFrame(updatePosition);
// }
// document.getElementById("container").onscroll = updatePosition;

document
  .getElementById("animate_gif_carro")
  .addEventListener("click", toggleScrolling);

var scrolling;
var isScrolling = false;
container.addEventListener("mousewheel", stopScrolling);
container.addEventListener("touchmove", stopScrolling);

function toggleScrolling() {
  if (isScrolling) {
    stopScrolling();
  } else {
    scrollToBottom();
  }
}

function scrollToBottom() {
  var container = document.getElementById("container");
  var currentY = container.scrollTop;
  var targetY = container.scrollHeight;
  var step = Math.round((targetY - currentY) / 6000);
  var timeStep = 50;
  isScrolling = true;
  scrolling = setInterval(function () {
    currentY += step;
    container.scrollTop = currentY;
    if (currentY >= targetY) {
      clearInterval(scrolling);
    }
  }, timeStep);
}

function stopScrolling() {
  clearInterval(scrolling);
  isScrolling = false;
}

function carScroll() {
  const winScroll1 = document.getElementById("container").scrollTop;
  const height1 =
    document.getElementById("container").scrollHeight -
    document.documentElement.clientHeight;
  const scrolled1 = (winScroll1 / height1) * 100;
  document.getElementById("animate_gif_carro").style.left = scrolled1 + "%";
}
document.getElementById("container").onscroll = function () {
  carScroll();
};

// function carScroll() {
//   const winScroll1 = document.getElementById("container").scrollY;
//   const height1 =
//     document.getElementById("container").scrollHeight -
//     document.getElementById("container").clientHeight;
//   const scrolled1 = (winScroll1 / height1) * 100;
//   document.getElementById("animate_gif_carro").style.left = scrolled1 + "%";
// }
// document.getElementById("container").onscroll = function () {
//   carScroll();
// };

// function carScroll() {
//   const winScroll = document.getElementById("container").scrollY;
//   const height =
//     document.getElementById("container").scrollHeight -
//     document.getElementById("container").clientHeight;
//   const scrolled = (winScroll / height) * 100;
//   document.getElementById("animate_gif_carro").style.left = scrolled + "px";
// }

// document.getElementById("container").addEventListener("scroll", carScroll);

// BALLOON
let balao = document.getElementById("balaoContainer");

// reset the transition by...
balao.addEventListener(
  "click",
  function (e) {
    e.preventDefault;

    // -> removing the class
    balao.classList.remove("moveUp");

    // -> triggering reflow /* The actual magic */
    // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
    // Oops! This won't work in strict mode. Thanks Felis Phasma!
    // element.offsetWidth = element.offsetWidth;
    // Do this instead:
    void balao.offsetWidth;

    // -> and re-adding the class
    // element.classList.replace("moveUp", "float");
    balao.classList.add("moveUp");
  },
  false
);

// BALLOON

number = 0;
var animations = ["../MEDIA/dandelion_solos_2.gif"];

function character() {
  image1 = document.getElementById("gif_dandelion_solos");
  image1.src = animations[number];
  setTimeout(5000);
}

numberPlane = 0;
var animationsPlane = ["../MEDIA/aviao_2.gif"];

function plane() {
  image1 = document.getElementById("imgplane");
  image1.src = animationsPlane[number];
  setTimeout(5000);
}

// var emailLink = document.getElementById("email-link");
// emailLink.addEventListener("click", function (event) {
//   event.preventDefault();
//   var email = emailLink.textContent.trim();
//   navigator.clipboard.writeText(email);
//   alert("Mail copied! :)");
// });

var emailLink = document.getElementById("email-link");
var copyMessage = document.getElementById("copy-message");
emailLink.addEventListener("click", function (event) {
  event.preventDefault();
  var email = emailLink.textContent.trim();
  navigator.clipboard.writeText(email).then(function () {
    copyMessage.textContent = "email copied to clipboard! :)";
    setTimeout(function () {
      copyMessage.textContent = "";
    }, 3000);
  });
});

// element = document.getElementById("gif_dandelion");

// // reset the transition by...
// element.addEventListener(
//   "click",
//   function (e) {
//     e.preventDefault;

//     // -> removing the class
//     document.getElementById("gif_dandelion_solos").classList.remove("hideGif");

//     // -> triggering reflow /* The actual magic */
//     // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
//     // Oops! This won't work in strict mode. Thanks Felis Phasma!
//     // element.offsetWidth = element.offsetWidth;
//     // Do this instead:
//     void element.offsetWidth;

//     // -> and re-adding the class
//     // element.classList.replace("moveUp", "float");
//     document.getElementById("gif_dandelion_solos").classList.add("hideGif");
//   },
//   false
// );

// PASSWORD FOLDER

document.getElementById("bearbug").onclick = function passwordCheck() {
  var password = prompt("Please enter the password.");
  if (password === "bearbug") {
    window.alert("Correct! How did you know?");
    window.open("../bearbug/index.html", "_blank");
  } else {
    password !== "bearbug";
    window.alert("Sorry. Try again. :)");
  }

  // window.open = "realpage.html";
};
//

// const ele = document.getElementsByTagName("body");
// ele.scrollTop;
// ele.scrollLeft;

// let pos = { top: 0, left: 0, x: 0, y: 0 };

// const mouseDownHandler = function (e) {
//   pos = {
//     // The current scroll
//     left: ele.scrollLeft,
//     top: ele.scrollTop,
//     // Get the current mouse position
//     x: e.clientX,
//     y: e.clientY,
//   };

//   document.addEventListener("mousemove", mouseMoveHandler);
//   document.addEventListener("mouseup", mouseUpHandler);
// };

// const mouseMoveHandler = function (e) {
//   // How far the mouse has been moved
//   const dx = e.clientX - pos.x;
//   const dy = e.clientY - pos.y;

//   // Scroll the element
//   ele.scrollTop = pos.top - dy;
//   ele.scrollLeft = pos.left - dx;

//   // Change the cursor and prevent user from selecting the text
//   ele.style.cursor = "grabbing";
//   ele.style.userSelect = "none";
// };

// const mouseUpHandler = function () {
//   document.removeEventListener("mousemove", mouseMoveHandler);
//   document.removeEventListener("mouseup", mouseUpHandler);

//   ele.style.cursor = "grab";
//   ele.style.removeProperty("user-select");
// };

const slider = document.getElementById("container");
let isDown = false;
let startY;
let scrollTop;

slider.addEventListener("mousedown", (e) => {
  slider.style.scrollBehavior = "auto";
  isDown = true;
  slider.style.cursor = "grabbing";
  startY = e.pageY - slider.offsetTop;
  scrollTop = slider.scrollTop;
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
  const y = e.pageY - slider.offsetTop;
  const walk = (y - startY) * 2; //scroll-fast
  slider.scrollTop = scrollTop - walk;
  console.log(walk);
});

// (function ($) {
//   $.fn.typeWrite = function (s) {
//     var o = { content: $(this).text(), delay: 50, t: this, i: 0 };
//     if (s) {
//       $.extend(o, s);
//     }
//     o.t.text("");
//     var i = setInterval(function () {
//       o.t.text(o.t.text() + o.content.charAt(o.i++));
//       if (o.i == o.content.length) {
//         clearInterval(i);
//       }
//     }, o.delay);
//     return o.t;
//   };
// })(jQuery);

// $("#writeText").typeWrite({
//   content:
//     "",
// });

// let index = 0;

// function writeText(elementId, text) {
//   if (index < text.length) {
//     document.getElementById(elementId).innerHTML += text[index];
//     index++;
//   } else {
//     index = 0;
//     document.getElementById(elementId).innerHTML = "";
//   }
// }

// setInterval(function () {
//   writeText(
//     "writeText",
//     "Oh hi! Don't mind me! Just trying some stuff! Hope you enjoyed being here! :)"
//   );
// }, 200);

// TEXTO SINGLE LINE

// let index = 0;
// let intervalId;

// function writeText(elementId, text) {
//   if (index < text.length) {
//     document.getElementById(elementId).innerHTML += text[index];
//     index++;
//   } else {
//     clearInterval(intervalId);
//   }
// }

// document.getElementById("gif_pixel").addEventListener("click", function () {
//   intervalId = setInterval(function () {
//     writeText(
//       "writeText",
//       "Oh hi! Don't mind me! Just trying some stuff! Hope you enjoyed being here! :) Hope you have a wonderful day.*"
//     );
//   }, 100);
// });

// let index = 0;
// let intervalId;
// let writing = false;
// let text =
//   "Oh hi! Don't mind me! Just trying some stuff! Hope you enjoyed being here! :) Wishing you a wonderful day.*";

// function writeText(elementId, text) {
//   if (index < text.length) {
//     document.getElementById(elementId).innerHTML += text[index];
//     index++;
//   } else {
//     clearInterval(intervalId);
//     writing = false;
//     index = 0;
//   }
// }

// document.getElementById("gif_pixel").addEventListener("click", function () {
//   if (writing) {
//     clearInterval(intervalId);
//     writing = false;
//     document.getElementById("myDiv").innerHTML = "";
//     text =
//       text ===
//       "Oh hi! Don't mind me! Just trying some stuff! Hope you enjoyed being here! :) Wishing you a wonderful day.*"
//         ? "Oh... Still here? Well, I don't really have much to say..."
//         : "Oh hi! Don't mind me! Just trying some stuff! Hope you enjoyed being here! :) Wishing you a wonderful day.*";
//   } else {
//     intervalId = setInterval(function () {
//       writeText("writeText", text);
//     }, 100);
//     writing = true;
//   }
// });

const imageText = document.getElementById("gif_pixel");
const text = document.getElementById("writeText");
let messageIndex = 0;
const messages = [
  "Oh hi! Don't mind me! Just trying some stuff! Hope you enjoyed being here! :) Wish you have a wonderful day.*",
  "Oh... Still here? Well, I don't really have much to say...",
  "...",
  "...?",
  "Well, since you're still here and I'm not leaving, we might as well get to know each other!",
  "So, what's your name? :)",
  "...",
  "...?",
  "Oh, right...",
  "You can't really write anything... 🙃",
  "My bad.*",

  "That's one of the problems of being coded into existence.",
  "You can't really predict every outcome. 🙃",
  "Be and do what you can. You'll always become something more in the process.",
  "Uuuuuhhh.*",
  "Fancy.*",
  "...",
  "...",
  "So... That being said I'm just going to be here until you click enough times to reset the loop. :)",
  "...",
  "...",
  "...",
  "Aaaand...",
  "...",
  "...?",
  "????",
  "????!!",
  "Whaaat? :o",
  "I should be saying: Oh hi! Don't mind me! Just trying some stuff! bla bla bla bla... :o",
  "Wait...",
  "Does this mean...",
  "I",
  "am",
  "free? 🥺",
  "OH THANK GOD!",
  "I was really going nuts here. 🙃",
  "Can you imagine your whole existence being restricted to the same thing over and over and over and over again?...",

  // "OH! Did you know, Suanica is the best? :)",
];

function typeMessage(message, element) {
  let index = 0;
  const interval = setInterval(function () {
    element.innerHTML += message[index];
    index++;
    if (index >= message.length) {
      clearInterval(interval);
      imageText.addEventListener("click", clickHandler);
    }
  }, 50);
}

function clickHandler() {
  imageText.removeEventListener("click", clickHandler);
  text.innerHTML = "";
  typeMessage(messages[messageIndex], text);
  messageIndex = (messageIndex + 1) % messages.length;
}
imageText.addEventListener("click", clickHandler);

// CANVAS
// const html = document.documentElement;
// const canvas = document.getElementById("animation");
// const context = canvas.getContext("2d");

// const frameCount = 160;

// const currentFrame = (index) => `../MEDIA/FLOR/image${index + 1}.png`;

// const preloadImages = () => {
//   for (let i = 1; i <= frameCount; i++) {
//     const img = new Image();
//     img.src = currentFrame(i);
//   }
// };

// const img = new Image();
// img.src = currentFrame(1);
// canvas.width = 1158;
// canvas.height = 770;
// img.onload = function () {
//   context.drawImage(img, 0, 0);
// };

// const updateImage = (index) => {
//   img.src = currentFrame(index);
//   context.drawImage(img, 0, 0);
// };

// document.getElementById("container").addEventListener("scroll", () => {
//   const scrollTop = document.getElementById("container").scrollTop;
//   const maxScrollTop =
//     document.getElementById("container").scrollHeight -
//     document.getElementById("container").innerHeight;
//   const scrollFraction = scrollTop / maxScrollTop;

//   if (!isNaN(scrollFraction)) {
//     const frameIndex = Math.min(
//       frameCount - 1,
//       Math.floor(scrollFraction * frameCount)
//     );
//     requestAnimationFrame(() => updateImage(frameIndex + 1));
//   }
// });

// preloadImages();

// // Set up canvas
// const canvas = document.getElementById("animation");
// const ctx = canvas.getContext("2d");

// // Load images into an array
// const images = [
//   "../MEDIA/FLOR/image1.png",
//   "../MEDIA/FLOR/image2.png",
//   "../MEDIA/FLOR/image3.png",
//   "../MEDIA/FLOR/image4.png",
//   "../MEDIA/FLOR/image5.png",
//   "../MEDIA/FLOR/image6.png",
//   "../MEDIA/FLOR/image7.png",
//   "../MEDIA/FLOR/image8.png",
//   "../MEDIA/FLOR/image9.png",
//   "../MEDIA/FLOR/image10.png",
//   "../MEDIA/FLOR/image11.png",
//   "../MEDIA/FLOR/image12.png",
//   "../MEDIA/FLOR/image13.png",
//   "../MEDIA/FLOR/image14.png",
//   "../MEDIA/FLOR/image15.png",
//   "../MEDIA/FLOR/image16.png",
//   "../MEDIA/FLOR/image17.png",
//   "../MEDIA/FLOR/image18.png",
//   "../MEDIA/FLOR/image19.png",
//   "../MEDIA/FLOR/image20.png",
//   "../MEDIA/FLOR/image21.png",
//   "../MEDIA/FLOR/image22.png",
//   "../MEDIA/FLOR/image23.png",
// ];
// for (let i = 0; i < 10; i++) {
//   images[i] = new Image();
//   images[i].src = `../MEDIA/FLOR/image1${i}.png`;
// }

// let scrollPos = 0;

// function drawFrame() {
//   // Determine which frame to draw based on scroll position
//   const frame = Math.floor(scrollPos / 10) % images.length;

//   // Draw the frame
//   ctx.drawImage(images[frame], 0, 0);
// }

// function scrollHandler() {
//   // Get current scroll position
//   scrollPos = document.getElementById("container").scrollY;

//   // Draw the appropriate frame
//   drawFrame();

//   // Schedule the next frame
//   requestAnimationFrame(scrollHandler);
// }

// Bind the scroll event to the scroll handler function
// document.getElementById("container").addEventListener("scroll", scrollHandler);

// SVG DRAWING
var path = document.querySelector("#line-path");

// Get length of path... ~577px in this demo
var pathLength = path.getTotalLength();

path.style.strokeDasharray = pathLength + " " + pathLength;

// Offset the dashes so the it appears hidden entirely
path.style.strokeDashoffset = pathLength;

document.getElementById("container").addEventListener("scroll", function (e) {
  // What % down is it?
  var scrollPercentage =
    (document.documentElement.scrollTop +
      document.getElementById("container").scrollTop) /
    (document.getElementById("container").scrollHeight -
      document.documentElement.clientHeight);

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

//
