const calculateKwh = (tax, bill) => {
  console.log(tax, bill);
  return bill * tax;
};

const calculateKwp = kwh => {
  return kwh / 118;
};

export {calculateKwh, calculateKwp};
