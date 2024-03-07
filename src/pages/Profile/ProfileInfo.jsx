import PropTypes from "prop-types";

function ProfileInfo(props) {
  return (
    <div className="profile-page-information">
      <h2>{props.title}</h2>
      <p>{props.info}</p>
    </div>
  );
}

ProfileInfo.propTypes ={
  title: PropTypes.string,
  info: PropTypes.string
}

export default ProfileInfo;