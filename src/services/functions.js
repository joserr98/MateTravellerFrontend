export const dateFormat = (date) => {

  var dateParts = date.split("-");
  var year = dateParts[0];
  var month = dateParts[1];
  var day = dateParts[2];

  var outputDate = day + "/" + month + "/" + year;

  return outputDate;
};

export const dateFormatMonth = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric'  };
    const outputDate = new Date(date);
    return outputDate.toLocaleString('en-US', options);
}

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

export const getAge = (birthDate) => {
  const today = new Date();
  let [year, month, day] = birthDate.split('-');
  let birthDateObj = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  let m = today.getMonth() - birthDateObj.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age;
}