import { useState, Fragment, useReducer, useEffect } from "react";
import logo from "../../logo.svg";
import "./styles.css";
import { Link } from "react-router-dom";
import createEquation from "../../util/createEquation";
import createSeniorEquation, {
  LEVEL_NORMAL,
} from "../../util/createSeniorEquation";
import createTime, { getNowTime } from "../../util/createTime";
const EQUATION_TYPE = [20, 50, 100];
const EQUATION_TYPE_SENIOR = [LEVEL_NORMAL];

function createQuestion(arr, createFn) {
  const [year, month, day] = createTime();
  const key = year + month + day + "-" + arr.join("");
  let questions = localStorage.getItem(key);
  if (questions) {
    return [key, JSON.parse(questions)];
  }
  questions = {};
  arr.forEach((it) => {
    questions[it] = [];
    new Array(200).fill(1).forEach(() => {
      questions[it].push(createFn(it));
    });
  });
  localStorage.setItem(key, JSON.stringify(questions));
  return [key, questions];
}

const [questionsKey] = createQuestion(EQUATION_TYPE, createEquation);

const [seniorKey] = createQuestion(EQUATION_TYPE_SENIOR, createSeniorEquation);

function App() {
  const [count, setCount] = useState(99);
  const [now, setNow] = useReducer(getNowTime, getNowTime());
  useEffect(() => {
    const timer = setInterval(() => {
      setNow();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Link to={`math/${LEVEL_NORMAL}/${seniorKey}`}>
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <p>{now}</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            好好学习天天向上，你今天给自己打 {count} 分？
          </button>
        </p>
        <p>
          {EQUATION_TYPE.map((limit, i, arr) => {
            return (
              <Fragment key={limit}>
                <Link className="App-link" to={`math/${limit}/${questionsKey}`}>
                  {limit}以内加减法
                </Link>
                {i < arr.length - 1 && " | "}
              </Fragment>
            );
          })}
        </p>
      </header>
    </div>
  );
}

export default App;
