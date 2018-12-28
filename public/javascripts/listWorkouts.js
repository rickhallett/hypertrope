document.addEventListener("DOMContentLoaded", function() {
  const trimDate = date => date.innerText.substring(0, 15);

  const dateHTML = document.getElementsByClassName("date");
  for (let i = 0; i < dateHTML.length; i++) {
    let currentDate = dateHTML[i];
    currentDate.innerText = trimDate(currentDate);
  }
});
