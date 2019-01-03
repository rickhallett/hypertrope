// TODO: create a current Path helper method for the navbar active styling
const capitaliseFirstChar = string => {
  const arr = string.split("");
  arr[0] = arr[0].toUpperCase();
  return arr.join("");
};

module.exports = {
  capitaliseFirstChar
};
