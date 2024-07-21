import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import ProfileInfo from "./ProfileInfo";
import Button from "../../components/Button/Button";

import { AdvancedImage } from "@cloudinary/react";
import cld from "../../utils/CloudinaryInstance";
import { fill } from "@cloudinary/url-gen/actions/resize";

import "./Profile.css";

function Profile() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  var userAvatar = "";
  if (isAuthenticated) {
    userAvatar = cld.image(user.avatar).resize(fill().width(300).height(300));
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }

  return (
    <div className="profile-page">
      <h1 className="title">My Profile</h1>
      <div className="profile-page-container">
        <div className="profile-page-left-side">
          <AdvancedImage cldImg={userAvatar} className="profile-page-avatar" />
          <Link to="/me/update">
            <Button className="profile-page-button">Edit Profile</Button>
          </Link>
        </div>
        <div className="profile-page-right-side">
          <ProfileInfo title="Full Name" info={user.name} />
          <ProfileInfo title="Email Address" info={user.email} />
          <ProfileInfo title="Joined On" info={formatDate(user.registerDate)} />
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
