const fs = require('fs');

const printObjectToLogFile = obj => {
    let data;
    const objectKeys = Object.keys(obj);
    for (const key in objectKeys) {
        data += `${objectKeys[key]}\n`;
    }
    fs.writeFile('log.txt', data, { flag: 'w+' }, (err) => {
        if (err) throw err;
        if (!err)
            console.log('\x1b[35m%s\x1b[0m', 'log.txt was created for object');
    });
};

const hitCounter = () => {
    let counter = 0;

    return {
        inc: () => counter++,
        get: () => counter,
        reset: () => (counter = 0),
    };
};

const indexHitCount = hitCounter();
const desktopRestrictCount = hitCounter();

module.exports = {
    indexHitCount,
    desktopRestrictCount,
};
