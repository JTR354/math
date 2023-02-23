import { useState, useMemo } from "react";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TextField from "@mui/material/TextField";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import MainSection from "./main";

import success from "./ok.jpeg";

const generateProblem = createProblem();
const Two = (props) => {
  const [problem, setProblem] = useState(() => generateProblem());
  const [toggle, setToggle] = useState(true);
  const [score, setScore] = useState(0);
  const onSubmit = (bool) => {
    if (bool) {
      setToggle((b) => !b);
      setProblem(generateProblem());
      setScore((c) => c + 1);
    } else {
      setScore(0);
    }
  };
  if (score >= 10) {
    return (
      <Stack sx={{ width: "100%" }} spacing={0}>
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          💐恭喜你 — <strong>挑战成功!</strong>
        </Alert>
        <FullImage src={success} />
        <Row>
          <Button onClick={() => window.location.reload()} variant="contained">
            再来一次？
          </Button>
        </Row>
      </Stack>
    );
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          <MainSection
            key={problem.toString()}
            problem={problem}
            visible={toggle}
            onSubmit={onSubmit}
            score={score}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
  return (
    <Main>
      {/* <Paper elevation={3}> */}
      <FlipContainer className={toggle ? "" : "hover"}>
        <Flipper>
          <Front>
            <ProblemItem
              key={problem.toString()}
              problem={problem}
              visible={toggle}
              onSubmit={onSubmit}
              score={score}
            />
          </Front>
          <Back>
            <ProblemItem
              key={problem.toString()}
              problem={problem}
              visible={!toggle}
              onSubmit={onSubmit}
              score={score}
            />
          </Back>
        </Flipper>
      </FlipContainer>
      {/* </Paper> */}
    </Main>
  );
};

export default Two;

const FullImage = styled.img`
  width: 100vw;
`;

function ProblemItem(props) {
  const {
    visible,
    problem: [number, count],
    onSubmit,
    score,
  } = props;

  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const isError = useMemo(() => {
    if (value === "") return false;
    return error;
  }, [error, value]);
  const [label, setLabel] = useState("请输入");

  if (!visible) return null;
  return (
    <>
      <div>
        <Typography component="legend" variant="h4" gutterBottom>
          你的星星：
        </Typography>
        <Rating name="customized-10" value={score || 0} max={10} size="large" />
      </div>
      <Row>
        <Col>
          <Item>{number}</Item>
        </Col>
        <Col>
          <Item>x</Item>
        </Col>
        <Col>
          <Item>{count}</Item>
        </Col>
        <Col>
          <Item>=</Item>
        </Col>
        <Col>
          <Item>
            <Input
              value={value}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const isTrue = +value === count * number;
                  setError(!isTrue);
                  setLabel(isTrue ? "✅" : "❌");
                  e.target.select();
                  setTimeout(() => {
                    onSubmit(isTrue);
                  }, 100);
                }
              }}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
                setLabel("✍🏻");
              }}
              inputProps={{ autoFocus: true, maxLength: 2, type: "tel" }}
              fullWidth
              error={isError}
              label={label}
              id="fullWidth"
            />
          </Item>
        </Col>
      </Row>
    </>
  );
}

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const Input = styled(TextField)`
  & input {
    text-align: center;
    font-size: 2vw;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 5vw;
`;
const Col = styled.div`
  width: 9vw;
  height: 6vw;
`;

const Item = styled(Paper)`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  font-size: 6vw;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const width = `50vw`;
const height = `50vh`;
const FlipContainer = styled.div`
  perspective: 1000px;
  width: ${width};
  height: ${height};
  &.hover {
    & > div {
      transform: rotateY(180deg);
    }
  }
`;
const Flipper = styled.div`
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
`;
const Card = styled.div`
  backface-visibility: hidden;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5vw 1vw;
  top: 0;
  left: 0;
  width: ${width};
  height: ${height};
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
`;
const Front = styled(Card)`
  z-index: 2;
  background-color: lightblue;
`;
const Back = styled(Card)`
  background-color: pink;
  transform: rotate3d(0, 1, 0, 180deg);
`;
const Main = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function createRandomNumber() {
  return (Math.random() * 8 + 2) >> 0;
}

function createMath() {
  return [createRandomNumber(), createRandomNumber()];
}

function createProblem() {
  const store = new Set();
  return function run() {
    if (store.size >= 81) {
      store.clear();
    }
    const problem = createMath();
    if (store.has(problem.toString())) {
      return run();
    }
    return problem;
  };
}
