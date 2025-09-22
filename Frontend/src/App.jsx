import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";

function App({ socket }) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
