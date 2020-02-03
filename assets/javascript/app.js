
configAPI = config;

firebase.initializeApp(configAPI);

let database = firebase.database();

let trainName = "";
let destination = "";
let firstTrainTime = 0;
let frequency = 0;

$("#submit").on("click", function (event) {
    event.preventDefault();
    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrainTime = $("#firstTrainTime-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        //dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().frequency);

    $("#tableBody").text(childSnapshot.val().trainName + "|" + childSnapshot.val().destination + "|" + childSnapshot.val().firstTrainTime + "|" + childSnapshot.val().frequency);

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});