document.addEventListener("DOMContentLoaded", function() {
  // debugger;
  $("#select-number-exercise").on("click", function() {
    $("#exercise-name-1").val("squat");
    $("#input-sets-1").val(3);
    $("#input-reps-1").val(3);
    $("#input-weight-1").val(170);
    $("#comment-input").text("This workout was auto created");
  });
});
