$(document).ready(function() {

  var topics = ["penguin", "eagle", "parrot", "flamingo"];


  function display(){

    var gifTopic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifTopic + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
        var results = response.data;

        var mainDiv = $("<div>");
        mainDiv.addClass("mainSection");
        for (var i = 0; i < results.length; i++) {
          var topicDiv = $("<div>");
          topicDiv.addClass("topic-div");
          var topicRating = $("<p>").text("Rating: " + results[i].rating);
          var topicImg = $("<img>");
          topicImg.addClass("gif");
          topicImg.attr("data-state", "still");
          topicImg.attr("data-stop", results[i].images.fixed_height_still.url);
          topicImg.attr("data-start", results[i].images.fixed_height.url);
          topicImg.attr("src", results[i].images.fixed_height_still.url);
          topicDiv.append(topicRating);
          topicDiv.append(topicImg);
          mainDiv.append(topicDiv);
        }
        $("#gifArea").html(mainDiv);
      });
    }


  function createButtons (){

    $("#buttonArea").empty();
    for(var i = 0; i < topics.length; i++){
      var button = $("<button>");
      button.addClass("topic").addClass("btn btn-primary");
      button.attr("data-name", topics[i]);
      button.text(topics[i]);
      $("#buttonArea").append(button);
    }
  }

  function startStop(){

    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-start"));
      $(this).attr("data-state", "active");
    } else {
      $(this).attr("src", $(this).attr("data-stop"));
      $(this).attr("data-state", "still");
    }
  }

  $("#add-topic").on("click", function(event) {

    event.preventDefault();
    var newButton = $("#topic-input").val().trim();
    topics.push(newButton);
    createButtons();
  });

  $(document).on("click", ".topic", display);

  $(document).on("click", ".gif", startStop);


  createButtons();

});
