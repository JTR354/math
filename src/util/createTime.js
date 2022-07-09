export default function createTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = pad(now.getDate());
  const day = pad(now.getDay());
  const hour = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  return [year, month, day, hour, minutes, seconds];
};

export function getNowTime() {
  const [year,month, day, hour, minutes, seconds] = createTime()
  return year + '年' + month + '月' + day + '日' + hour + '时' + minutes + '分' + seconds + '秒'
}

function pad(t, maxLength = 2, fullString = "0") {
  return String(t).padStart(maxLength, fullString);
}
