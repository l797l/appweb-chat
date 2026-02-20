import { useEffect, useState } from "react";
import api, { pathWeb } from "../api/axios";
import ImgProfileIsEmpty from "./img/as.jpg";
import "./style/Chat.css";
import ListMessage from "./Message";
import { useNavigate } from "react-router-dom";
import MyProfile from "../profile/MyProfile";
import * as SignalR from "@microsoft/signalr";
import voiceSendMessage from "./void/void-message.mp3";
export default function Chat() {
  const [showAllChat, setShowAllChat] = useState([]);
  const [chatId, setChatId] = useState("");
  const [imgChat, setImgChat] = useState("");
  const [search, setSearch] = useState("");
  const [resultSearch, setResultSearch] = useState([]);
  const navigate = useNavigate();
  const [widthPage, setWidthPage] = useState(window.innerWidth);
  const [showMenuProfile, setShowMenuProfile] = useState(false);
  const [showMyProfile, setShowMyProfile] = useState(false);
  const [informationMyAccount, setInformationMyAccount] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const playNotificationSound = () => {
    const audio = new Audio(voiceSendMessage);
    audio.play().catch(() => {
      console.error("Failed to play sound");
    });
  };

 

          

  useEffect(() => {
    const connection = new SignalR.HubConnectionBuilder()
      .withUrl(pathWeb + "chatHub", {
        accessTokenFactory: () => localStorage.getItem("token"),
      })
      .withAutomaticReconnect()

      .build();
    if (connection.state === "Disconnected") {
      connection
        .start()
        .then(() => {
          connection.on("UpdateChat", (data) => {
            const sorted = data.sort(
              (a, b) =>
                new Date(b.lastMessageTime) - new Date(a.lastMessageTime),
            );
            
            setShowAllChat(sorted);
            if ( localStorage.getItem("userId") != sorted[0].sendId) {
              if(sorted[0].numberMessagsNotRead > 0) {
                playNotificationSound();
              }
            }
          });
        })
        .catch((error) => {
          console.error("Error connecting to SignalR hub:", error);
        });
    }

    return () => {
      connection.off("UpdateChat");
      if (connection.state === "Connected") connection.stop();
    };
  }, []);
  useEffect(() => {
    if (search.trim() === "") {
      return;
    }
    api
      .get(`User/Search/${search}`)
      .then((re) => setResultSearch(re.data))
      .catch();
  }, [search]);
  useEffect(() => {
    api
      .get("Chat/AllChats")
      .then((response) => {
        setShowAllChat(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the chats!", error);
      });
  }, []);

  useEffect(() => {
    async function GetDataUser() {
      const response = await api.get("/User/SendAllInformationUser");
      setInformationMyAccount(response.data);
    }
    GetDataUser();
  }, []);

  useEffect(() => {
    const closeMenu = () => setShowMenuProfile(false);

    window.addEventListener("click", closeMenu);

    return () => window.removeEventListener("click", closeMenu);
  }, []);

  useEffect(() => {
    const updateWidth = () => setWidthPage(window.innerWidth);

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  });

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "";

    const now = new Date();
    const msgDate = new Date(dateString + "Z");

    const diffInSeconds = Math.floor((now - msgDate) / 1000);

    if (diffInSeconds < 0) return "now";

    if (diffInSeconds < 60) {
      return "now";
    }

    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hour`;
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
      if (days === 1) return "last day";
      return `${days} day`;
    }

    return msgDate.toLocaleDateString("ar-EG");
  };

  const backToChat = () => {
    setChatId("");
  };

  const showAllChatAll = showAllChat.map((chat) => (
    <div
      onClick={() => {
        setChatId(chat.id);
        setImgChat(chat.userOther[0].imgChat);
        api.put(`Chat/ReadMessage/${chat.id}`).then();
      }}
      key={chat.id}
      className={chatId == chat.id ? "Box-chat active" : "Box-chat"}
    >
      <img
        className="Img-Profile"
        src={
          chat.userOther[0].imgChat
            ? pathWeb + chat.userOther[0].imgChat
            : ImgProfileIsEmpty
        }
      />
      <div className="box-information">
        <div className="box-chat-text">
          <h3>{chat.userOther[0].fullName}</h3>
          <p >
            {localStorage.getItem("userId") == chat.sendId ? "Me" : chat.nameSend}:<span> {chat.lastMessage}</span>{" "}
          </p>
        </div>
        <div className="box-time-count">
          <h5>{formatTimeAgo(chat.lastMessageTime)}</h5>
          <p
            className={
              chatId != chat.id && chat.numberMessagsNotRead > 0
                ? "count-not-read"
                : "read-all"
            }
          >
            {chat.numberMessagsNotRead}
          </p>
        </div>
      </div>
    </div>
  ));

  async function CreateChatOrGet(userId, nameChat) {
    await api
      .post("Chat/CreateChat", { userId, nameChat })
      .then((re) => setChatId(re.data))
      .catch();

    setSearch("");
  }

  const showAllSearch = resultSearch.map((user) => (
    <div
      onClick={() => CreateChatOrGet(user.id, user.fullName)}
      key={user.id}
      className="Box-chat-search"
    >
      <img
        className="Img-Profile-search"
        src={user.profileImg ? pathWeb + user.profileImg : ImgProfileIsEmpty}
      />
      <div className="box-chat-text-search">
        <h3>{user.fullName}</h3>
        <p>@{user.userName}</p>
      </div>
    </div>
  ));

  const logout = () => {
    localStorage.removeItem("token");

    setInformationMyAccount(null);
    navigate("/login");
    api.defaults.headers.common["Authorization"] = null;
  };
  return (
    <div className="chat-main">
      {((widthPage < 700 && chatId !== "") || widthPage >= 700) && (
        <div className="Message-to-chat">
          {chatId ? (
            <ListMessage
              id={chatId}
              onButtombackChat={backToChat}
              img={imgChat}
            />
          ) : (
            <div className="no-chat"></div>
          )}
        </div>
      )}
      {((widthPage < 700 && chatId === "") || widthPage >= 700) &&
        !showMyProfile && (
          <div className="All-chates">
            <div className="spase">
              <div className="header-chat-search">
                <i
                  className="fa-solid fa-bars icon-profail"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenuProfile(!showMenuProfile);
                  }}
                ></i>
                <div className="box-input-search" tabIndex="0">
                  <i className="fa-solid fa-magnifying-glass icon-search-header-profile"></i>
                  <input
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              {search ? showAllSearch : showAllChatAll}
            </div>
            <div
              className="box-menu-setting"
              style={{ display: showMenuProfile ? "flex" : "none" }}
            >
              <div
                className="box-profile-setting"
                onClick={() => setShowMyProfile(true)}
              >
                <img
                  src={
                    informationMyAccount.profileImg
                      ? pathWeb + informationMyAccount.profileImg
                      : ImgProfileIsEmpty
                  }
                ></img>
                <p>
                  {informationMyAccount.firstName +
                    " " +
                    informationMyAccount.lastName}
                </p>
              </div>
              <div>
                <i className="fa-solid fa-gear"></i>
                <p>Setting</p>
              </div>
            </div>
          </div>
        )}

      {((widthPage < 700 && chatId === "") || widthPage >= 700) &&
        showMyProfile && (
          <MyProfile
            backToChatfromeMyProfile={setShowMyProfile}
            myEmail={informationMyAccount.email}
            logout={logout}
            firstName={informationMyAccount.firstName}
            lastName={informationMyAccount.lastName}
            imgProfile={informationMyAccount.profileImg}
            userName={informationMyAccount.userName}
          />
        )}
    </div>
  );
}
