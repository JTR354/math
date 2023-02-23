import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import FormControlLabel from "@mui/material/FormControlLabel";

import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
const Input = styled(TextField)`
  & input {
    text-align: center;
    font-size: 2vw;
  }
`;
// const Icon = styled(Paper)`
//   width: 12.8rem;
//   height: 12.8rem;
// `;
// const icon = (
//   <Icon sx={{ m: 1 }} elevation={3}>
//     1
//   </Icon>
// );

const PaperItem = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const icon = <span>1</span>;
export default function SimpleGrow(props) {
  const checked = true;

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
  const handleSubmit = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      const isTrue = +value === count * number;
      setError(!isTrue);
      setLabel(isTrue ? "✅" : "❌");
      e.target.select();
      onSubmit(isTrue);
    }
  };

  return (
    <div>
      <div>
        <Typography component="legend" variant="h6" gutterBottom>
          你的星星：
        </Typography>
        <Rating name="customized-10" value={score || 0} max={10} />
      </div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "no-wrap",
          "& > :not(style)": {
            m: 1,
            flexGrow: 1,
            // width: 128,
            // height: 128,
          },
        }}
      >
        <Grow in={checked}>
          <PaperItem>{number}</PaperItem>
        </Grow>
        {/* Conditionally applies the timeout prop to change the entry speed. */}
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          <PaperItem>×</PaperItem>
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 2000 } : {})}
        >
          <PaperItem>{count}</PaperItem>
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 3000 } : {})}
        >
          <PaperItem>=</PaperItem>
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 4000 } : {})}
        >
          <PaperItem>
            <Input
              value={value}
              onKeyDown={handleSubmit}
              onBlur={handleSubmit}
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
          </PaperItem>
        </Grow>
      </Box>
    </div>
  );
}
