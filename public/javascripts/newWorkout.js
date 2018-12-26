document.addEventListener('DOMContentLoaded', function() {

    const reloadBeauterJS = () => {
        let head = document.getElementsByTagName('head')[0];
        let beauterJS = document.createElement('script');
        beauterJS.src = `https://rawgit.com/outboxcraft/beauter/master/beauter.min.js?cachebuster=${new Date().getTime()}`;
        head.appendChild(beauterJS);
    }

    $('#submit-workout')
        .on('click', function(event) {
            event.preventDefault();
        });

    let form = $('#exercise-selectors');
    let accordian = $('#accordian-button');
    let panel = $('#accordian-panel');

    const selectedNumber = $('#select-number-exercise').val();

    form.html('');

    for(let i = 1; i <= /*selectedNumber*/ 3; i++) {
        let newAccordian = accordian.clone()
        let newPanel = panel.clone();

        console.log(newAccordian);

        newAccordian.html(`Exercise ${i}`)
        
        form.append(newAccordian);
        form.append(newPanel);
    }

    debugger;reloadBeauterJS();
});


