import { useParams, useNavigate, Route } from "react-router-dom";

import Item from "./Item";
const Math = (props) => {
  const { count } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <h1>math{count}</h1>
      <button
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        go back
      </button>
    </div>
  );
};

export default Math;
