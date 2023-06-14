// RETURNS GIVEN DATE BY DD/MM/YYYY FORMAT
export const dateFormat = (date) => {
  var dateParts = date.split("-");
  var year = dateParts[0];
  var month = dateParts[1];
  var day = dateParts[2];

  var outputDate = day + "/" + month + "/" + year;

  return outputDate;
};

// OUTPUT DATE BY "02 Aug 2022" FORMAT
export const dateFormatMonth = (date) => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const outputDate = new Date(date);
  return outputDate.toLocaleString("en-US", options);
};

// CUT STRINGS BY LENGTH GIVEN
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

// GET AGE FROM 'YYYY-MM-DD'
export const getAge = (birthDate) => {
  const today = new Date();
  let [year, month, day] = birthDate.split("-");
  let birthDateObj = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  let m = today.getMonth() - birthDateObj.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age;
};

export const useCapitals = (text, option) => {
  if (typeof text !== "string") {
    return text;
  }
  
  // SET TO CAPITAL ANY FIRST LETTER FROM A WORD 
  if (option == "first") {
    const lowerCaseText = text.toLowerCase();
    const words = lowerCaseText.split(" ");
    const transformedWords = words.map((word) => {
      if (word.length === 0) {
        return word;
      }
      const firstLetter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1);
      return firstLetter + restOfWord;
    });

    return transformedWords.join(" ");
  }

  // SET TO CAPITAL FIRST LETTER OF THE TEXT AND WORDS BEFORE DOTS '.'
  if (option == "all") {
    const transformedText = text
      .toLowerCase()
      .replace(/(^|[.!?]\s+)(\w)/g, (match) => {
        return match.toUpperCase();
      });

    return transformedText;
  }
};
