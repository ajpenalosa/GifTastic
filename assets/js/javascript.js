$(document).ready(function() {

    // GIPHY API Key
    var APIKey = "C5cZ4WxTowpUO5MmUqO7BVQ3QLwg8zxx";

    // Cars array
    var cars = ["corolla", "camry", "rav4", "4runner", "tesla", "civic", "accord", "land rover", "is 250", "is 350", "s2000", "mini cooper", "countryman", "ridgeline", "sentra", "versa", "maxima", "mazda3", "mazda6", "f-150"];

    // Reference to modal elements
    var modalBody = $(".modal-body");
    var modalTitle = $('.modal-title');

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

            console.log(response);

            // Empties gifs-wrapper div when adding new cars
            $(".gifs-wrapper").empty();

            // Loop through API data
            for ( var i = 0; i < response.data.length; i++ ) {

                // Create reference to gifs-wrapper
                var gifsWrapper = $(".gifs-wrapper");

                // Store title data
                var gifTitle = response.data[i].title;

                // Store rating data
                var rating = response.data[i].rating;

                // Store animated image
                var imageAnimate = response.data[i].images.fixed_height.url;

                // Store still image
                var imageStill = response.data[i].images.fixed_height_still.url;

                // Store original image
                var imageOriginal = response.data[i].images.original.url;

                // Create a div to hold the car items
                var carItemDiv = $("<div class='car-item col-md-6 col-lg-4 text-center' data-toggle='modal' data-target='#large-gif'>");

                // Append car div to gif-div
                gifsWrapper.append(carItemDiv);

                if (gifTitle) {
                    displayedTitle = gifTitle;
                }
                else {
                    displayedTitle = "No Title";
                }

                // Creating Title
                var pTitle = $("<p class='displayed-title'>").html(displayedTitle);

                // Creating an element to hold the rating
                var pRating = $("<p>").html("Rating: <span class='rating'>" + rating + "</span>");

                // Append rating to car div
                carItemDiv.append(pTitle, pRating);

                // Creating an element to hold the image
                var image = $("<img class='car-image img-fluid'>");

                // Setting image attributes
                image.attr("src", imageStill);
                image.attr("data-state", "still");

                // Setting data attributes on the car div
                carItemDiv.attr("data-original", imageOriginal);
                carItemDiv.attr("data-rating", rating);
                carItemDiv.attr("data-title", gifTitle);
                carItemDiv.attr("data-still", imageStill);
                carItemDiv.attr("data-animate", imageAnimate);

                // Append car div to gifs-wrapper
                carItemDiv.append(image);
                
            };

        });
    };

    // This function handles events where add car button is clicked
    $("#add-car").on("click", function(event) {

        event.preventDefault();

        // This line grabs the input from the text box
        var addCar = $("#car-input").val().trim();

        // Push input to cars array if field is not blank and does not exist already
        if ( addCar !== "" && !cars.includes(addCar)) {

            // Adding car from the text box to our array
            cars.push(addCar);
        }

        // Calling renderButtons which handles the processing of our cars array
        renderButtons();

    });

    // Adding a click event listener to all elements with a class of "car"
    $(document).on("click", ".car", displayCarGIFs);


    $(document).on("mouseover", ".car-item", function() {

        // Plays gif when you mouse over the div
        $(this).children("img").attr("src", $(this).attr("data-animate"));

        // Empties modal body
        modalBody.empty();

        // Puts title of gif in header of modal
        modalTitle.html($(this).attr("data-title"));

        // Creates image to hold large size gif
        var originalSize = $("<img class='img-fluid'>");
        originalSize.attr("src", ($(this).attr("data-original")));

        // Creates paragraph tag with rating of gif
        var gifP = $("<p>").text("Rating: " + $(this).attr("data-rating"));

        // Append to modal body
        modalBody.append(originalSize);
        modalBody.append(gifP);

    });

    // Pauses gif when mouse leaves div
    $(document).on("mouseleave", ".car-item", function() {

        $(this).children("img").attr("src", $(this).attr("data-still"));

    });
    
}); // End of Document Ready