const helpers = {
  formatDate: (date) => {
    try {
      if (typeof date === "string") {
        let datesToNums = [];
        date.slice(0, 10);
        date = date.split("-");
        date.forEach((int, index) => {
          if (index === 1) int -= 1;
          datesToNums.push(parseInt(int));
        });
        let utc = Date.UTC(...datesToNums);
        let f = new Intl.DateTimeFormat("en", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
        let formattedDate = f.format(utc);
        return formattedDate;
      }
    } catch (err) {
      console.warn("error within formatDate method", err);
      return;
    }
  },

  titleize: (string) => {
    const words = string.split(" ");
    return words
      .map((word) => {
        const wordLength = word.length;
        return word.substr(0, 1).toUpperCase() + word.substr(1, wordLength - 1);
      })
      .join(" ");
  },
};

export default helpers;
