$(document).ready(function () {
    var shows = ["The Office", "Parks and Rec", "Loony Toons", "The Good Place", "Friends", "Its Always Sunny", "House MD", "Game of Thrones", "Seinfeld", "Workaholics"]

    function appendButtons() {
        //clearing that div so it wont append twice. the goal of this function is to clear and reappend every one in the array every single time it's called.
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
    //calling this so my page starts out with buttons for the default array.
    appendButtons()

    //when a buttons clicked, it runs the ajax call and creates new divs and classes for the images.
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
                let gifDiv = $("<div class='gifsDiv row'>")
                //create the img, and adding all it's attr's below.
                var img = $("<img class='gifs img-responsive'>")
                // these attrs will be used to data-state swap from animated to still images.
                img.attr("src", gifUrlStatic);
                img.attr("data-state", "still");
                img.attr("data-still", gifUrlStatic);
                img.attr("data-animate", gifUrlAnimated);
                gifDiv.append(img);
                $(".gifsHere").append(gifDiv);
                //now to prepend the rating to the gifDiv.
                let p = $("<p>");
                p.text("Maturity Rating: " + rating);
                gifDiv.append(p)
            };
        })
    })
    // state swapping from still image url to animated image url on click
    $(document).on("click", "img", function () {
        //retrieving the img's state to use below
        var state = $(this).attr("data-state")
        //if else for data state and src swapping
        //using true/false based off "still" or "animate"
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }
    })
    //adding the text box values to the array, so it can be run through the ajax call.
    $("#submitBtn").on("click", function () {
        // event.preventDefault()
        let newVal = $("#newVal").val().trim()
        shows.push(newVal)
        appendButtons()
    });
});