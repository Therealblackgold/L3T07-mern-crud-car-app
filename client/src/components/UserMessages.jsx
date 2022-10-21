// error and spinner loader inside conditional rendering, props error, loading, LOADER
const UserMessages = ({ loading, LOADER }) => {
  return (
    <div className="user-messages">
      {loading && (
        <p className="bold">
          <img style={{ width: "100px" }} src={LOADER} alt="" />
        </p>
      )}
    </div>
  );
};

export default UserMessages;
