// import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import { BrowserRouter, NavLink, Route, Switch} from "react-router-dom";
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
        {/* <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/premium-content" element={<PremiumContent />} />
        </Routes> */}
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/premium-content" component={PremiumContent}/>
        </Switch>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
