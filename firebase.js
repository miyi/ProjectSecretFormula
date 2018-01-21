//ingredient info
//recipe list
//nutrient list
//recipe image

// Initialize Firebase
// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyCBmdSwWMcDk9m6lolLxaLvPLXd7_k2QPY",
    authDomain: "recipe-website-e376f.firebaseapp.com",
    databaseURL: "https://recipe-website-e376f.firebaseio.com",
    projectId: "recipe-website-e376f",
    storageBucket: "",
    messagingSenderId: "310605823696"
  };
  firebase.initializeApp(config);

  //2. Button for adding BOOKMARK
  $("#bookmark").on("click", function(event) {
  event.preventDefault();

var database = firebase.database();

var info = {
	recipeList: api reference,
	recipeImage: api ref,
	nutrientList: api ref
}
