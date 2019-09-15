var shows = ["The Office", "Parks and Rec", "Loony Toons", "The Good Place", "Friends", "Its Always Sunny", "House MD", "Game of Thrones", "Seinfeld", "Workaholics"]

function appendButtons() {
    //clearing that div so it wont appends twice. the goal of this function is to clear and reappend every one in the array every single time it's called.
    $(".buttonsHere").empty();
    //loop through array, append buttons for array items.
    for (let i = 0; i < shows.length; i++) {
        var buttons = $("<button>");
        //setting the buttons classes and type to bootstrap.
        buttons.attr("type", "button");
        buttons.addClass("btn btn-dark");
        buttons.text(shows[i])
        $(".buttonsHere").append(buttons)
    }
}
appendButtons()

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
$(document).on("click", "button", function () {
    var show = $(this).text().trim();
    console.log(show)
    // ask how to target rating
    // var rating = $(document)
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=wBCi3R0zS2IBZBegGU2ND9oIM6BWFETs&q=" + show + "&limit=10&offset=0&rating=PG-13&lang=en"

    //ajax call for newly built url based on button clicked.
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(".gifsHere").empty();
        console.log(response);
        for (let i = 0; i <= 9; i++) {
            //create variables for all things being pulled.
            let gifUrlStatic = response.data[i].images.fixed_width_still.url;
            let gifUrlAnimated = response.data[i].images.fixed_width.url;
            let rating = response.data[i].rating;
            //create div to hold each gif and it's rating
            let gifDiv = $("<div class='gifsDiv'>")
            var img = $("<img class='gifs img-responsive'>")
            img.attr("src", gifUrlStatic);
            img.attr("data-state", "still");
            img.attr("data-still", gifUrlStatic);
            img.attr("data-animate", gifUrlAnimated);
            gifDiv.append(img);
            $(".gifsHere").append(gifDiv);
        };
    })
})

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
$(document).on("click", "img", function(){
    //retrieving the img's state to use below
    var state = $(this).attr("data-state")
    //if else for data state and src swapping
    //using true/false based off "still" or "animate"
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr ("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
    }
})

// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

// 6. Add a form to your page that takes a value from a user input box and adds it to your `topics` array. Then make a function call that takes each topic in the array and remakes the buttons on the page.