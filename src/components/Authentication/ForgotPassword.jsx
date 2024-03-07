function ForgotPassword(){
  return (
    <form className="authentication-form">
      <h1 className="authentication-title">Forgot Password</h1>
      <label htmlFor="email">Enter Email</label>
      <input id="email" type="email" />
      <button className="authentication-button" style={{marginTop: '20px'}}>Send Email</button>
    </form>
  )
}

export default ForgotPassword;