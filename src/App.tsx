import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import World from "./pages/World";
function App() {
  return (
    <Routes>
      <Route path="/" element={<World />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
