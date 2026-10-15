(function () {
  var image = document.getElementById("chart-image");
  var buttons = document.querySelectorAll(".route-hotspot");

  var altText = {
    ship: "Smuggling routes map showing the ship route from Shenzhen/Hong Kong to Singapore to Mumbai and Chennai",
    air: "Smuggling routes map showing the air route from Shenzhen/Hong Kong to Dubai/Singapore to Indian cities",
    land: "Smuggling routes map showing the land route from Shenzhen/Hong Kong via Myanmar/Nepal to Manipur/Bihar"
  };

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var targetImage = button.getAttribute("data-image");
      var route = button.getAttribute("data-route");

      if (image.getAttribute("src") === targetImage) {
        return;
      }

      image.setAttribute("src", targetImage);
      image.setAttribute("alt", altText[route] || "Smuggling routes map");

      buttons.forEach(function (btn) {
        btn.setAttribute("aria-pressed", btn === button ? "true" : "false");
      });
    });
  });
})();
