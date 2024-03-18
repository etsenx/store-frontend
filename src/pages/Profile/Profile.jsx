import { Link } from "react-router-dom";
import "./Profile.css";
import ProfileInfo from "./ProfileInfo";
import Button from "../../components/Button/Button";

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
            <Button className="profile-page-button">Edit Profile</Button>
          </Link>
        </div>
        <div className="profile-page-right-side">
          <ProfileInfo title="Full Name" info="Mr. Peter" />
          <ProfileInfo title="Email Address" info="peter@gmail.com" />
          <ProfileInfo title="Joined On" info="2020-12-19" />
          <Link to="/me/orders">
            <Button
              className="profile-page-button"
              style={{ backgroundColor: "#DC3545" }}
            >
              My Orders
            </Button>
          </Link>
          <Link to="/password/change">
            <Button
              className="profile-page-button"
              style={{ backgroundColor: "#007BFF" }}
            >
              Change Password
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
