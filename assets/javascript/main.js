var config = {
  apiKey: "AIzaSyAFg78DNRg0sSQ8tSuh71rY9SntX_MN5Ec",
  authDomain: "preston-trainschedules.firebaseapp.com",
  databaseURL: "https://preston-trainschedules.firebaseio.com",
  projectId: "preston-trainschedules",
  storageBucket: "preston-trainschedules.appspot.com",
  messagingSenderId: "250418017365"
};
firebase.initializeApp(config)

var database = firebase.database();


$("#add-train-btn").on("click", function (event) {
  event.preventDefault();
  var newTrainName = $("#train-name-input").val().trim();
  var newDestination = $("#destination-input").val().trim();
  var newFirstTrain = $("#first-train-input").val().trim();
  var newFrequency = $("#frequency-input").val().trim();
  //left side firebase name, right input from form
  var newTrain = {
    inputTrainName: newTrainName,
    inputDestination: newDestination,
    inputFirstTrain: newFirstTrain,
    inputFrequency: newFrequency
  };
  
  database.ref().push(newTrain);
  console.log(newTrain.inputTrainName);
  console.log(newTrain.inputDestination);
  console.log(newTrain.inputFirstTrain);
  console.log(newTrain.inputFrequency);

  alert("Train successfully added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var nextArrival;
  var minutesAway;
  var newTrainName = childSnapshot.val().inputTrainName;
  var newFirstTrain = childSnapshot.val().inputFirstTrain;
  var newFrequency = childSnapshot.val().inputFrequency;
  var newDestination = childSnapshot.val().inputDestination;
  var time = moment(newFirstTrain, "HH:mm").subtract(1, "years");
  var timeDiff = moment().diff(moment(time, "X"), "minutes");
  var remainder = timeDiff % newFrequency;
  var minutesAway = newFrequency - remainder;
  console.log(minutesAway)
  var nextArrival = moment().add(minutesAway, "minutes");
  nextArrival = moment(nextArrival).format("HH:mm A");

  console.log(newTrainName);
  console.log(newDestination);
  console.log(newFirstTrain);
  console.log(newFrequency);



  var newTrainRow = $("<tr>").append(
    $("<td>").text(newTrainName),
    $("<td>").text(newDestination),
    $("<td>").text(newFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)

  );

  $("#train-table > tbody").append(newTrainRow);
});
