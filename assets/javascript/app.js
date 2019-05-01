
//Initialize firbase for sever data
var config = {
    apiKey: "AIzaSyAra_wEx8KyrA_585qRQQyszXEBUlq9XKU",
    authDomain: "tenorwolf-bee4e.firebaseapp.com",
    databaseURL: "https://tenorwolf-bee4e.firebaseio.com",
    projectId: "tenorwolf-bee4e",
    storageBucket: "tenorwolf-bee4e.appspot.com",
    messagingSenderId: "379852997836"
  };


  firebase.initializeApp(config);

  //variable for firebase data
  var database = firebase.database();
  //hold this for calculating time of trains' arrival etc.
  //var currentTime = moment();

  database.ref().on("child_added", function(snapshot) {
    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);
    $("#email-display").text(snapshot.val().destination);
    $("#age-display").text(snapshot.val().firstTrain);
    $("#comment-display").text(snapshot.val().frequency);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  //add user entry for train info
  $("#add-train").on("click", function(){
   event.preventDefault();

   name = $("#train-name").val().trim();
   destination = $("#destination").val().trim();
   firstTrain = $("#train-time").val().trim();
   frequency = $("#frequency").val().trim();

   //Create new object data for new train to be added

   var newTrain = {
       "Train Name": name,
       "Destination": destination,
       "First Train Time": firstTrain,
       "Frequency": frequency
   };

   database.ref().push(newTrain);

   console.log(name);
   console.log(destination);
   console.log(firstTrain);
   console.log(frequency);

  });
  
  
  
  
  