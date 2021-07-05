import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const [chatRooms, setChatRooms] = React.useState([]);
  const chatroomNameRef = React.useRef();

  const getChatRooms = () => {
    axios
    .get("http://localhost:8000/chatroom", {
      headers : {
        Authorization: "Bearer " + localStorage.getItem("chatToken")
      }
    })
    .then(response => {
      setChatRooms(response.data);
    })
    .catch(err => {
      setTimeout(getChatRooms, 3000);
    });
  };

  React.useEffect(() => {
    getChatRooms();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  const addChatRoom = () => {
    axios
    .post("http://localhost:8000/chatroom",{}, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("chatToken"),
        name: chatroomNameRef.current.value
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch(err => {
      console.log(err.response.data.message);
    });

    chatroomNameRef.current.value="";
    window.location.reload();
  };

  return (
    <div className="card">
      <div className="cardHeader">Chat-Rooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName"> Chatroom Name </label>
          <input type="text" name="chatroomName" id="chatroomName" placeholder="Enter name of chat-room" ref={chatroomNameRef}/>
        </div>
        <button onClick={addChatRoom}>Create Chat-Room</button>
        <div className="chatrooms">
          {chatRooms.map((chatroom) => (
            <div key={chatroom._id} className="chatroom">
              <div>{chatroom.name}</div>
              <Link to={{
                pathname: "/chatroom/" + chatroom._id,
                state: {
                  name: chatroom.name
                }
              }}>
                <div className="join">Join</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
