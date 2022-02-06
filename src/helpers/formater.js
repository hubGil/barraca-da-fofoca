const formatDateBR = (date) => {
  var d = new Date(date);
  var month = '' + (d.getUTCMonth() + 1);
  var day = '' + d.getUTCDate();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [day, month, d.getUTCFullYear()].join('/');
};


export {
  formatDateBR,
};
