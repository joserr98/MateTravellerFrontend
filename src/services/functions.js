export const dateFormat = (date) => {

  var dateParts = date.split("-");
  var year = dateParts[0];
  var month = dateParts[1];
  var day = dateParts[2];

  var outputDate = day + "/" + month + "/" + year;

  return outputDate;
};

export const truncate = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  } else {
    const lastSpaceIndex = str.lastIndexOf(" ", maxLength);
    
    if (lastSpaceIndex !== -1) {
      return str.substring(0, lastSpaceIndex) + "...";
    } else {
      return str.substring(0, maxLength) + "...";
    }
  }
};