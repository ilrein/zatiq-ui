const humanizeConstant = (str) => {
  const STR = str
    .toLowerCase()
    .replace('_', ' ');
  return STR;
};

export default humanizeConstant;
