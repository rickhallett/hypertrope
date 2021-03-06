const reloadBeauterJS = () => {
    const head = document.getElementsByTagName('head')[0];
    const beauterJS = document.createElement('script');
    beauterJS.src = `/javascripts/beauter0.3.0.min.js?cachebuster=${new Date().getTime()}`;
    head.appendChild(beauterJS);
};

const dynamicallyAssignFormDetails = (
    form,
    accordian,
    panel,
    selectedNumber
) => {
    // debugger;
    for (let i = 1; i <= selectedNumber; i++) {
        const newAccordian = accordian.clone();
        const newPanel = panel.clone();

        newAccordian.html(`Exercise ${i}`);

        newPanel.find('legend').text(`Exercise ${i} Details`);
        newPanel.find('select')[0].name = `lift${i}`;

        const exerciseName = newPanel.find('#exercise-name-1')[0];
        exerciseName.id = `exercise-name-${i}`;

        const inputSets = newPanel.find('#input-sets-1')[0];
        inputSets.name = `sets${i}`;
        inputSets.id = `input-sets-${i}`;

        const inputReps = newPanel.find('#input-reps-1')[0];
        inputReps.name = `reps${i}`;
        inputReps.id = `input-reps-${i}`;

        const inputWeight = newPanel.find('#input-weight-1')[0];
        inputWeight.name = `weight${i}`;
        inputWeight.id = `input-weight-${i}`;

        form.append(newAccordian);
        form.append(newPanel);
    }
    // debugger;
    form.removeClass('_hidden');
};

document.addEventListener('DOMContentLoaded', () => {
    $('#submit-workout').on('click', (event) => {
        const name = $('#name');
        if (name === '') name.val('Anonymous');

        const exercisePanels = $('#exercise-selectors');
        const inputs = exercisePanels.find('input');

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === '') inputs[i].value = 0;
        }
    });

    $('#select-number-exercise').on('change',(event) => {
        const form = $('#exercise-selectors');
        const selector = $('#select-number-exercise');
        const accordian = $('#accordian-button');
        const panel = $('#accordian-panel');
        const selectedNumber = selector.val();

        form.html('');

        dynamicallyAssignFormDetails(form, accordian, panel, selectedNumber);
        selector.attr('disabled', true);

        reloadBeauterJS();
    });

    $('#refresh-new-workout').on('click', () => {
        window.location.href = '/workouts/new';
    });
});
