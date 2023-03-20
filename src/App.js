import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./AppBar";
import Dashboard from "./Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import Books from "./Components/Books/Books";
function App() {
  return (
    <Router>
      <AppBar/>
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/books" element={<Books/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
