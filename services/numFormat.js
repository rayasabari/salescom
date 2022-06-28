export const numFormat = (num, decimal) => {
  if (typeof num === "undefined" || num === null) {
    return 0;
  } else {
    num = parseFloat(num);
    return num
      .toFixed(decimal) // always two decimal digits
      .replace(".", ",") // replace decimal point character with ,
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // use . as a separator
  }
}