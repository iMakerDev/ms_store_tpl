const getCountDownTimer = (date_on_sale_to) => {
  let now = new Date(), timeSaleTo = new Date(date_on_sale_to);
  let diffDate = (timeSaleTo.getTime() - now.getTime()) / 1000, day = 0, hours = 0, min = 0;
  if (diffDate >= 86400) {
    day = Math.floor(diffDate / 86400);
    diffDate -= day * 86400;
  }
  if (diffDate >= 3600) {
    hours = Math.floor(diffDate / 3600);
    diffDate -= hours * 3600;
  }
  if (diffDate >= 60) {
    min = Math.floor(diffDate / 60);
    diffDate -= min * 60;
  }

  if (day === 0 && hours === 0 && min === 0) {
    return "";
  }

  return day + " days " + hours + " hours " + min + " m";
}

export {
  getCountDownTimer
}