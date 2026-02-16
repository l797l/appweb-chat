import { useEffect, useState, useRef } from "react";
import api, { pathWeb, userId } from "../api/axios";
import imgProfile from "./img/as.jpg";
import * as SignalR from "@microsoft/signalr";
import "./style/Message.css";
import EmojiPicker from 'emoji-picker-react';


export default function Message(props) {
  const [messages, setMessages] = useState([]);
  const [text, setSendMessage] = useState("");
  const scrollRef = useRef(null);
  const connectionRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [contextMenu, setContextMenu] = useState(null);
  const [conecctionHub, setConnectionHub] = useState(null);
  const [showMenuEmoji, setShowMenuEmoji] = useState(false);

  useEffect(() => {
    const newConntection = new SignalR.HubConnectionBuilder()
      .withUrl("https://localhost:7280/chatHub")
      .withAutomaticReconnect()
      .build();

    setConnectionHub(newConntection);

    newConntection.start().then(() => {
      newConntection.invoke("JoinChat", props.id);
    });

    newConntection.on("ReceiveMessage", (message) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) {
          return prev;
        }
        return [...prev, message];
      });
    });

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      connectionRef.current?.invoke("LeaveChat", props.id);
    };
  }, [props.id]);

  const addEmojiToMessage = (Emoji) => {
    setSendMessage((mes) => mes+Emoji.emoji)
  };
  useEffect(() => {
    const closeMenu = () =>{  setContextMenu(null)}
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const showContextMenu = (e, messageId) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      x: e.pageX,
      y: e.pageY,
      messageId: messageId,
    });
  };
  useEffect(() => {
    if (!props.id) return;

    api
      .get(`Chat/AllMessageChat/${props.id}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the messages!", error);
      });

    api
      .get(`Chat/GetUserName/${props.id}`)
      .then((response) => {
        setUserName(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the messages!", error);
      });
  }, [props.id]);

  async function deleteMessage(id) {
    await api.delete(`Chat/DeleteMessage/${id}`).then();
  }
  async function addMessage(chatId) {
    if (!text.trim()) return;
    await api.post(`Chat/SendMessage`, { text, chatId }).then();
    setSendMessage("");
  }

  useEffect(() => {
    if (conecctionHub) {
      conecctionHub.on("DeleteMessage", (deleteMessageId) => {
        setMessages((pre) => pre.filter((meg) => meg.id !== deleteMessageId));
      });
    }
    return () => {
      if (conecctionHub) conecctionHub.off("DeleteMessage");
    };
  }, [conecctionHub]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, props.id]);
  const messageList = messages.map((message) => (
    <div
      key={message.id}
      onContextMenu={(e) => showContextMenu(e, message.id)}
      className={
        message.userId != userId ? "box-message-other" : "my-box-message"
      }
    >
      <img
        className={message.userId != userId ? "img-profile-message" : "nonImg"}
        src={message.imgUser? pathWeb+message.imgUser   : imgProfile}
      />
      <p
        className={
          message.userId != userId ? "text-message-other" : "my-text-message"
        }
      >
        {message.text}
      </p>
    </div>
  ));

  return (
    <div className="in-chat">
      <div className="header-chat context">
        <div className="box-img-text-header">
          <i
            className="fa-solid fa-arrow-left back-chats"
            onClick={() => props.onButtombackChat()}
          ></i>
          <img src={props.img? pathWeb+props.img:imgProfile} />
          <div className="box-title-header">
            <h4>{userName}</h4> <p>last seen recently</p>
          </div>
        </div>
        <div className="box-icon-header">
          <i className="fa-solid fa-phone icon-ph"></i>
          <i className="fa-solid fa-magnifying-glass icon-se"></i>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>
      <div className="message-list">
        {" "}
        <div ref={scrollRef} className="message-body">
          {messageList}
        </div>
      </div>
      <div className="box-send-message">
        <div className="box-input">
          <i className="fa-regular fa-face-smile icon-smail" onClick={(e) =>  {e.stopPropagation();  setShowMenuEmoji(!showMenuEmoji)}} ></i>
          <input
            type="text"
            value={text}
            placeholder="Message"
            onChange={(e) => setSendMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addMessage(props.id)}
          />
          <i className="fa-solid fa-link icon-link"></i>
        </div>
        <button onClick={() => addMessage(props.id)}>
          <i className="fa-solid fa-paper-plane fa-rotate-by fa-xs"></i>
        </button>
      </div>
      {contextMenu && (
        <div
          className="menu-tools-message"
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
            position: "fixed",
          }}
        >
          <div>
            <i className="fa-solid fa-reply"></i>
            <p>Reply</p>
          </div>
          <div>
            <i className="fa-solid fa-pen"></i>
            <p>Edit</p>
          </div>
          <div
            className="but-delete-message"
            onClick={() => deleteMessage(contextMenu.messageId)}
          >
            {" "}
            <i className="fa-solid fa-trash-arrow-up"></i>
            <p>Delete</p>
          </div>
        </div>
      )}

      {showMenuEmoji && (
        <div className="box-emoji">
          <EmojiPicker onEmojiClick={addEmojiToMessage} className="all-emoji"/>
        </div>
      )}
    </div>
  );
}
