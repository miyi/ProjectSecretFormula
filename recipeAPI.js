        $("#search-box").submit(function(event) {
            // Get the search data from the form
            var searchText = $("#search").val();

            // Debugging, log what we are looking for
            console.log("Searching for " + searchText);

            // Performing GET requests to the recipe API and logging the responses to the console    
            $.ajax({
                url: "https://api.edamam.com/search?q=" + searchText + "&app_id=a5adb2d9&app_key=bbbb6d6a60ed99b20528ac9c372c5a9c",
                method: "GET"
            }).done(function(response) {
                console.log(response);

                // Google places API
                $.ajax({
                    url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyDSYIY3_YzWDSDew4jVIB5TVYty8-wESxA",
                    method: "GET"
                }).done(function(response) {
                    console.log(response);
                });

                // Storing the data from the AJAX request in the results variable
                var results = response.hits;

                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag
                    var recipeDiv = $("<div>");

                    // Creating and storing an image tag
                    var recipeImage = $("<img>");

                    // Setting the src attribute of the image to a property pulled off the result item
                    recipeImage.attr("src", results[i].recipe.image);

                    // Creating and storing recipe in a paragraph
                    var recipeList = $("<p>").text("Recipe: " + results[i].recipe.label);

                    // Creating and storing nutrient list in a paragraph
                    var nutrientList = $("<p>").text(results[i].recipe.healthLabels);

                    //Prep instructions
                    var prepInstructions = $("<p>").text(results[i].recipe.url);


                    // Appending the paragraph and image tag to the recipeDiv
                    recipeDiv.append(recipeList);
                    recipeDiv.append(prepInstructions);
                    recipeDiv.append(nutrientList);
                    recipeDiv.append(recipeImage);

                    // Creating element for ingredients
                    var ingredientInfo = results[i].recipe.ingredientLines;
                    for (var j = 0; j < ingredientInfo.length; j++) {
                        recipeDiv.append($("<p>").text(ingredientInfo[j]));
                    }



                    // Prependng the recipe to the HTML page in the "#recipe-here" div
                    $("#recipe-here").prepend(recipeDiv);
                }

            });

            // Prevents the page from reloading after the AJAX call.
            event.preventDefault();
        });

        var map;
        var infowindow;
        var restaurants = [];

        var restaurantName;
        var restaurantAddress;
        var restaurantRating;
        var restaurantPrice;

        var groupName;
        var groupDate;
        var groupParticipants;
        var groupTime;
        var groupTheme;




        $(".overlay").hide();

        function initMap() {
            var pyrmont = { lat: 41.896294, lng: -87.618799 };

            map = new google.maps.Map(document.getElementById('map'), {
                center: pyrmont,
                zoom: 15
            });

            infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: pyrmont,
                radius: 800,
                type: ['restaurant']
            }, callback);
        }

        function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var label0 = i + 1;
                    var label = label0.toString();
                    var id = "restaurant" + label;

                    createMarker(results[i], label);

                    $("#well").append(
                        "<h2>" + label + ": " + results[i].name + "</h2>" +
                        "<p><strong>Rating: </strong>" + results[i].rating + "</p>" +
                        "<p><strong>Price Level: </strong>" + results[i].price_level + "</p>" +
                        "<p><strong>Address: </strong>" + results[i].vicinity + "</p>" +
                        "<button id='" + id + "'>Select Restaurant</button>" +
                        "<br>");

                    createClickEvent(id, i);

                    updateRestaurantsList(results[i]);
                }
            }
        }

        function createMarker(place, label) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                label: label
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
            });
        }

        function createClickEvent(id, i) {
            $("#" + id).on("click", function() {
                $(".overlay").show();

                restaurantName = restaurants[i].name;
                restaurantAddress = restaurants[i].address;
                restaurantRating = restaurants[i].rating;
                restaurantPrice = restaurants[i].price;

                console.log(restaurantName, restaurantAddress, restaurantRating, restaurantPrice);

            });
        }


        function updateRestaurantsList(results) {
            restaurants.push({
                "name": results.name,
                "rating": results.rating,
                "price": results.price_level,
                "address": results.vicinity
            });
        }


        $("#createGroupBtn").on("click", function(event) {

            event.preventDefault();

            groupName = $("#groupName").val();
            groupDate = $("#groupDate").val();
            groupParticipants = $("#groupParticipants").val();
            groupTime = $("#groupTime").val();
            groupTheme = $("#groupTheme").val();

            // window.location.href = "myGroups.html";

            console.log(groupName, groupDate, groupParticipants, groupTime, groupTheme);

        });