document.addEventListener('DOMContentLoaded',() => {
    const trimDate = (date) => date.innerText.substring(0, 15);

    const dateHTML = document.getElementsByClassName('date');
    for (let i = 0; i < dateHTML.length; i++) {
        const currentDate = dateHTML[i];
        currentDate.innerText = trimDate(currentDate);
    }
});
