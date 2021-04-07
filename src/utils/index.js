const utils = {
  textTruncate: function (str) {
    if (str.length > 80) {
      return str.substring(0, 77) + '...';
    } else {
      return str;
    }
  },
shortTruncate: function (str) {
    if (str.length > 60) {
      return str.substring(0, 57) + '...';
    } else {
      return str;
    }
  }
}

export default utils;