export default function convertDate(d: Date, t = true) {
  d = new Date(d);
  const date = [
    d.getFullYear(),
    `0${d.getMonth() + 1}`.slice(-2),
    `0${d.getDate()}`.slice(-2),
  ].join("-");

  if (!t) {
    return date;
  }

  // const time = [
  //   `0${d.getHours()}`.slice(-2),
  //   `0${d.getMinutes()}`.slice(-2),
  //   `0${d.getSeconds()}`.slice(-2),
  // ].join(":");

  return [date].join(" ");
}
