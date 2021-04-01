const utils = {
  textTruncate: function (str) {
    if (str.length > 45) {
      return str.substring(0, 35) + '...';
    } else {
      return str;
    }
  }
}

export default utils;