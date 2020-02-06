
configAPI = config;

firebase.initializeApp(configAPI);

let database = firebase.database();

let trainName = "";
let destination = "";
let firstTrainTime = 0;
let frequency = 0;


let tRemainder = 0;


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
    });
$("#trainName-input").val("");
$("#destination-input").val("");
$("#firstTrainTime-input").val("");
$("#frequency-input").val("");
});


database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().frequency);

    let firstTimeConverted = moment(childSnapshot.val().firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in Time: " + diffTime);

    tRemainder = diffTime % childSnapshot.val().frequency;
    console.log(tRemainder);

    var minutesAway = childSnapshot.val().frequency - tRemainder;
    console.log("Minutes Till Train: " + minutesAway);

    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("Arrival Time: " + moment(nextArrival).format("hh:mm"));




    let newRow = $("<tr>").append(
        $("<td>").text(childSnapshot.val().trainName),
        $("<td>").text(childSnapshot.val().destination),
        $("<td>").text(childSnapshot.val().frequency),
        $("<td>").text(moment(nextArrival).format("h:mm a")),
        $("<td>").text(minutesAway),
    );
    $("#scheduleTable > tbody").append(newRow);

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

