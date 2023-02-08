import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";

const Item = styled.div`
  display: flex;
  & input {
    text-align: center;
  }
  & p[class*="Mui-error"] {
    white-space: nowrap;
  }
`;

export default function ValidationTextFields({ value }) {
  const number = value + 1;
  const [list] = React.useState(new Array(9).fill(0));
  const [reset, toReset] = React.useReducer((x) => x + 1, 0);
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      {list.map((_, i) => {
        const count = i + 1;
        return (
          <Item key={i}>
            <FieldItem number={number} count={count} reset={reset} />
          </Item>
        );
      })}
      <Button
        variant="contained"
        onClick={() => {
          toReset();
        }}
      >
        再来一次
      </Button>
    </Box>
  );
}

function FieldItem({ number, count, reset }) {
  const [value, setValue] = React.useState("");
  const isError = React.useMemo(() => {
    if (!value) return false;
    return number * count !== +value;
  }, [number, count, value]);
  React.useEffect(() => {
    setValue("");
    window.scrollTo(0, 0);
  }, [reset]);
  return (
    <>
      <TextField
        style={{ width: "4em", textAlign: "center" }}
        defaultValue={number}
        disabled
      />
      <TextField
        style={{ width: "4em", textAlign: "center" }}
        defaultValue={count}
        disabled
      />
      <TextField
        style={{ width: "4em", textAlign: "center" }}
        error={isError}
        autoComplete="false"
        value={value}
        autoFocus={count === number}
        type="number"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onFocus={(e) => {
          e.target.select();
        }}
        helperText={isError ? "就差一点了！" : ""}
      />
    </>
  );
}
