const reloadBeauterJS = () => {
    let head = document.getElementsByTagName('head')[0];
    let beauterJS = document.createElement('script');
    beauterJS.src = `https://rawgit.com/outboxcraft/beauter/master/beauter.min.js?cachebuster=${new Date().getTime()}`;
    head.appendChild(beauterJS);
}

document.addEventListener('DOMContentLoaded', function() {

    $('#submit-workout')
    .on('click', function(event) {
        event.preventDefault();
    });
    
    $('#select-number-exercise')
    .on('change', function(event) {
        let form = $('#exercise-selectors');
        const accordian = $('#accordian-button');
        const panel = $('#accordian-panel');
        const selectedNumber = $('#select-number-exercise').val();

        form.html('');

        for(let i = 1; i <= selectedNumber; i++) {
            let newAccordian = accordian.clone()
            let newPanel = panel.clone();

            newAccordian.html(`Exercise ${i}`)

            console.dir(newPanel);

            // debugger;
            newPanel.find('legend').text(`Exercise ${i} Details`);
            newPanel.find('select')[0].name = `lift${i}`;
            let inputSets = newPanel.find('#input-sets-1')[0]
            inputSets.name = `sets${i}`;
            inputSets.id = `input-sets-${i}`;
            let inputReps = newPanel.find('#input-reps-1')[0]
            inputReps.name = `reps${i}`;
            inputReps.id = `input-reps-${i}`;
            let inputWeight = newPanel.find('#input-weight-1')[0]
            inputWeight.name = `weight${i}`;
            inputWeight.id = `input-weight-${i}`;
            
            form.append(newAccordian);
            form.append(newPanel);
        }

        reloadBeauterJS();

        });

    
});


