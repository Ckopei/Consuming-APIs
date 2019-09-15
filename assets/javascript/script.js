//Below is my queryURL and my API key
//https://api.giphy.com/v1/gifs/search?api_key=wBCi3R0zS2IBZBegGU2ND9oIM6BWFETs&q=cats&limit=10&offset=0&rating=Y&lang=en
//ratings are Y, G, PG, PG-13, R


//1. Before you can make any part of your site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
var shows = ["The Office", "Parks and Rec", "Loony Toons", "The Good Place", "Friends", "Its Always Sunny", "House MD", "Game of Thrones", "Seinfeld", "Workaholics"]
// * We chose animals for our theme, but you can make a list to your own liking.

// $("button").on("click", function () {
//     $.ajax({
//         url: "https://api.giphy.com/v1/gifs/search?api_key=wBCi3R0zS2IBZBegGU2ND9oIM6BWFETs&q=the office&limit=10&offset=0&rating=G&lang=en",
//         method: "GET"
//     }).then(function (response) {
//         console.log(response)
//     })
// })


// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.
function appendButtons() {
    //clearing that div so it wont appends twice. the goal of this function is to clear and reappend every one in the array every single time it's called.
    $("#buttonsHere").empty();
    //loop through array, append buttons for array items.
    for (let i = 0; i<shows.length; i++) {
        var buttons = $("<button");
        //setting the buttons classes and type to bootstrap.
        buttons.attr("type", "button");
        buttons.addClass("btn btn-dark");
        buttons.text(shows[i])
        $("#buttonsHere").append(buttons)
    }
}

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

// 6. Add a form to your page that takes a value from a user input box and adds it to your `topics` array. Then make a function call that takes each topic in the array and remakes the buttons on the page.