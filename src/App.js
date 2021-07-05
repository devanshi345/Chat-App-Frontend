import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage  from "./Pages/login";
import RegisterPage  from "./Pages/register";
import DashboardPage  from "./Pages/dashboard";
import IndexPage  from "./Pages/index";
import ChatRoomPage from "./Pages/chatroom";
import "./styles/common.css";
import "./styles/chatroom.css";
import io from "socket.io-client";
import makeToast from "./Toaster";

function App() {
  const [socket, setSocket] = React.useState(null);

  const setUpSocket = () => {
    const token = localStorage.getItem("chatToken");
    if(token && !socket)
    {
      const newSocket = io("http://localhost:8000", {
        query: {
          token: localStorage.getItem("chatToken")
        }
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setUpSocket, 3000);
        makeToast("error", "Socket disconnected!");
      });

      newSocket.on("connect", () => {
        makeToast("success", "Socket connected!");
      });

      setSocket(newSocket);
    }
  };

  React.useEffect(() => {
    setUpSocket();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <Switch>
        <Route path = "/" component = {IndexPage} exact/>
        <Route path = "/login" render={() => <LoginPage setUpSocket={setUpSocket} />} exact/>
        <Route path = "/register" component = {RegisterPage} exact/>
        <Route path = "/dashboard" render={() => <DashboardPage socket={socket} />} exact/>
        <Route path = "/chatroom/:id" render={() => <ChatRoomPage socket={socket}/>} exact/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
