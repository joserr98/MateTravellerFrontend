export const dateFormat = (date) => {

  var dateParts = date.split("-");
  var year = dateParts[0];
  var month = dateParts[1];
  var day = dateParts[2];

  var outputDate = day + "/" + month + "/" + year;

  return outputDate;
};
