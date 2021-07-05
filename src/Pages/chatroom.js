import React from "react";
import { withRouter } from "react-router-dom";

const ChatRoomPage = (props) => {
  const chatRoomId = props.match.params.id;
  const socket = props.socket;
  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();
  const [userId, setUserId] = React.useState("");

  const sendMessage = () => {
    if(socket) {
      socket.emit("chatRoomMessage", {
        chatRoomId,
        message: messageRef.current.value
      });
      messageRef.current.value="";
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("chatToken");
    if(token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }

    if(socket) {
      socket.on("newMessage", (message) => {
        setMessages([...messages, message]);
      });
    }
  }, [messages]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if(socket) {
      socket.emit("joinRoom", {
        chatRoomId
      });
    }

    return () => {
      if(socket) {
        socket.emit("leaveRoom", {
          chatRoomId
        });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">
          {props.location.state.name}
        </div>
        <div className="chatroomContent">
          {messages.map((message,i) => (
            <div key={i} className={userId === message.userId ? "mymessage" : "message"}>
              <span className={userId === message.userId ? "ownMessage" : "otherMessage"}>{message.name}: </span> {message.message}
            </div>
          ))}
        </div>
        <div className="chatroomActions">
          <div>
            <input type="text" name="message" placeholder="Enter your message" ref={messageRef}/>
          </div>
          <div>
            <button className="join" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ChatRoomPage);
