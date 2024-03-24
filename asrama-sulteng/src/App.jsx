import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "./view/HomeView";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomeView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
