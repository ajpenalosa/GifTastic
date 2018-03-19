
// GIPHY API Key
var APIKey = "C5cZ4WxTowpUO5MmUqO7BVQ3QLwg8zxx";

// Array of cars
var cars = ["corolla", "camry", "sienna", "rav4", "4runner", "tesla", "civic", "accord", "crv", "highlander", "land rover", "is 250", "is 350", "s2000", "mini cooper", "countryman", "ridgeline", "sentra", "versa", "maxima"];

// Function for displaying car data
function renderButtons() {

    // Empties car-buttons div when adding new cars
    $(".car-buttons").empty();

    // Looping through the array of cars
    for ( var i = 0; i < cars.length; i++ ) {

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

    var limit = 10;
    var car = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + car + "&limit=" + limit;

    // Creating an AJAX call for the specific car button being clicked
    $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {

        // Empties gifs-wrapper div when adding new cars
        $(".gifs-wrapper").empty();

        // Loop through API data
        for ( var i = 0; i < response.data.length; i++ ) {

            // Create reference to gifs-wrapper
            var gifsWrapper = $(".gifs-wrapper");

            // Store rating data
            var rating = response.data[i].rating;

            // Store animated image
            var imageAnimated = response.data[i].images.fixed_height.url;

            // Store still image
            var imageStill = response.data[i].images.fixed_height_still.url;

            // Create a div to hold the car items
            var carItemDiv = $("<div class='car-item'>");

            // Append car div to gifs-wrapper
            gifsWrapper.append(carItemDiv);

            // Creating an element to hold the rating
            var pRating = $("<p>").text("Rating: " + rating);

            // Append car div to gifs-wrapper
            carItemDiv.append(pRating);

            // Creating an element to hold the image
            var image = $("<img>").attr("src", imageAnimated);

            // Append car div to gifs-wrapper
            carItemDiv.append(image);
            
        }
        
    console.log(response.data);

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