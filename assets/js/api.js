var urlstart = "https://api.weatherapi.com/v1/";
var key = "key=55371cca9f7d49c5a27220811221805";
var search = "q=search";
var aqi = "aqi=no";
var alert = "alerts=no";
var forecast = "forecast.json?";
var currSearch = "";
var wsettings = {
  async: true,
  crossDomain: true,
  url: "",
  method: "GET",
};

function APIsearch() {
  search = $("#citySearch").val();
  var dup = $("#" + search);
  dup.remove();
  console.log(search);
  wsettings.url =
    urlstart +
    forecast +
    key +
    "&q=" +
    encodeURIComponent(search) +
    "&days=5&" +
    aqi +
    "&" +
    alert;
  console.log(wsettings.url);
  $.ajax(wsettings).done(function (response) {
    console.log(response);
    currSearch = response;
    var searchHistory = $("<div>");
    searchHistory.addClass(
      "col-8 rounded border-2 border-dark bg-success bg-opacity-25 p-2 my-2"
    );
    searchHistory.attr("id", search);
    searchHistory.text(search);
    $("div.col-sm-4").append(searchHistory);
    locweather();
    weatherforecast();
  });
}

function locweather() {
  $("#locntime").text(
    currSearch.location.name + " " + currSearch.location.localtime
  );
  $("#currTemp").text(currSearch.current.temp_f + "\u00B0" + "F");
  $("#currWind").text(currSearch.current.wind_mph + "MPH");
  $("#currHum").text(currSearch.current.humidity + "%");
  $("#currUV").text(currSearch.current.uv);
  $("#currUV").addClass("col-2");
  if (currSearch.current.uv < 3) {
    $("#currUV").removeClass("bg-success bg-danger bg-warning");
    $("#currUV").addClass("bg-success");
  } else if (currSearch.current.uv > 6) {
    $("#currUV").removeClass("bg-success bg-danger bg-warning");
    $("#currUV").addClass("bg-danger");
  } else {
    $("#currUV").removeClass("bg-success bg-danger bg-warning");
    $("#currUV").addClass("bg-warning");
  }
}

function weatherforecast() {
  $("#daycards").empty();
  for (i = 0; i < 5; i++) {
    var card = $('<div class="card w-auto">');
    $("#daycards").append(card);
    var cardbody = $('<div class="card-body">');
    card.append(cardbody);
    var cardTitle = $('<h5 class="card-title">');
    var cardIcon = $("<img>");
    var cardTemp = $('<p class="card-text">');
    var cardWind = $('<p class="card-text">');
    var cardHum = $('<p class="card-text">');
    cardTitle.text(currSearch.forecast.forecastday[i].date);
    var icon = "http:" + currSearch.forecast.forecastday[i].day.condition.icon;
    cardIcon.attr("src", icon);
    cardTemp.text(
      currSearch.forecast.forecastday[i].day.avgtemp_f + "\u00B0" + "F"
    );
    cardWind.text(currSearch.forecast.forecastday[i].day.maxwind_mph + "MPH");
    cardHum.text(currSearch.forecast.forecastday[i].day.avghumidity + "%");
    cardbody.append(cardTitle);
    cardbody.append(cardIcon);
    cardbody.append(cardTemp);
    cardbody.append(cardWind);
    cardbody.append(cardHum);
  }
}

$("#searchBtn").on("click", APIsearch);
$("div.col-sm-4").delegate("div.rounded", "click", function () {
  $("#citySearch").val($(this).text());
  console.log($("#citySearch").val());
  $(this).remove();
  APIsearch();
});
