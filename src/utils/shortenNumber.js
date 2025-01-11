const numberMillion = Math.pow(10,6);
const numberBillion = Math.pow(10,9);
const numberTrillion = Math.pow(10,12);
const numberQuadrillion = Math.pow(10,15);

function shortenNumber(number) {
  if (number > numberQuadrillion) {
    return (number / numberQuadrillion).toFixed(2) + " Lemollion";
  } else if (number > numberTrillion) {
    return (number / numberTrillion).toFixed(2) + " Trillion";
  } else if (number > numberBillion) {
    return (number / numberBillion).toFixed(2) + " Billion";
  } else if (number > numberMillion) {
    return (number / numberMillion).toFixed(2) + " Million";
  } else {
    return number;
  }
}

export default shortenNumber;
