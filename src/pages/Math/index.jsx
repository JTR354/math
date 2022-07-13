import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";
import { useMemo } from "react";
import { useState } from "react";
import QRious from "qrious";
import { useEffect } from "react";

const PAGE_LIMIT = 10;

const Maths = (props) => {
  const { count, key } = useParams();
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const questions = useMemo(() => {
    const q = JSON.parse(localStorage.getItem(key)) || {};
    return q[count] || [];
  }, [key]);

  const currentPage = useMemo(() => {
    return questions
      .slice(page * PAGE_LIMIT, (page + 1) * PAGE_LIMIT)
      .map((it) => {
        const result = it.slice(0, it.length - 1).join("  ");
        const answer = it.join(" ");
        return { result, answer };
      });
  }, [page]);

  useEffect(() => {
    new QRious({
      element: document.getElementById("answer"),
      value: currentPage.map((it) => `${it.answer}`).join("\r\n,"),
    });
  }, [currentPage]);

  return (
    <div className="math">
      <h2>
        {count}以内加减法 <mark className="sub-title">第{page + 1}条命</mark>
      </h2>
      <ul className="list">
        {currentPage.map((it, i) => {
          return <li key={count + "-" + page + "-" + i}>{it.result}</li>;
        })}
      </ul>
      {page === 20 && <h2>GAME OVER</h2>}
      {page < 20 && (
        <div className="qr-code">
          <canvas id="answer"></canvas>
          <span>扫码查看答案</span>
        </div>
      )}
      <div className="button-group">
        <button
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          重新选择关卡
        </button>
        <button
          onClick={() => {
            const next = Math.min(20, page + 1);
            setPage(next);
          }}
        >
          下一关
        </button>
        <button
          onClick={() => {
            const prev = Math.max(0, page - 1);
            setPage(prev);
          }}
        >
          上一关
        </button>
      </div>
    </div>
  );
};

export default Maths;
