/**
 * @return {number}
 */
function PriceFix(value) {
  let number = Math.round(parseFloat(value) * 100) / 100;
  const xsd = number.toString().split('.');
  if (xsd.length === 1) {
    // eslint-disable-next-line no-param-reassign
    number = `${number.toString()}.00`;
    return number;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      // eslint-disable-next-line no-param-reassign
      number = `${number.toString()}0`;
    }
    return number;
  }
}

export default PriceFix;
