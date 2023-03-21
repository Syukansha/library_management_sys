import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./AppBar";
import Dashboard from "./Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import Books from "./Components/Books/Books";
import ReturnBooks from "./Components/Books/ReturnBooks";
function App() {
  return (
    <Router>
      <AppBar/>
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/books" element={<Books/>}></Route>
        <Route path="/return-books" element={<ReturnBooks/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
