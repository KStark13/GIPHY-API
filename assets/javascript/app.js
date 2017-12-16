$( document ).ready(function() {
// ARRAY OF FANDOMS; NEW FANDOMS WILL BE PUSHED TO THIS ARRAY
 var fandoms = ["Doctor Who", "Harry Potter", "Sherlock", "The Walking Dead", "Supernatural", "Star Wars", "Buffy the Vampire Slayer"]

// FUNCTION THAT DISPLAYS ALL GIF BUTTONS
function displayGifButtons(){
    $("#gifButtonsView").empty(); 
    for (var i = 0; i < fandoms.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("fandom");
        gifButton.addClass("btn")
        gifButton.attr("data-name", fandoms[i]);
        gifButton.text(fandoms[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
// FUNCTION TO ADD A NEW FANDOM BUTTON
function addNewButton(){
    $("#addGif").on("click", function(){
    var fandom = $("#fandom-input").val().trim();
    //IF VALUE BLANK, WILL NOT CREATE A NEW BUTTON
    if (fandom == ""){
      return false; 
    }
    fandoms.push(fandom);

    displayGifButtons();
    return false;
    });
}

// FUNCTION THAT DISPLAYS ALL GIFS
function displayGifs(){
    var fandom = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + fandom + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        $("#gifsView").empty();
        var results = response.data; 
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){
            //DIV FOR GIFS TO GO IN
            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
           //RATING OF GIFS
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
         
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);
         
            $("#gifsView").prepend(gifDiv);
        }
    });
}
// CALLING FUNCTIONS
displayGifButtons(); 
addNewButton();

// EVENT LISTENERS
$(document).on("click", ".fandom", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});




  