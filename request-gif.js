

$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});


/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the 
 * user's search term (along with "jackson 5")
 * 
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {
    
    // This prevents the form submission from doing what it normally does: send a request (which would cause our
    // page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely
    // don't want the page to refresh.
    event.preventDefault();
    
    // get the user's input text from the DOM
    var searchQuery = $("input[name='tag']").val(); // TODO should be e.g. "dance"
    var numJacksons = $("input[name='botcheck']").val();
    var botMsg = "";                                // Define the bot message

    // Ensure that there is a value in both fields and the bot check field
    // is valid
    if ((numJacksons != 5) || (searchQuery == "")) {

        // Set the bot check error message and display
        botMsg = "No gifs for you!"
//      $("#feedback").text(botMsg);

        displayError(botMsg)
//      setGifLoadedStatus(false);
        return;                                     // Return to prevent further execution
    } else {
        clearError("");
    }

    // configure a few parameters to attach to our request
    var params = { 
        api_key: "dc6zaTOxFJmzC", 
        tag : "jackson 5 " + searchQuery // TODO should be e.g. "jackson 5 dance"
    };
    
    // make an ajax request for a random GIF
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/random", // TODO where should this request be sent?
        data: params, // attach those extra parameters onto the request
        success: function(response) {
            // if the response comes back successfully, the code in here will execute.
            
            // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
//          console.log("we received a response!");
//          console.log(response);

            var imgSrc = response.data.image_url;

            // TODO
            // 1. set the source attribute of our image to the image_url of the GIF
            // 2. hide the feedback message and display the image
            $("#gif").attr('src',imgSrc);
            setGifLoadedStatus(true);
            $("#feedback").text("");

        },
        error: function() {
            // if something went wrong, the code in here will execute instead of the success function
            // give the user an error message
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });
    
    // TODO
    // give the user a "Loading..." message while they wait
    $("#feedback").text("Your image is loading...");
    setGifLoadedStatus(false);    
}


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}

/*
 * clearError
 *
 * Undisplays the error message and removes the red CSS style
 */
function clearError(message) {
    $(".error-message").text("");
}

/**
 * displayError
 *
 * Displays an error message on the text input, and colors it red
 */
function displayError(message) {
    $(".error-message").text(message);

}