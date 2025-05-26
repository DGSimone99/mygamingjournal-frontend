import { Button, Container, Image } from "react-bootstrap";
import { useSelector } from "react-redux";

import NoUser from "../assets/NoUser.png";

const UserSettings = () => {
  const user = useSelector((state) => state.user);
  return (
    <Container className="page">
      <div>
        <h1 className="mb-5">Account Settings</h1>
        <div className="d-flex gap-5">
          <Image src={user.avatrUrl || NoUser} alt="User" height={200} className="rounded-circle" />
          <div>
            <h2>General Settings</h2>
            <h3>Username: {user.username}</h3>
            <h3>Display Name: {user.displayName}</h3>
            <h3>Email: {user.email}</h3>
          </div>
          <div>
            <h2>Languages</h2>
            {user.language.map((lang) => (
              <h3>{lang}</h3>
            ))}
          </div>
        </div>
        <div>
          <h2>Bio</h2>
          <p>{user.bio}</p>
        </div>
        <div>
          <Button>Change Password</Button> <Button>Delete Account</Button>
        </div>
      </div>
    </Container>
  );
};

export default UserSettings;
