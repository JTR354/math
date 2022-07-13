export const LEVEL_NORMAL = "LEVEL_NORMAL";
export const LEVEL_HORRIBLE = "LEVEL_HORRIBLE";
export const LEVEL_HELL = "LEVEL_HELL";

const SIGN = ["+", "-", "*", "/"];

function createSeniorEquation(level) {
  return createNormal(level) || createHorrible(level) || createHell(level);
}

function createNormal(level) {
  if (level !== LEVEL_NORMAL) return;
  const sign = SIGN.slice(0);
  const count = Math.random() > 0.5 ? 3 : 4;

  const result = [];
  for (let i = 0; i < count; i++) {
    const [s] = sign.splice(createInt(sign.length), 1);
    result.push(createNumber(result, 10, 500));
    result.push(s);
  }
  result.push(createNumber(result, 10, 500));

  const fn = new Function(`return ${result.join("")}`);
  result.push("=", fn());
  return result.map((it) => {
    if (it === "*") return "×";
    if (it === "/") return "÷";
    return it;
  });
}

function createHorrible(level) {
  if (level !== LEVEL_HORRIBLE) return;
}

function createHell(level) {
  if (level !== LEVEL_HELL) return;
}

function createNumber(arr, smaller = 10, bigger = 500) {
  const flag = isMduOrDivision(arr);
  const max = flag ? smaller : bigger;
  let result = createInt(max);
  if (flag) {
    result = Math.min(9, result);
    result = Math.max(1, result);
  }
  return result;
}

function createInt(max) {
  return (Math.random() * max) >> 0;
}

function isMduOrDivision(arr) {
  return /[\/\*]/.test(arr[arr.length - 1]);
}

export default createSeniorEquation;
