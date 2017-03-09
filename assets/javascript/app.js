$(document).ready(function() {

  var topics = ["penguin", "eagle", "parrot", "flamingo"];


  function display(){

    var gifTopic = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifTopic + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log("query "+queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
        console.log("response is " +response);
        var results = response.data;

        var mainDiv = $("<div>");
        mainDiv.addClass("mainSection")
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
          mainDiv.prepend(topicDiv);
        }
        $("#gifArea").html(mainDiv);
      });
    };


  function createButtons (){

    $("#buttonArea").empty();
    for(var i = 0; i < topics.length; i++){
      var button = $("<button>");
      button.addClass("topic");
      button.attr("data-name", topics[i]);
      button.text(topics[i]);
      $("#buttonArea").append(button);
    }
  };

  function startStop(){

    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-start"));
      $(this).attr("data-state", "active");
    } else {
      $(this).attr("src", $(this).attr("data-stop"));
      $(this).attr("data-state", "still");
    }
  };

  $(document).on("click", ".topic", display);

  $(document).on("click", ".gif", startStop);


  createButtons();

});
