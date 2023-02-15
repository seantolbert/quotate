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
import { useCollection } from "../hooks/useCollection";
import { useLogout } from "../hooks/useLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import UserPanel from "../components/UserPanel";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const { documents: quotes } = useCollection("quotes");

  const [newEmail, setNewEmail] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");

  const { logout } = useLogout();

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
    <div className="h-screen w-screen flex flex-col md:flex-row justify-start px-5 md:pt-10">
      <UserPanel
        setNewEmail={setNewEmail}
        setNewDisplayName={setNewDisplayName}
        handleChangeDisplayName={handleChangeDisplayName}
        handleVerify={handleVerify}
        handleChangeEmail={handleChangeEmail}
        newEmail={newEmail}
        logout={logout}
        newDisplayName={newDisplayName}
      />

      {/*  */}
      {/* book scroller */}
      {/*  */}

      <div id="book-scroller" className="w-full md:w-2/3 p-5">
        <div className="flex flex-wrap">
          {quotes
            ?.filter((quote) => quote.createdBy.id === user.uid)
            .map((quote, key) => (
              <div className="w-1/3 md:w-1/5 p-2" key={key}>
                <img
                  src={quote.book.imageURL}
                  className="w-full h-full rounded-lg"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Profile;
