
// GIPHY API Key
var APIKey = "C5cZ4WxTowpUO5MmUqO7BVQ3QLwg8zxx";

// Array of cars
var cars = ["corolla", "camry", "sienna", "rav4", "4runner", "tesla", "civic", "accord", "crv", "highlander", "land rover", "is 250", "is 350", "s2000", "mini cooper", "countryman", "ridgeline", "sentra", "versa", "maxima"];

// Function for displaying car data
function renderButtons() {

    // Empties car-buttons div when adding new cars
    $(".car-buttons").empty();

    // Looping through the array of cars
    for (var i = 0; i < cars.length; i++) {

        // Dynamically generating buttons for each car in the array
        var a = $("<button>");
        // Adding a class of car to the button
        a.addClass("car btn btn-primary");
        // Adding a data-attribute
        a.attr("data-name", cars[i]);
        // Providing the initial button text
        a.text(cars[i]);
        // Adding the button to the car-buttons div
        $(".car-buttons").append(a);
    }
};

// Calling the renderButtons function to display the initial buttons
renderButtons();

// displayCarGIFs function re-renders the HTML to display the appropriate content
function displayCarGIFs() {

  var car = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + car;

  // Creating an AJAX call for the specific car button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
      
    console.log(queryURL);

  });
};

// This function handles events where a car button is clicked
$("#add-car").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the text box
  var addCar = $("#car-input").val().trim();

  // Adding car from the text box to our array
  cars.push(addCar);

  // Calling renderButtons which handles the processing of our cars array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "car"
$(document).on("click", ".car", displayCarGIFs);