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
import axios from 'axios';
import React, {useState, useEffect} from "react";


const verifyUrl=process.env.REACT_APP_ENDPOINT+'/verify';


function App() {
  const [isAuthenicating, setAuthenicating] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token === 'undefined' || token === undefined || token === null || !token) {
      return;
    }
    const requestBody = {
      user: getUser(),
      token: token
    }

    axios.post(verifyUrl, requestBody).then(response => {
      setUserSession(response.data.user, response.data.token);
      setAuthenicating(false);
    }).catch(() => {
      resetUserSession();
      setAuthenicating(false);
    })
  }, []);

  const token = getToken();
  if (isAuthenicating && token) {
    return <div className="content">Authenicating...</div>
  }

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
