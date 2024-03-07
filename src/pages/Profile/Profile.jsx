import { Link } from "react-router-dom";
import "./Profile.css";
import ProfileInfo from "./ProfileInfo";

function Profile() {
  return (
    <div className="profile-page">
      <h1 className="title">My Profile</h1>
      <div className="profile-page-container">
        <div className="profile-page-left-side">
          <img
            src="https://dummyimage.com/300x300/000/fff.jpg"
            className="profile-page-avatar"
          />
          <Link to="/me/update">
          <button className="profile-page-button">Edit Profile</button>
          </Link>
        </div>
        <div className="profile-page-right-side">
          <ProfileInfo title="Full Name" info="Mr. Peter" />
          <ProfileInfo title="Email Address" info="peter@gmail.com" />
          <ProfileInfo title="Joined On" info="2020-12-19" />
          <Link to="/me/orders">
            <button
              className="profile-page-button"
              style={{ backgroundColor: "#dc3545" }}
            >
              My Orders
            </button>
          </Link>
          <Link to="/password/change">
            {" "}
            <button
              className="profile-page-button"
              style={{ backgroundColor: "#007bff" }}
            >
              Change Password
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
