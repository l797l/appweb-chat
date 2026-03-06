import "./style/YourProfile.css";
import imgNoneProfile from "../chat/img/as.jpg";
import "./style/MyProfile.css";
export default function YourProfile(props) {
  return (
    <div className="body-your-profile">
        <div className="header-profile">
                  <div className="header-profile-left">
                    <i
                      className="fa-solid fa-left-long"
                      onClick={() => props.deleteYourProfile(false)}
                    ></i>{" "}
                    <p>Settings</p>
                  </div>
                  <div className="header-profile-right">
                    <i
                      className="fa-solid fa-pen"
              
                    ></i>
                   
                  </div>
                </div>
                <div className="information-my-profile">
                  <img
                    src={ imgNoneProfile}
                  />
                  <h4>{"My Name"}</h4>
                  <p>online</p>
                </div>
                
                <div className="menu-my-profile">
                  <div className="box-information-email-username">
                    <div className="box-icon-information">
                      <i className="fa-regular fa-envelope"></i>
                      <div className="title-information">
                        <h4>{"asdadasd"}</h4>
                        <p>Email</p>
                      </div>
                    </div>
                    <div className="box-icon-information">
                      <i className="fa-solid fa-at"></i>
                      <div className="title-information">
                        <h4>{"sadas"}</h4>
                        <p>Username</p>
                      </div>
                    </div>
                  </div>
                </div>
    </div>

  )
}
