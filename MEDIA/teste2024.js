// Get all elements with the class 'container'
var containers = document.querySelectorAll(".container");

// Add click event listener to each container
containers.forEach(function (container) {
  container.addEventListener("click", function () {
    // Toggle the 'expanded' class for the clicked container
    container.classList.toggle("expanded");
  });
});

var handle2019 = document.getElementById("handle_2019");
var slide2019 = document.getElementById("slide_2019");
var gridItems = document.querySelectorAll("gridItem", "musicas");

handle2019.addEventListener("click", function () {
  slide2019.classList.toggle("sectionAlt");
  gridItems.forEach(function (gridItem) {
    gridItem.classList.toggle("sectionAltGridItems");
  });
});
