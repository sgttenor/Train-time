
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

//Initial variables
var name = "";
var destination = "";
var firstTrain = "";
var frequency = 0;
//hold this for calculating time of trains' arrival etc.
//var currentTime = moment();

database.ref().on("child_added", function (snapshot) {
    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);
    // Change the HTML to reflect
    
   
    var tFrequency = snapshot.val().frequency;

    // Time is 3:30 AM
    var firstTime = snapshot.val().firstTrain;
    
    //New Train time(pushed back 1 yearto make sure it comes before current time)
    var firstTrain = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTrain);
    
    //current time
    var currentTime = moment().format("hh:mm");
    console.log("current Time: " + moment(currentTime).format("hh:mm"));
    
     // Difference between the times
     var diffTime = moment().diff(moment(firstTrain), "minutes");
     console.log("DIFFERENCE IN TIME: " + diffTime);
 
     // Time apart (remainder)
     var tRemainder = diffTime % tFrequency;
     console.log(tRemainder);
 
     // Minute Until Train
     var minAway = tFrequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + minAway);
 
     // Next Train
     var nextTrain = moment().add(minAway, "minutes").format("hh:mm");;
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    

    $("#add-destination").append(
        "<tr><td>" + snapshot.val().name +
        "</td><td>" + snapshot.val().destination +
        "</td><td>" + snapshot.val().frequency +
        "</td><td>" + nextTrain +
        "</td><td>" + minAway +
        "</td></td>"
    );

   


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

//add user entry for train info
$("#add-train").on("click", function (event) {
    event.preventDefault();

    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#train-time").val().trim();
    frequency = $("#frequency").val().trim();

    //Create new object data for new train to be added

    var newTrain = {
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    database.ref().push(newTrain);

    console.log(name);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
    // clear text after submit
    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");


});





