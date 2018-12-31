const fs = require("fs");

/**
 * NODE CONSOLE COLORREFERENCE
Reset = "\x1b[0m"
Bright = "\x1b[1m" 
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m" 
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
 */

const printObjectToLogFile = obj => {
  let data;
  let objectKeys = Object.keys(obj);
  for (key in objectKeys) {
    data += objectKeys[key] + "\n";
  }
  fs.writeFile("log.txt", data, { flag: "w+" }, function(err) {
    if (err) throw err;
    if (!err)
      console.log("\x1b[35m%s\x1b[0m", "log.txt was created for object");
  });
};

const isAuthenticated = (req, res, next) => {
  if (req.user) return next();
  else
    return res.status(401).json({
      error: "User not authenticated"
    });
};

const hitCounter = () => {
  let counter = 0;
  
  return {
    inc: () => counter++,
    get: () => counter,
    reset: () => counter = 0
  };
};

const indexHitCount = hitCounter();
const desktopRestrictCount = hitCounter();

module.exports = {
  printObjectToLogFile,
  isAuthenticated,
  indexHitCount,
  desktopRestrictCount
};
