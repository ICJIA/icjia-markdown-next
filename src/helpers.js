const isEmpty = function(s) {
  return s === null || s === undefined ? true : /^[\s\xa0]*$/.test(s);
};
const buildButtons = function(buttons) {
  let btns = buttons
    .toLowerCase()
    .split(/(\s)/)
    .filter(function(w) {
      return !isEmpty(w);
    });
  return btns;
};

export { isEmpty, buildButtons };
