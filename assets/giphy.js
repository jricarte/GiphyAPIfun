var topics = ["michael scott", "dwight schrute", "jim halpert", "pam beesly", "ryan howard", "andy bernard", "kevin malone"]
var employeeBtn;
var employeeImage;

function createButtons() {

    $("#employee-btn-div").empty();

    for (var i = 0; i < topics.length; i++) {
        var employeeBtn = $("<button>");
        employeeBtn.text(topics[i]);
        employeeBtn.attr("data-name", topics[i]);
        employeeBtn.addClass("btn btn-primary p-2 mr-3 mb-2 employee-btn");
        $("#employee-btn-div").append(employeeBtn);
    }
}
function displayemployeeImages() {
    $("#results-div-col1").empty();
    $("#results-div-col2").empty();
    $("#results-div-col3").empty();
    $("#click-to-play-text").empty();

    var employee = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + employee + "&api_key=9mAsKqpBaIbarLevgyUcEAKxPfm4euyi&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .done(function (response) {
            console.log(response);
            var results = response.data;
            $("#click-to-play-text").append("<h4>" + "Click a gif to play. Click again to pause." + "</h4>");

            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var employeeImage = $("<img>");
                    employeeImage.attr("src", results[i].images.fixed_height_still.url);
                    employeeImage.attr("data-still", results[i].images.fixed_height_still.url);
                    employeeImage.attr("data-animate", results[i].images.fixed_height.url);
                    employeeImage.attr("data-state", "still");
                    employeeImage.addClass("img-fluid gif border border-primary");

                    gifDiv.prepend(p);
                    gifDiv.prepend(employeeImage);

                    if (i >= 0 && i < 3) {
                        $("#results-div-col1").append(gifDiv);
                    }

                    else if (i >= 3 && i < 7) {
                        $("#results-div-col2").append(gifDiv);
                    }

                    else {
                        $("#results-div-col3").append(gifDiv);
                    }
                }
            }

            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                }
                else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
}

$("#submit-button").on("click", function (event) {

    event.preventDefault();
    var employeeInput = $("#employee-input").val().toLowerCase();

    $("#employee-input").val("");

    if (topics.indexOf(employeeInput) > -1) {
        alert(employeeInput + " is already available.");
    }

    else if (employeeInput === "" || employeeInput === null) {
        return false;
    }

    else if (topics.indexOf(employeeInput) === -1) {
        topics.push(employeeInput);
        console.log(topics);
        createButtons();
    }
});

createButtons();

$(document).on("click", ".employee-btn", displayemployeeImages);
