import { HashRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";

import Maths from "./pages/Math";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="" element={<Welcome />} />
        <Route path="math">
          <Route path=":count/:key" element={<Maths />} />
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
    </HashRouter>
  );
}

export default App;
