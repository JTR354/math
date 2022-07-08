import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";

import Math from "./pages/Math";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="math">
          <Route path=":count" element={<Math />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
