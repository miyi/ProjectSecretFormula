// <!-- <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="utf-8">
//     <title>Multiple AJAX</title>
// </head>

// <body>
//     <!DOCTYPE html>
//     <html lang="en">

//     <head>
//         <meta charset="utf-8">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//         <meta name="viewport" content="width=device-width, initial-scale=1">
//         <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
//         <title>Bootstrap 101 Template</title>

//         <!-- Bootstrap -->
//         <link href="css/bootstrap.min.css" rel="stylesheet">

//         <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
//         <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
//         <!--[if lt IE 9]>
//           <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
//           <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
//         <![endif]-->
//     </head>
//     <!DOCTYPE html>
//     <html lang="en">

//     <head>
//         <title>Recipe Lookup</title>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1">
//         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
//         <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
//         <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
//     </head>

//     <body>

//         <div class="container">
//             <h1>Recipe Lookup</h1>
//             <form id="search-box">
//                 <div class="input-group">
//                     <input type="text" class="form-control" placeholder="Search" name="search" id="search">
//                     <div class="input-group-btn">
//                         <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
//                     </div>
//                 </div>
//             </form>
//         </div>

//         <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
//         <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
//         <!-- Include all compiled plugins (below), or include individual files as needed -->
//         <!-- <script src="js/bootstrap.min.js"></script> -->
//         <div id="recipe-here"></div>
//     </body>

//     </html>

//     <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
//     <script type="text/javascript"> -->
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
                // Storing the data from the AJAX request in the results variable
                var results = response.hits;
                for (var i = 0; i < results.length; i++) {
                    // Creating and storing a div tag
                    var recipeDiv = $("#recipe-ingredients");
                    // Creating and storing an image tag
                    var recipeImage = $(".recipe-one");
                    // Setting the src attribute of the image to a property pulled off the result item
                    recipeImage.attr("src", results[i].recipe.image);
                    // Creating and storing recipe in a paragraph
                    var recipeList = $("<p>").text("Recipe: " + results[i].recipe.label);
                    // Appending the paragraph and image tag to the recipeDiv
                    recipeDiv.append(recipeList);
                    recipeDiv.append(recipeImage);
                    // Creating element for ingredients
                    var ingredientInfo = results[i].recipe.ingredientLines;
                    for (var j = 0; j < ingredientInfo.length; j++) {
                        recipeDiv.append($(".text-muted").text(ingredientInfo[j]));
                    }
                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#recipe-here").prepend(recipeDiv);
                }
            });
            // Prevents the page from reloading after the AJAX call.
            event.preventDefault();
        });
