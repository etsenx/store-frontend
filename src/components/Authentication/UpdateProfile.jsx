function UpdateProfile() {
  return (
    <form className="authentication-form">
      <h1 className="authentication-title">Update Profile</h1>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" />
      <label htmlFor="email">Email</label>
      <input id="email" type="email" />
      <label htmlFor="avatar">Avatar</label>
      <div className="register-avatar-upload-container">
        <img
          src="https://dummyimage.com/50x50/000/fff.jpg"
          alt="Avatar"
          className="register-avatar"
        />
        <label className="file">
          <input type="file" id="file" aria-label="File browser example" />
          <span className="file-custom"></span>
        </label>
      </div>
      <button className="authentication-button">Update</button>
    </form>
  );
}

export default UpdateProfile;
