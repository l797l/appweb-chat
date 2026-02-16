import { useEffect, useState } from "react";
import "./style/EditProfile.css";
import imgNoneProfile from "../chat/img/as.jpg";
import axios from "axios";
import { pathWeb } from "../api/axios";

export default function EditProfile(props) {
  const [firstName, setFirstname] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [userName, setUserName] = useState(props.userName);
  const [imgProfile, setImgProfile] = useState(pathWeb + props.imgProfile);
  const [preViewImgProfile, setPreViewImgProfile] = useState(null);
  const [updateToInfo, setUpdateToInfo] = useState(false);

  useEffect(() => {
    const checkUpdate = () => {
      if (
        firstName != props.firstName ||
        lastName != props.lastName ||
        userName != props.userName ||
        imgProfile != pathWeb+props.imgProfile
      ) {
        setUpdateToInfo(true);
      } else {
        setUpdateToInfo(false);
      }
    };
    checkUpdate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName, userName, imgProfile]);
  const updateProfile = async () => {
    const formData = new FormData();

    firstName != props.firstName
      ? formData.append("firstName", firstName)
      : null;
    lastName != props.lastName ? formData.append("lastName", lastName) : null;

    userName != props.userName ? formData.append("userName", userName) : null;

    imgProfile != pathWeb+props.imgProfile
      ? formData.append("imgProfile", imgProfile)
      : null;

    try {
     await axios.put(
        "https://localhost:7280/api/User/UpdateInformationProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      props.intoMyProfle(false);
    } catch (error) {
      console.error(error.response?.data);
    }
  };
  useEffect(() => {
    const check = () => {
      if ("https://localhost:7280null" == imgProfile) {
        setImgProfile(null);
      }
    };
    check();
  }, [imgProfile]);

  const updateImgProfile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgProfile(file);
      setPreViewImgProfile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="edit-profile">
      <div className="header-edit-profile">
        <i
          className="fa-solid fa-left-long"
          onClick={() => props.intoMyProfle(false)}
        ></i>
        <p>Edit Profile</p>
      </div>
      <div className="img-edit-profile">
        <img src={preViewImgProfile || imgProfile || imgNoneProfile} />
        <label className="icon-edit-img" htmlFor="file-input">
          {" "}
          <i className="fa-regular fa-file-image "></i>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={updateImgProfile}
          ></input>
        </label>
      </div>
      <div className="list-input-edit">
        <div className="input-edit">
          <p className={firstName ? "" : "isEmpty"}>First Name</p>
          <input
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="input-edit">
          <p className={lastName ? "" : "isEmpty"}>Last Name</p>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="input-edit">
          <p className={"isEmpty"}>Bio (optional)</p>
          <input />
        </div>

        <div className="input-edit">
          <h4>Username</h4>
          <p className={userName ? "" : "isEmpty"}>Username</p>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      {updateToInfo && (
        <button className="but-update" onClick={() => updateProfile()}>
          <i className="fa-solid fa-check"></i>
        </button>
      )}
    </div>
  );
}
