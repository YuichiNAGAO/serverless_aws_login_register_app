import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PremiumContent from "./components/PremiumContent";
import Header from './components/Header'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <div style={{ padding: 30 }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/resgister" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/premium-content" element={<PremiumContent />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
