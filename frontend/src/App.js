// import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import { BrowserRouter, NavLink, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PremiumContent from "./components/PremiumContent";
import Header from './components/Header'
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { getToken,getUser,setUserSession,resetUserSession } from './services/AuthService';


const verifyUrl=REACT_APP_ENDPOINT+'verify';


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
          <PublicRoute path="/register" component={Register}/>
          <PublicRoute path="/login" component={Login}/>
          <PrivateRoute path="/premium-content" component={PremiumContent}/>
        </Switch>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
