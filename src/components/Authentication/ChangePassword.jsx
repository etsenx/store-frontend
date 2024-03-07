function ChangePassword() {
  return (
    <form className="authentication-form">
      <h1 className="authentication-title">Change Password</h1>
      <label htmlFor="old-password">Old Password</label>
      <input id="old-password" type="password" />
      <label htmlFor="new-password">New Password</label>
      <input id="new-password" type="password" />
      <label htmlFor="verify-new-password">Verify New Password</label>
      <input id="verify-new-password" type="password" />
      <button className="authentication-button" style={{marginTop: '20px'}}>Change Password</button>
    </form>
  )
}

export default ChangePassword;