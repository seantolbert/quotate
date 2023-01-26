import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { Auth, db } from "../firebase/config";
import { useDocument } from "../hooks/useDocument";
import {
  sendEmailVerification,
  updateProfile,
  updateEmail,
} from "firebase/auth";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const { document: userDoc } = useDocument("users", user.uid);

  const [showDNInput, setShowDNInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");

  const handleVerify = async () => {
    await sendEmailVerification(user);
    console.log("email sent");
  };

  const handleChangeDisplayName = async () => {
    await updateProfile(Auth.currentUser, {
      displayName: newDisplayName,
    }),
      console.log("successfuil name change");
  };

  const handleChangeEmail = async () => {
    try {
      await updateEmail(Auth.currentUser, newEmail);
      console.log("successfully changed email");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div>
        <div className="flex gap-5">
          <p>{user.displayName}</p>
          <button onClick={() => setShowDNInput(true)}>change</button>
          {showDNInput && (
            <div>
              <input
                type="text"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                placeholder="new display name"
              />
              <button onClick={handleChangeDisplayName} type="submit">
                submit
              </button>
              <button onClick={() => setShowDNInput(false)}>cancel</button>
            </div>
          )}
        </div>

        <div className="flex gap-5">
          <p>{user.email}</p>
          <button onClick={() => setShowEmailInput(true)}>change</button>
          {showEmailInput && (
            <div>
              <input
                type="text"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="new email address"
              />
              <button type="submit" onClick={handleChangeEmail}>
                submit
              </button>
              <button onClick={() => setShowEmailInput(false)}>cancel</button>
            </div>
          )}
        </div>

        <p>email verified: {user.emailVerified ? "true" : "false"}</p>
        {!user.emailVerified && (
          <button className="p-5 bg-blue-200" onClick={handleVerify}>
            verify
          </button>
        )}
      </div>
      {userDoc && <p>favorites {userDoc.favorites}</p>}
    </div>
  );
};
export default Profile;
