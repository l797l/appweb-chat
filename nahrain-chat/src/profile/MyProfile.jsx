import "./style/MyProfile.css";
import imgNoneProfile from "../chat/img/as.jpg";
import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
export default function MyProfile(props) {
  const [showBoxLogOut, setShowBoxLogOut] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showImgProfile, setShowImgProfile] = useState(`https://localhost:7280${props.imgProfile}`);

  useEffect(() => {

    const check = () => {

      if ("https://localhost:7280null" == showImgProfile) {
        setShowImgProfile(null);
      }
    };
    check();
  }, [showImgProfile]);
  useEffect(() => {
    const closeLogout = () => setShowBoxLogOut(false);
    window.addEventListener("click", closeLogout);

    return () => window.removeEventListener("click", closeLogout);
  }, []);
  return (
    <>
      {showEditProfile && (
        <EditProfile
          intoMyProfle={setShowEditProfile}
          firstName={props.firstName}
          lastName={props.lastName}
          userName={props.userName}
          imgProfile={props.imgProfile}
          
        />
      )}
      {!showEditProfile && (
        <div className="my-profile">
          <div className="header-profile">
            <div className="header-profile-left">
              <i
                className="fa-solid fa-left-long"
                onClick={() => props.backToChatfromeMyProfile(false)}
              ></i>{" "}
              <p>Settings</p>
            </div>
            <div className="header-profile-right">
              <i
                className="fa-solid fa-pen"
                onClick={() => setShowEditProfile(true)}
              ></i>
              <i
                className="fa-solid fa-ellipsis-vertical"
                onClick={(e) => {
                  setShowBoxLogOut(!showBoxLogOut);
                  e.stopPropagation();
                }}
              ></i>
            </div>
          </div>
          <div className="information-my-profile">
            <img
              src={
                showImgProfile || imgNoneProfile
              }
            />
            <h4>{props.firstName + " " + props.lastName}</h4>
            <p>online</p>
          </div>
          <div className="box-btn-add-story-my-profile">
            <button className="add-story-my-profile">
              <i className="fa-solid fa-camera"></i>
            </button>
          </div>
          <div className="menu-my-profile">
            <div className="box-information-email-username">
              <div className="box-icon-information">
                <i className="fa-regular fa-envelope"></i>
                <div className="title-information">
                  <h4>{props.myEmail}</h4>
                  <p>Email</p>
                </div>
              </div>
              <div className="box-icon-information">
                <i className="fa-solid fa-at"></i>
                <div className="title-information">
                  <h4>{props.userName}</h4>
                  <p>Username</p>
                </div>
              </div>
            </div>
          </div>
          {showBoxLogOut && (
            <div
              className="log-out"
              onClick={(e) => {
                props.logout();
                e.stopPropagation();
              }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <p>Log Out</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
