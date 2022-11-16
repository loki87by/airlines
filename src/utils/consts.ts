export const DATE_ERROR =
  "По техническим причинам, в данный момент, путешествия во времени не осуществляются, но наши ученые делают все возможное в попытках исправить это досадное недоразумение. Приносим извинения за неудобства.";
export const ADRESS_ERROR =
  "В таком городе нет пассажирских аэропортов, либо такой город не существует в нашей реальности, а полеты в параллельные миры нашей авиакомпанией пока не осуществляются. Убедительная просьба исправить название города.";
export const TIME_STEP = 13.11438;
export const MONEY_STEP = 473.258068;
export const TIMES = ["09:20", "10:20", "11:20"];

export const MINS_TO_HOURS = (time: number, words: boolean): string => {
  let str;
  let hours;
  let mins;

  if (time > 59) {
    hours = Math.floor(time / 60);
    mins = time - hours * 60;

    if (words) {
      str = `${hours} ч ${mins} мин`;
    } else {
      str = `${hours}:${mins}`;
    }
  } else {
    mins = time;
    str = `${mins} мин`;
  }
  return str;
};

export const SET_SPACES = (money: number): string => {
  let str = money.toString();
  let arr = str.split("").reverse();

  if (arr.length > 3) {
    str = "";
    for (let i = 0; i < arr.length; i++) {
      str += arr[i];

      if ((i + 1) % 3 === 0) {
        str += " ";
      }
    }
    arr = str.split("").reverse();
    str = arr.join("");
  }
  return str;
};

export const GET_END_TIME = (startTime: string, duration: number): string => {
  const arr = startTime.split(":");
  const start = +arr[0] * 60 + +arr[1];
  const end = start + duration;
  return MINS_TO_HOURS(end, false);
};
