export default () => {
  return (
    <form>
      <h1>SignUp</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control"></input>
      </div>
      <button className="btn btn-primary">
      Sign Up
      </button>
    </form>
  );
};